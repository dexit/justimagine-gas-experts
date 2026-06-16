import sharp from "sharp";

const width = 1200;
const height = 630;

async function createOGImage() {
  try {
    await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 20, g: 26, b: 40 },
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${width}" height="${height}">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="${width}" height="${height}" fill="url(#grad)" opacity="0.15"/>
              <text x="60" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">
                Just Imagine Ltd
              </text>
              <text x="60" y="330" font-family="Arial, sans-serif" font-size="36" fill="#f97316">
                Gas Safe Heating &amp; Plumbing
              </text>
              <text x="60" y="380" font-family="Arial, sans-serif" font-size="24" fill="#d1d5db">
                Boilers • Servicing • Repairs • 24/7
              </text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 90, progressive: true })
      .toFile("./public/og-default.jpg");

    console.log("✓ OG image generated");
  } catch (error) {
    console.warn(`[warn] OG image generation failed: ${error}`);
  }
}

createOGImage().catch((e) => {
  console.warn(`[warn] Uncaught OG error: ${e}`);
});
