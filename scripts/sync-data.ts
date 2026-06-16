#!/usr/bin/env node
import { DataSyncOrchestrator } from "@/lib/data-sync-orchestrator";
import { KvClient } from "@/lib/kv-client";
import { D1Client } from "@/lib/d1-client";

async function main() {
  console.log("🔄 Starting data sync...\n");

  const kv = new KvClient();
  const db = new D1Client();
  const sync = new DataSyncOrchestrator(kv, db);

  const results = await sync.syncAll();

  console.log("\n📊 Sync Results:");
  results.forEach((result) => {
    const icon = result.status === "success" ? "✅" : result.status === "error" ? "❌" : "⏭️";
    console.log(`${icon} ${result.source}: ${result.status}${result.message ? ` (${result.message})` : ""}`);
  });

  const errors = results.filter((r) => r.status === "error");
  if (errors.length > 0) {
    console.log("\n⚠️  Some connectors failed. Check .env credentials.");
    process.exit(1);
  }

  console.log("\n✅ Data sync completed successfully!");
}

main().catch((error) => {
  console.error("❌ Sync failed:", error.message);
  process.exit(1);
});
