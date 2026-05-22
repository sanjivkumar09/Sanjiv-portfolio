import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const cwd = process.cwd();
const srcDir = path.join(cwd, 'src', 'assets');
const input = path.join(srcDir, 'portrait.jpg');

const sizes = [480, 800, 1200];

async function ensure() {
  try {
    await fs.access(input);
  } catch (err) {
    console.error('Input image not found at', input);
    process.exit(1);
  }
}

async function run() {
  await ensure();
  for (const w of sizes) {
    const outAvif = path.join(srcDir, `portrait-${w}.avif`);
    const outWebp = path.join(srcDir, `portrait-${w}.webp`);
    const outJpg = path.join(srcDir, `portrait-${w}.jpg`);
    console.log('Generating', outAvif);
    await sharp(input).resize({ width: w }).avif({ quality: 50 }).toFile(outAvif);
    console.log('Generating', outWebp);
    await sharp(input).resize({ width: w }).webp({ quality: 75 }).toFile(outWebp);
    console.log('Generating', outJpg);
    await sharp(input).resize({ width: w }).jpeg({ quality: 80 }).toFile(outJpg);
  }
  console.log('Done.');
}

run().catch((e) => { console.error(e); process.exit(1); });
