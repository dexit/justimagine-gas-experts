import sharp from "sharp";
import fs from "fs";

const logoPath = "./public/logo.svg";

if (!fs.existsSync(logoPath)) {
  console.log(`[skip] ${logoPath} not found, skipping favicon generation`);
  process.exit(0);
}

const logosvg = fs.readFileSync(logoPath);

async function generate() {
  try {
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
      try {
        await sharp(input).resize(size, size).png().toFile(out);
        console.log(`✓ ${out}`);
      } catch (e) {
        console.warn(`[warn] failed to generate ${out}: ${e}`);
      }
    }

    // WebP logo
    try {
      await sharp(input).resize(512, 512).webp({ quality: 90 }).toFile("./public/logo.webp");
      console.log("✓ logo.webp");
    } catch (e) {
      console.warn(`[warn] failed to generate logo.webp: ${e}`);
    }

    console.log("\nAll favicons generated from real logo SVG.");
  } catch (error) {
    console.error("Fatal error in favicon generation:", error);
    process.exit(1);
  }
}

generate().catch((e) => {
  console.error("Uncaught error:", e);
  process.exit(1);
});
