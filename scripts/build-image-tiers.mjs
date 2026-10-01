import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";

import sharp from "sharp";

const IMAGE_PATTERN = /\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp)/gi;
const TIER_PATTERN = /-(?:640|1080|1600|2400)\.webp$/;
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const TIER_WIDTHS = [640, 1080, 1600, 2400];
const SOURCE_ROOT = resolve("src");
const PUBLIC_ROOT = resolve("public");
const PRE_TIERED_SOURCE_FILES = new Set([join(SOURCE_ROOT, "components/home/HeroSection.tsx")]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function sourceFor(imagePath) {
  const directSource = resolve(PUBLIC_ROOT, `.${imagePath}`);
  if (SOURCE_EXTENSIONS.includes(extname(imagePath).toLowerCase()) && existsSync(directSource)) return directSource;

  const base = imagePath.replace(TIER_PATTERN, "");
  if (base === imagePath) return undefined;

  return SOURCE_EXTENSIONS
    .map((extension) => resolve(PUBLIC_ROOT, `.${base}${extension}`))
    .find(existsSync);
}

const references = new Set(
  walk(SOURCE_ROOT)
    .filter((file) => /\.(?:[cm]?[jt]sx?|css)$/.test(file) && !PRE_TIERED_SOURCE_FILES.has(file))
    .flatMap((file) => [...readFileSync(file, "utf8").matchAll(IMAGE_PATTERN)].map(([image]) => image)),
);

const sources = [...references]
  .map(sourceFor)
  .filter((file) => file !== undefined)
  .filter((file, index, files) => files.indexOf(file) === index);

const generations = await Promise.all(sources.map(async (source) => {
  const metadata = await sharp(source).metadata();
  if (!metadata.width || metadata.width <= 900) return 0;

  const base = source.slice(0, -extname(source).length);
  const outputs = TIER_WIDTHS
    .filter((tierWidth) => tierWidth <= metadata.width)
    .map(async (width) => {
      const output = `${base}-${width}.webp`;
      await mkdir(dirname(output), { recursive: true });
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(output);
    });
  await Promise.all(outputs);
  return outputs.length;
}));
const generated = generations.reduce((total, count) => total + count, 0);

const sourceSize = (await Promise.all(sources.map((file) => stat(file)))).reduce((total, file) => total + file.size, 0);
console.log(`Generated ${generated} WebP tiers from ${sources.length} referenced source images (${Math.round(sourceSize / 1024)}KB originals).`);
