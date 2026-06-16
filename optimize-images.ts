import sharp from "sharp";
import fs from "fs";
import path from "path";

const assetsDir = "./src/assets";
const publicDir = "./public";

interface ImageSize {
  width: number;
  suffix: string;
}

const sizes: ImageSize[] = [
  { width: 640, suffix: "-sm" },
  { width: 1024, suffix: "-md" },
];

async function optimizeImages(dir: string) {
  if (!fs.existsSync(dir)) {
    console.log(`[skip] ${dir} not found`);
    return;
  }

  const files = fs.readdirSync(dir);
  if (!files || files.length === 0) {
    console.log(`[skip] ${dir} empty`);
    return;
  }

  for (const file of files) {
    const filePath = path.join(dir, file);
    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch (e) {
      console.warn(`[warn] stat failed for ${file}: ${e}`);
      continue;
    }

    if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
      const ext = path.extname(file);
      const nameWithoutExt = path.basename(file, ext);

      console.log(`Processing ${file}...`);

      // Get metadata
      let metadata;
      try {
        metadata = await sharp(filePath).metadata();
      } catch (e) {
        console.warn(`[warn] metadata read failed for ${file}: ${e}`);
        continue;
      }
      const originalWidth = metadata.width || 1600;

      // Optimize original
      const shouldCompress = originalWidth > 1600;
      const tempPath = filePath + ".tmp";
      try {
        const processor = sharp(filePath)
          .rotate()
          [ext.toLowerCase() === ".png" ? "png" : "jpeg"]({
            quality: 80,
            progressive: true,
            mozjpeg: true,
          });

        if (shouldCompress) {
          await processor.resize(1600, 1200, { fit: "inside", withoutEnlargement: true }).toFile(tempPath);
        } else {
          await processor.toFile(tempPath);
        }

        fs.renameSync(tempPath, filePath);

        // Generate WebP
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(filePath.replace(ext, ".webp"));

        // Generate responsive sizes
        for (const size of sizes) {
          if (originalWidth > size.width) {
            const outputPath = filePath.replace(ext, `${size.suffix}${ext}`);
            await sharp(filePath)
              .resize(size.width, Math.round((size.width / originalWidth) * (metadata.height || 1200)), {
                fit: "inside",
                withoutEnlargement: true,
              })
              [ext.toLowerCase() === ".png" ? "png" : "jpeg"]({
                quality: 80,
                progressive: true,
              })
              .toFile(outputPath);

            // WebP version of responsive
            await sharp(filePath)
              .resize(size.width, Math.round((size.width / originalWidth) * (metadata.height || 1200)), {
                fit: "inside",
                withoutEnlargement: true,
              })
              .webp({ quality: 80 })
              .toFile(outputPath.replace(ext, ".webp"));
          }
        }

        console.log(`✓ Optimized ${file}`);
      } catch (e) {
        console.warn(`[warn] optimization failed for ${file}: ${e}`);
        try {
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        } catch {}
      }
    }
  }
}

async function main() {
  console.log("Starting image optimization...");
  await optimizeImages(assetsDir);
  console.log("Image optimization complete!");
}

main().catch(console.error);
