import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "Archive");
const OUT_DIR = path.join(ROOT, "public", "Archive-web");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_WIDTH = 1400;
const QUALITY = 82;

async function processImage(srcPath, outPath) {
  await sharp(srcPath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true })
    .toFile(outPath);
}

async function run() {
  const folders = (await fs.readdir(SRC_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  let total = 0;
  let processed = 0;

  for (const folder of folders) {
    const srcFolder = path.join(SRC_DIR, folder);
    const outFolder = path.join(OUT_DIR, folder);
    await fs.mkdir(outFolder, { recursive: true });

    const files = (await fs.readdir(srcFolder)).filter((f) =>
      IMAGE_EXTS.has(path.extname(f).toLowerCase()),
    );
    total += files.length;

    await Promise.all(
      files.map(async (file) => {
        const base = path.parse(file).name + ".jpg";
        const srcPath = path.join(srcFolder, file);
        const outPath = path.join(outFolder, base);

        try {
          await fs.access(outPath);
          processed++;
          process.stdout.write(`  skip  ${folder}/${base}\n`);
        } catch {
          await processImage(srcPath, outPath);
          processed++;
          process.stdout.write(`  done  ${folder}/${base}\n`);
        }
      }),
    );
  }

  console.log(`\nDone: ${processed}/${total} images → public/Archive-web/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
