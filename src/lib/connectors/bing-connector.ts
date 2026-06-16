import { KvClient } from "@/lib/kv-client";
import { D1Client } from "@/lib/d1-client";

interface BingMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  timestamp: Date;
}

export class BingConnector {
  private apiKey: string;
  private accountId: string;
  private customerId: string;
  private kv: KvClient;
  private db: D1Client;

  constructor(apiKey: string, accountId: string, customerId: string, kv: KvClient, db: D1Client) {
    this.apiKey = apiKey;
    this.accountId = accountId;
    this.customerId = customerId;
    this.kv = kv;
    this.db = db;
  }

  async fetchMetrics(days: number = 7): Promise<BingMetrics> {
    const cacheKey = `bing:metrics:${days}d`;
    const cached = await this.kv.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const res = await fetch(
      `https://api.bingads.microsoft.com/Api/Advertiser/Reporting/ReportRequest`,
      {
        method: "POST",
        headers: {
          "Customer-Id": this.customerId,
          "Developer-Token": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccountId: this.accountId,
          ReportRequest: {
            ReportName: "WebmasterReport",
            Format: "Csv",
            ReturnOnlyCompleteData: false,
            Aggregation: "Daily",
            Time: {
              CustomDateRangeStart: { Year: startDate.getFullYear(), Month: startDate.getMonth() + 1, Day: startDate.getDate() },
              CustomDateRangeEnd: { Year: endDate.getFullYear(), Month: endDate.getMonth() + 1, Day: endDate.getDate() },
            },
          },
        }),
      }
    );

    if (!res.ok) throw new Error(`Bing API error: ${res.status}`);
    const text = await res.text();
    const lines = text.split("\n").slice(1);

    let clicks = 0,
      impressions = 0,
      position = 0;
    lines.forEach((line) => {
      const [c, i, p] = line.split(",");
      clicks += parseInt(c) || 0;
      impressions += parseInt(i) || 0;
      position += parseFloat(p) || 0;
    });

    const metrics: BingMetrics = {
      clicks,
      impressions,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      avgPosition: lines.length > 0 ? position / lines.length : 0,
      timestamp: new Date(),
    };

    await this.kv.set(cacheKey, JSON.stringify(metrics), 3600);
    await this.db.query(
      "INSERT INTO analytics_data (source, metric_type, data, recorded_at) VALUES (?, ?, ?, ?)",
      ["bing", "metrics", JSON.stringify(metrics), new Date().toISOString()]
    );

    return metrics;
  }
}
