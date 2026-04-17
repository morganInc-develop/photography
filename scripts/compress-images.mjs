import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const TARGET_DIR = path.resolve("public/Archive");
const QUALITY = 82;

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(full)));
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

const images = await collectImages(TARGET_DIR);
console.log(`Found ${images.length} images in public/Archive\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const filePath of images) {
  const before = (await stat(filePath)).size;
  totalBefore += before;

  // Compress to a temp buffer then write back in-place
  const compressed = await sharp(filePath)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  totalAfter += compressed.byteLength;

  await sharp(compressed).toFile(filePath);

  const pct = (((before - compressed.byteLength) / before) * 100).toFixed(0);
  console.log(`  ${path.relative("public", filePath).padEnd(48)} ${fmt(before)} → ${fmt(compressed.byteLength)} (−${pct}%)`);
}

console.log(`
─────────────────────────────────────────
Before: ${fmt(totalBefore)}
After:  ${fmt(totalAfter)}
Saved:  ${fmt(totalBefore - totalAfter)} (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)
`);
