import { GA4Connector } from "./connectors/ga4-connector";
import { GSCConnector } from "./connectors/gsc-connector";
import { ClarityConnector } from "./connectors/clarity-connector";
import { BingConnector } from "./connectors/bing-connector";
import { KvClient } from "./kv-client";
import { D1Client } from "./d1-client";

export interface SyncResult {
  source: string;
  status: "success" | "error" | "skipped";
  message?: string;
  timestamp: Date;
}

export class DataSyncOrchestrator {
  private ga4?: GA4Connector;
  private gsc?: GSCConnector;
  private clarity?: ClarityConnector;
  private bing?: BingConnector;
  private kv: KvClient;
  private db: D1Client;

  constructor(kv: KvClient, db: D1Client) {
    this.kv = kv;
    this.db = db;
    this.initConnectors();
  }

  private initConnectors() {
    const ga4Key = process.env.GA4_ACCESS_TOKEN;
    const ga4Prop = process.env.GA4_PROPERTY_ID;
    if (ga4Key && ga4Prop) {
      this.ga4 = new GA4Connector(ga4Key, ga4Prop, this.kv, this.db);
    }

    const gscToken = process.env.GSC_REFRESH_TOKEN;
    const gscUrl = process.env.GSC_SITE_URL || "https://justimagine.ltd";
    if (gscToken) {
      this.gsc = new GSCConnector(gscToken, gscUrl, this.kv, this.db);
    }

    const clarityId = process.env.CLARITY_PROJECT_ID;
    const clarityKey = process.env.CLARITY_API_KEY;
    if (clarityId && clarityKey) {
      this.clarity = new ClarityConnector(clarityId, clarityKey, this.kv, this.db);
    }

    const bingKey = process.env.BING_WEBMASTER_API_KEY;
    const bingAccount = process.env.BING_ACCOUNT_ID || "";
    const bingCustomer = process.env.BING_CUSTOMER_ID || "";
    if (bingKey && bingAccount && bingCustomer) {
      this.bing = new BingConnector(bingKey, bingAccount, bingCustomer, this.kv, this.db);
    }
  }

  async syncAll(): Promise<SyncResult[]> {
    const results: SyncResult[] = [];

    if (this.ga4) {
      try {
        await this.ga4.fetchMetrics(7);
        results.push({ source: "GA4", status: "success", timestamp: new Date() });
      } catch (error) {
        results.push({
          source: "GA4",
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date(),
        });
      }
    } else {
      results.push({ source: "GA4", status: "skipped", message: "No credentials", timestamp: new Date() });
    }

    if (this.gsc) {
      try {
        await this.gsc.fetchMetrics(7);
        results.push({ source: "GSC", status: "success", timestamp: new Date() });
      } catch (error) {
        results.push({
          source: "GSC",
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date(),
        });
      }
    } else {
      results.push({ source: "GSC", status: "skipped", message: "No credentials", timestamp: new Date() });
    }

    if (this.clarity) {
      try {
        await this.clarity.fetchMetrics(7);
        results.push({ source: "Clarity", status: "success", timestamp: new Date() });
      } catch (error) {
        results.push({
          source: "Clarity",
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date(),
        });
      }
    } else {
      results.push({ source: "Clarity", status: "skipped", message: "No credentials", timestamp: new Date() });
    }

    if (this.bing) {
      try {
        await this.bing.fetchMetrics(7);
        results.push({ source: "Bing", status: "success", timestamp: new Date() });
      } catch (error) {
        results.push({
          source: "Bing",
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date(),
        });
      }
    } else {
      results.push({ source: "Bing", status: "skipped", message: "No credentials", timestamp: new Date() });
    }

    await this.db.query(
      "INSERT INTO sync_logs (sync_results, completed_at) VALUES (?, ?)",
      [JSON.stringify(results), new Date().toISOString()]
    );

    return results;
  }
}
