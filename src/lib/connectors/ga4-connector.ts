import { KvClient } from "@/lib/kv-client";
import { D1Client } from "@/lib/d1-client";

interface GA4Metrics {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  transactions: number;
  transactionRevenue: number;
  timestamp: Date;
}

export class GA4Connector {
  private accessToken: string;
  private propertyId: string;
  private kv: KvClient;
  private db: D1Client;

  constructor(accessToken: string, propertyId: string, kv: KvClient, db: D1Client) {
    this.accessToken = accessToken;
    this.propertyId = propertyId;
    this.kv = kv;
    this.db = db;
  }

  async fetchMetrics(days: number = 7): Promise<GA4Metrics> {
    const cacheKey = `ga4:metrics:${days}d`;
    const cached = await this.kv.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const body = {
      dateRanges: [{ startDate: this.formatDate(startDate), endDate: this.formatDate(endDate) }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "screenPageViews" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "conversionRate" },
        { name: "transactions" },
        { name: "transactionRevenue" },
      ],
    };

    const res = await fetch("https://analyticsreporting.googleapis.com/v4/properties/batch:runReport", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, property: `properties/${this.propertyId}` }),
    });

    if (!res.ok) throw new Error(`GA4 API error: ${res.status}`);
    const data = await res.json();

    const metrics: GA4Metrics = {
      sessions: parseInt(data.rows?.[0]?.metricValues?.[0]?.value || "0"),
      users: parseInt(data.rows?.[0]?.metricValues?.[1]?.value || "0"),
      pageviews: parseInt(data.rows?.[0]?.metricValues?.[2]?.value || "0"),
      bounceRate: parseFloat(data.rows?.[0]?.metricValues?.[3]?.value || "0"),
      avgSessionDuration: parseFloat(data.rows?.[0]?.metricValues?.[4]?.value || "0"),
      conversionRate: parseFloat(data.rows?.[0]?.metricValues?.[5]?.value || "0"),
      transactions: parseInt(data.rows?.[0]?.metricValues?.[6]?.value || "0"),
      transactionRevenue: parseFloat(data.rows?.[0]?.metricValues?.[7]?.value || "0"),
      timestamp: new Date(),
    };

    await this.kv.set(cacheKey, JSON.stringify(metrics), 3600); // 1h cache
    await this.db.query(
      "INSERT INTO analytics_data (source, metric_type, data, recorded_at) VALUES (?, ?, ?, ?)",
      ["ga4", "metrics", JSON.stringify(metrics), new Date().toISOString()]
    );

    return metrics;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
