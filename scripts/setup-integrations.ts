#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(q: string): Promise<string> {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function main() {
  console.log("🚀 Just Imagine Gas Experts - Data Integration Setup\n");

  const envPath = path.join(process.cwd(), ".env.local");
  let env = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

  console.log("1️⃣  Google Analytics 4 (GA4)");
  const ga4Token = await question("  Enter GA4 Access Token (leave blank to skip): ");
  if (ga4Token) {
    env += `GA4_ACCESS_TOKEN=${ga4Token}\n`;
    const ga4Prop = await question("  Enter GA4 Property ID: ");
    env += `GA4_PROPERTY_ID=${ga4Prop}\n`;
  }

  console.log("\n2️⃣  Google Search Console (GSC)");
  const gscToken = await question("  Enter GSC Refresh Token (leave blank to skip): ");
  if (gscToken) {
    env += `GSC_REFRESH_TOKEN=${gscToken}\n`;
    env += `GSC_CLIENT_ID=${await question("  Enter GSC Client ID: ")}\n`;
    env += `GSC_CLIENT_SECRET=${await question("  Enter GSC Client Secret: ")}\n`;
    const gscUrl = await question("  Enter GSC Site URL (default: https://justimagine.ltd): ");
    env += `GSC_SITE_URL=${gscUrl || "https://justimagine.ltd"}\n`;
  }

  console.log("\n3️⃣  Microsoft Clarity");
  const clarityId = await question("  Enter Clarity Project ID (leave blank to skip): ");
  if (clarityId) {
    env += `CLARITY_PROJECT_ID=${clarityId}\n`;
    env += `CLARITY_API_KEY=${await question("  Enter Clarity API Key: ")}\n`;
  }

  console.log("\n4️⃣  Bing Webmaster Tools");
  const bingKey = await question("  Enter Bing API Key (leave blank to skip): ");
  if (bingKey) {
    env += `BING_WEBMASTER_API_KEY=${bingKey}\n`;
    env += `BING_ACCOUNT_ID=${await question("  Enter Bing Account ID: ")}\n`;
    env += `BING_CUSTOMER_ID=${await question("  Enter Bing Customer ID: ")}\n`;
  }

  console.log("\n5️⃣  Vercel KV Storage");
  const kvUrl = await question("  Enter Vercel KV REST URL (leave blank to skip): ");
  if (kvUrl) {
    env += `KV_REST_API_URL=${kvUrl}\n`;
    env += `KV_REST_API_TOKEN=${await question("  Enter Vercel KV REST Token: ")}\n`;
  }

  console.log("\n6️⃣  Vercel Blob Storage");
  const blobToken = await question("  Enter Vercel Blob Token (leave blank to skip): ");
  if (blobToken) {
    env += `BLOB_READ_WRITE_TOKEN=${blobToken}\n`;
  }

  console.log("\n7️⃣  Admin Credentials");
  const adminUser = await question("  Enter Admin Username (default: admin): ");
  env += `ADMIN_USERNAME=${adminUser || "admin"}\n`;
  env += `ADMIN_PASSWORD=${await question("  Enter Admin Password: ")}\n`;

  fs.writeFileSync(envPath, env);
  console.log("\n✅ Setup complete! Environment variables saved to .env.local");
  console.log("📝 Next steps:");
  console.log("   1. npm run build");
  console.log("   2. npm run migrate:d1 (if using D1)");
  console.log("   3. npm run sync:data (to test connectors)");

  rl.close();
}

main().catch(console.error);
