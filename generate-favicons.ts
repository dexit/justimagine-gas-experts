import sharp from "sharp";
import fs from "fs";

const logosvg = fs.readFileSync("./public/logo.svg");

async function generate() {
  const input = logosvg;

  const sizes: [string, number][] = [
    ["./public/logo.png", 512],
    ["./public/favicon-192x192.png", 192],
    ["./public/apple-touch-icon.png", 180],
    ["./public/favicon-32x32.png", 32],
    ["./public/favicon-16x16.png", 16],
    ["./public/favicon.ico", 32],
  ];

  for (const [out, size] of sizes) {
    await sharp(input).resize(size, size).png().toFile(out);
    console.log(`✓ ${out}`);
  }

  // WebP logo
  await sharp(input).resize(512, 512).webp({ quality: 90 }).toFile("./public/logo.webp");
  console.log("✓ logo.webp");

  console.log("\nAll favicons generated from real logo SVG.");
}

generate().catch(console.error);
