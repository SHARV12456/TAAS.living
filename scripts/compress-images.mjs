/**
 * compress-images.mjs
 * Converts all room images to WebP at quality 78, max 1400px wide.
 * Originals are kept; .webp files are written alongside them.
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOMS_DIR = join(__dirname, '..', 'assets', 'rooms');
const MAX_W = 1400;
const QUALITY = 78;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = (await walk(ROOMS_DIR)).filter(f => /\.(jpe?g|png)$/i.test(f));

let saved = 0;
for (const src of files) {
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const before = (await stat(src)).size;
  await sharp(src)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const after = (await stat(out)).size;
  const pct = Math.round((1 - after / before) * 100);
  saved += before - after;
  console.log(`✓  ${basename(src).padEnd(20)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (${pct}% smaller)`);
}
console.log(`\nTotal saved: ${Math.round(saved/1024)}KB`);
