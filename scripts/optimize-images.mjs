import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");

const SKIP = new Set(["favicon.ico", "robots.txt", "placeholder.svg", "SVN-Achiko.otf"]);
const ALREADY_WEBP = new Set();

const files = readdirSync(PUBLIC)
  .filter((f) => {
    if (SKIP.has(f)) return false;
    const ext = extname(f).toLowerCase();
    return ext === ".png" || ext === ".webp";
  })
  .map((f) => ({
    name: f,
    path: join(PUBLIC, f),
    ext: extname(f).toLowerCase(),
    size: statSync(join(PUBLIC, f)).size,
  }))
  .sort((a, b) => b.size - a.size);

console.log("\n=== Image optimization report ===\n");

for (const f of files) {
  const webpName = basename(f.name, f.ext) + ".webp";
  const webpPath = join(PUBLIC, webpName);

  if (f.ext === ".webp") {
    ALREADY_WEBP.add(f.name);
    const meta = await sharp(f.path).metadata();
    console.log(
      `  [WEBP OK]  ${f.name}  ${(f.size / 1024).toFixed(1)}KB  ${meta.width}x${meta.height}`
    );
    continue;
  }

  const meta = await sharp(f.path).metadata();
  const origKB = (f.size / 1024).toFixed(1);

  // Try WebP conversion
  const webpBuf = await sharp(f.path).webp({ quality: 82 }).toBuffer();
  const webpKB = (webpBuf.length / 1024).toFixed(1);
  const saving = (((f.size - webpBuf.length) / f.size) * 100).toFixed(0);

  const marker = f.size > 50 * 1024 ? "[CONVERT]" : f.size > 10 * 1024 ? "[MAYBE]" : "[SMALL]";
  console.log(
    `  ${marker}  ${f.name}  ${origKB}KB → ${webpKB}KB (${saving}% smaller)  ${meta.width}x${meta.height}`
  );
}

console.log("\n=== Suggested actions ===\n");
console.log("Files >50KB (should convert PNG→WebP):");
for (const f of files) {
  if (f.ext === ".png" && f.size > 50 * 1024) {
    console.log(`  - ${f.name} (${(f.size / 1024).toFixed(1)}KB)`);
  }
}

console.log("\nFiles that are simple icons/shapes (candidates for SVG/inline):");
const simpleIcons = files.filter(
  (f) =>
    f.ext === ".png" &&
    f.size < 6 * 1024 &&
    (f.name.includes("sao") ||
      f.name.includes("icon") ||
      f.name.includes("search"))
);
for (const f of simpleIcons) {
  console.log(`  - ${f.name} (${(f.size / 1024).toFixed(1)}KB) — simple shape, vectorize to SVG`);
}
