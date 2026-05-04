import sharp from "sharp";
import fs from "fs";

// Generate a flame-icon SVG for the logo
const flamesvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#1a1f2e"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
  </defs>
  <path d="M256 80 C256 80 320 160 320 220 C340 200 344 170 336 140 C380 180 400 240 380 310 C372 338 352 360 328 374 C340 354 344 330 332 310 C310 360 280 382 256 400 C232 382 202 360 180 310 C168 330 172 354 184 374 C160 360 140 338 132 310 C112 240 132 180 176 140 C168 170 172 200 192 220 C192 160 256 80 256 80Z" fill="url(#g)"/>
</svg>`;

const logosvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#14181f"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
  </defs>
  <path d="M256 60 C256 60 340 160 340 230 C364 208 370 172 360 136 C412 182 434 252 410 330 C400 362 376 386 348 402 C362 378 366 350 352 326 C324 382 288 406 256 428 C224 406 188 382 160 326 C146 350 150 378 164 402 C136 386 112 362 102 330 C78 252 100 182 152 136 C142 172 148 208 172 230 C172 160 256 60 256 60Z" fill="url(#g)"/>
  <circle cx="256" cy="290" r="36" fill="#fff2" />
</svg>`;

async function generate() {
  const logoInput = Buffer.from(logosvg);

  // logo.png 512x512
  await sharp(logoInput)
    .png()
    .resize(512, 512)
    .toFile("./public/logo.png");
  console.log("✓ logo.png");

  // logo.webp 512x512
  await sharp(logoInput)
    .webp({ quality: 90 })
    .resize(512, 512)
    .toFile("./public/logo.webp");
  console.log("✓ logo.webp");

  // apple-touch-icon 180x180
  await sharp(logoInput)
    .png()
    .resize(180, 180)
    .toFile("./public/apple-touch-icon.png");
  console.log("✓ apple-touch-icon.png");

  // favicon 32x32
  await sharp(logoInput)
    .png()
    .resize(32, 32)
    .toFile("./public/favicon-32x32.png");
  console.log("✓ favicon-32x32.png");

  // favicon 16x16
  await sharp(logoInput)
    .png()
    .resize(16, 16)
    .toFile("./public/favicon-16x16.png");
  console.log("✓ favicon-16x16.png");

  // favicon-192 for android
  await sharp(logoInput)
    .png()
    .resize(192, 192)
    .toFile("./public/favicon-192x192.png");
  console.log("✓ favicon-192x192.png");

  // favicon.ico (32x32 PNG works as .ico in modern browsers)
  await sharp(logoInput)
    .png()
    .resize(32, 32)
    .toFile("./public/favicon.ico");
  console.log("✓ favicon.ico");

  console.log("\nAll favicons generated.");
}

generate().catch(console.error);
