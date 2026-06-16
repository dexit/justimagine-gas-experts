#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { D1Client } from "@/lib/d1-client";

async function main() {
  console.log("🗄️  Running D1 migrations...\n");

  const migrationsDir = path.join(process.cwd(), "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  const db = new D1Client();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;

    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    console.log(`📝 Running ${file}...`);
    try {
      await db.exec(sql);
      console.log(`✅ ${file} completed\n`);
    } catch (error) {
      console.error(`❌ ${file} failed:`, error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  }

  console.log("✅ All migrations completed!");
}

main().catch(console.error);
