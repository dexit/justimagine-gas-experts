import { KvClient } from "@/lib/kv-client";
import { D1Client } from "@/lib/d1-client";

interface ClarityMetrics {
  sessions: number;
  avgDuration: number;
  errorRate: number;
  deadClicks: number;
  rageclicks: number;
  timestamp: Date;
}

export class ClarityConnector {
  private projectId: string;
  private apiKey: string;
  private kv: KvClient;
  private db: D1Client;

  constructor(projectId: string, apiKey: string, kv: KvClient, db: D1Client) {
    this.projectId = projectId;
    this.apiKey = apiKey;
    this.kv = kv;
    this.db = db;
  }

  async fetchMetrics(days: number = 7): Promise<ClarityMetrics> {
    const cacheKey = `clarity:metrics:${days}d`;
    const cached = await this.kv.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const res = await fetch(`https://www.clarityapi.com/api/projects/${this.projectId}/dashboard`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    if (!res.ok) throw new Error(`Clarity API error: ${res.status}`);
    const data = await res.json();

    const metrics: ClarityMetrics = {
      sessions: data.sessionsMetrics?.totalSessions || 0,
      avgDuration: data.sessionsMetrics?.avgSessionLength || 0,
      errorRate: data.sessionErrors?.errorRate || 0,
      deadClicks: data.sessionIssues?.deadClicks || 0,
      rageclicks: data.sessionIssues?.rageClicks || 0,
      timestamp: new Date(),
    };

    await this.kv.set(cacheKey, JSON.stringify(metrics), 3600);
    await this.db.query(
      "INSERT INTO analytics_data (source, metric_type, data, recorded_at) VALUES (?, ?, ?, ?)",
      ["clarity", "metrics", JSON.stringify(metrics), new Date().toISOString()]
    );

    return metrics;
  }
}
