import { KvClient } from "@/lib/kv-client";
import { D1Client } from "@/lib/d1-client";

interface GSCMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number }>;
  timestamp: Date;
}

export class GSCConnector {
  private refreshToken: string;
  private siteUrl: string;
  private kv: KvClient;
  private db: D1Client;
  private accessToken?: string;

  constructor(refreshToken: string, siteUrl: string, kv: KvClient, db: D1Client) {
    this.refreshToken = refreshToken;
    this.siteUrl = siteUrl;
    this.kv = kv;
    this.db = db;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: JSON.stringify({
        client_id: process.env.GSC_CLIENT_ID,
        client_secret: process.env.GSC_CLIENT_SECRET,
        refresh_token: this.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await res.json();
    this.accessToken = data.access_token;
    return this.accessToken;
  }

  async fetchMetrics(days: number = 7): Promise<GSCMetrics> {
    const cacheKey = `gsc:metrics:${days}d`;
    const cached = await this.kv.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const accessToken = await this.getAccessToken();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(this.siteUrl)}/searchAnalytics/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate),
        dimensions: ["query"],
        rowLimit: 10,
      }),
    });

    if (!res.ok) throw new Error(`GSC API error: ${res.status}`);
    const data = await res.json();

    const rows = data.rows || [];
    const totals = rows.reduce(
      (acc, row) => ({
        clicks: acc.clicks + (row.clicks || 0),
        impressions: acc.impressions + (row.impressions || 0),
        ctr: acc.ctr + ((row.ctr || 0) * (row.clicks || 0)),
      }),
      { clicks: 0, impressions: 0, ctr: 0 }
    );

    const metrics: GSCMetrics = {
      clicks: totals.clicks,
      impressions: totals.impressions,
      ctr: totals.clicks > 0 ? totals.ctr / totals.clicks : 0,
      avgPosition: rows[0]?.position || 0,
      topQueries: rows.map((row) => ({
        query: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
      })),
      timestamp: new Date(),
    };

    await this.kv.set(cacheKey, JSON.stringify(metrics), 3600); // 1h cache
    await this.db.query(
      "INSERT INTO analytics_data (source, metric_type, data, recorded_at) VALUES (?, ?, ?, ?)",
      ["gsc", "metrics", JSON.stringify(metrics), new Date().toISOString()]
    );

    return metrics;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
