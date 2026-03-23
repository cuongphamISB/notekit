import sharp from "sharp";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");

async function convert(name, opts = {}) {
  const src = join(PUBLIC, name);
  const dest = join(PUBLIC, name.replace(/\.png$/i, ".webp"));
  let pipeline = sharp(src);

  if (opts.maxWidth) {
    const meta = await sharp(src).metadata();
    if (meta.width > opts.maxWidth) {
      pipeline = pipeline.resize({ width: opts.maxWidth, withoutEnlargement: true });
    }
  }

  await pipeline.webp({ quality: opts.quality ?? 82 }).toFile(dest);
  const { size: newSize } = await sharp(dest).metadata().then(() =>
    import("fs").then((fs) => fs.statSync(dest))
  );
  console.log(`  ${name} → ${name.replace(/\.png$/i, ".webp")} (${(newSize / 1024).toFixed(1)}KB)`);
}

async function resizeWebp(name, maxWidth) {
  const src = join(PUBLIC, name);
  const meta = await sharp(src).metadata();
  if (meta.width <= maxWidth) {
    console.log(`  ${name} already ≤${maxWidth}px (${meta.width}x${meta.height}), skipped`);
    return;
  }
  const buf = await sharp(src).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await sharp(buf).toFile(src);
  console.log(`  ${name} resized ${meta.width}→${maxWidth}px (${(buf.length / 1024).toFixed(1)}KB)`);
}

console.log("\n=== Converting PNGs to WebP ===\n");

// CTA images
await convert("CTA 2.png");
await convert("CTA button.png");

// Character sticker
await convert("sticker nhân vật.png");

// Product stickers (10 files)
for (const name of [
  "nam mkt.png", "nữ mkt.png",
  "nam fin.png", "nữ fin.png",
  "nam ibu.png", "nữ ibu.png",
  "nam accounting.png", "nữ accounting.png",
  "nam man.png", "nữ man.png",
]) {
  await convert(name);
}

console.log("\n=== Resizing oversized WebP covers ===\n");

// Cover images — max 2000px width is more than enough for web
await resizeWebp("ibu (ko nhãn)_result.webp", 2000);
await resizeWebp("mkt (ko nhãn)_result.webp", 2000);
await resizeWebp("man (ko nhãn)_result.webp", 2000);
await resizeWebp("fin (ko nhãn)_result.webp", 2000);
await resizeWebp("accounting (ko nhãn)_result.webp", 2000);

// LOGO — max 800px for header
await resizeWebp("LOGO.webp", 800);

console.log("\n=== Done! ===\n");
