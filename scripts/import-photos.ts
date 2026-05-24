#!/usr/bin/env node
/**
 * Optimize photos for a trip.
 *
 * Default workflow (recommended):
 *   1. Drop descriptively-named photos into content/trips/<slug>/photos/
 *      Convention: NN-subject.jpg
 *        e.g. 01-hero.jpg, 04-peles-castle.jpg, 07-day3-bran.jpg
 *   2. Run: npm run photos:import -- <slug>
 *
 * The script:
 *   - Reads content/trips/<slug>/photos/ (alphabetical sort)
 *   - For each image, generates 4 width variants (320/640/1280/1920)
 *   - Honors EXIF rotation; strips all EXIF metadata
 *   - Re-encodes as optimized progressive mozjpeg @ 88%
 *   - **Preserves filenames** in the output (so 04-peles-castle.jpg stays
 *     04-peles-castle.jpg, just gets a -thumb/-medium/-large sibling)
 *   - Writes to public/trips/<slug>/gallery/
 *   - Writes content/trips/<slug>/gallery.json with the catalog
 *   - Derives a default caption + altText from each filename
 *   - Auto-fills the trip's heroImage / coverImage frontmatter when blank
 *
 * Legacy mode (import from outside the repo):
 *   npm run photos:import -- <slug> /path/to/external/folder
 *   Copies the external folder into content/trips/<slug>/photos/ first, then
 *   runs the normal pipeline.
 *
 * Flags:
 *   --hero=NAME     Force a specific filename to be the heroImage
 *   --cover=NAME    Force a specific filename to be the coverImage
 *
 * Re-runnable. Existing outputs are overwritten.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import matter from "gray-matter";
import { captionFromFilename, altTextFromFilename } from "../lib/captions";

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_TRIPS = path.join(ROOT, "public", "trips");
const CONTENT_TRIPS = path.join(ROOT, "content", "trips");

const ACCEPTED_EXT = [".jpg", ".jpeg", ".png", ".heic", ".webp"];

const VARIANTS = [
  { suffix: "", width: 1920 },
  { suffix: "-large", width: 1280 },
  { suffix: "-medium", width: 640 },
  { suffix: "-thumb", width: 320 },
];

type Opts = {
  tripSlug: string;
  externalSource?: string;
  heroName?: string;
  coverName?: string;
};

type GalleryEntry = {
  /** Filename stem without extension — also the URL-safe id */
  id: string;
  /** Original filename (with extension) — for traceability */
  filename: string;
  /** Default caption derived from filename — override in this file as needed */
  caption: string;
  /** Default alt text — override in this file as needed */
  altText: string;
  /** Public URLs for each width */
  src: string;
  large: string;
  medium: string;
  thumb: string;
  /** Native dimensions of the largest variant */
  width: number;
  height: number;
};

function parseArgs(): Opts {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error(
      "Usage: npm run photos:import -- <trip-slug> [<external-folder>] [--hero=NAME] [--cover=NAME]"
    );
    process.exit(1);
  }
  const [tripSlug, maybeFolder, ...rest] = args;
  const opts: Opts = { tripSlug };
  if (maybeFolder && !maybeFolder.startsWith("--")) {
    opts.externalSource = maybeFolder;
  } else if (maybeFolder) {
    rest.unshift(maybeFolder);
  }
  for (const a of rest) {
    if (a.startsWith("--hero=")) opts.heroName = a.slice("--hero=".length);
    if (a.startsWith("--cover=")) opts.coverName = a.slice("--cover=".length);
  }
  return opts;
}

function copyExternalToContent(externalSrc: string, contentPhotosDir: string) {
  if (!fs.existsSync(externalSrc)) {
    console.error(`External source not found: ${externalSrc}`);
    process.exit(1);
  }
  fs.mkdirSync(contentPhotosDir, { recursive: true });
  const files = fs
    .readdirSync(externalSrc)
    .filter((f) => ACCEPTED_EXT.includes(path.extname(f).toLowerCase()));
  for (const f of files) {
    fs.copyFileSync(path.join(externalSrc, f), path.join(contentPhotosDir, f));
  }
  console.log(`📂 Copied ${files.length} files from ${externalSrc}`);
  console.log(`   → ${path.relative(ROOT, contentPhotosDir)}`);
}

async function run() {
  const opts = parseArgs();
  const tripDir = path.join(CONTENT_TRIPS, opts.tripSlug);
  if (!fs.existsSync(tripDir)) {
    console.error(
      `Trip "${opts.tripSlug}" not found in content/trips/. ` +
        `Run \`npm run trip:new -- ${opts.tripSlug}\` first.`
    );
    process.exit(1);
  }

  const photosDir = path.join(tripDir, "photos");
  fs.mkdirSync(photosDir, { recursive: true });

  if (opts.externalSource) {
    copyExternalToContent(path.resolve(opts.externalSource), photosDir);
  }

  const files = fs
    .readdirSync(photosDir)
    .filter((f) => ACCEPTED_EXT.includes(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.error(
      `No photos in content/trips/${opts.tripSlug}/photos/. ` +
        `Drop your files there first.`
    );
    process.exit(1);
  }

  const galleryOut = path.join(PUBLIC_TRIPS, opts.tripSlug, "gallery");
  fs.mkdirSync(galleryOut, { recursive: true });

  console.log(`📷 Optimizing ${files.length} photos for ${opts.tripSlug}`);

  const entries: GalleryEntry[] = [];
  for (const filename of files) {
    const stem = path.basename(filename, path.extname(filename));
    const srcPath = path.join(photosDir, filename);
    try {
      for (const v of VARIANTS) {
        const outPath = path.join(galleryOut, `${stem}${v.suffix}.jpg`);
        await sharp(srcPath, { failOn: "none" })
          .rotate()
          .resize({ width: v.width, withoutEnlargement: true })
          .jpeg({ quality: 88, progressive: true, mozjpeg: true })
          .withMetadata({ exif: {} })
          .toFile(outPath);
      }
      const finalMeta = await sharp(
        path.join(galleryOut, `${stem}.jpg`)
      ).metadata();
      const urlBase = `/trips/${opts.tripSlug}/gallery/${stem}`;
      entries.push({
        id: stem,
        filename,
        caption: captionFromFilename(filename),
        altText: altTextFromFilename(filename),
        src: `${urlBase}.jpg`,
        large: `${urlBase}-large.jpg`,
        medium: `${urlBase}-medium.jpg`,
        thumb: `${urlBase}-thumb.jpg`,
        width: finalMeta.width ?? 0,
        height: finalMeta.height ?? 0,
      });
      process.stdout.write(`  ✓ ${stem}\n`);
    } catch (err) {
      console.warn(`  ✗ ${filename} — ${(err as Error).message}`);
    }
  }

  // Merge with any existing gallery.json so user-edited captions survive a re-import
  const galleryJsonPath = path.join(tripDir, "gallery.json");
  let merged = entries;
  if (fs.existsSync(galleryJsonPath)) {
    try {
      const existing = JSON.parse(
        fs.readFileSync(galleryJsonPath, "utf-8")
      ) as GalleryEntry[];
      const byId = new Map(existing.map((e) => [e.id, e]));
      merged = entries.map((e) => {
        const prev = byId.get(e.id);
        if (!prev) return e;
        return {
          ...e,
          caption: prev.caption || e.caption,
          altText: prev.altText || e.altText,
        };
      });
    } catch {
      // ignore — write fresh
    }
  }
  fs.writeFileSync(galleryJsonPath, JSON.stringify(merged, null, 2));

  // Pick hero + cover
  const heroEntry =
    merged.find((e) => e.filename === opts.heroName) ??
    merged.find((e) => /^0?1[-_]/.test(e.filename)) ??  // 01-, 1-, 001-
    merged.find((e) => /\bhero\b/i.test(e.filename)) ??
    merged[0];
  const coverEntry =
    merged.find((e) => e.filename === opts.coverName) ??
    merged.find((e) => /\bcover\b/i.test(e.filename)) ??
    merged.find((e) => /^0?2[-_]/.test(e.filename)) ??
    merged[Math.min(1, merged.length - 1)] ??
    heroEntry;

  // Update frontmatter
  const mdxPath = path.join(tripDir, "index.mdx");
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const parsed = matter(raw);
    const fm = parsed.data as Record<string, unknown>;
    let changed = false;
    const isBlank = (v: unknown) =>
      !v || v === "" || v === "/placeholder-hero.svg";
    if (isBlank(fm.heroImage) && heroEntry) {
      fm.heroImage = heroEntry.src;
      changed = true;
    }
    if (isBlank(fm.coverImage) && coverEntry) {
      fm.coverImage = coverEntry.src;
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(mdxPath, matter.stringify(parsed.content, fm));
      console.log(`  ✓ Updated frontmatter (heroImage / coverImage)`);
    }
  }

  console.log(`\n✅ Done. ${merged.length} photos optimized.`);
  console.log(`   gallery.json:  content/trips/${opts.tripSlug}/gallery.json`);
  console.log(`   public assets: public/trips/${opts.tripSlug}/gallery/`);
  console.log(
    `\nTo show the gallery in the post, add near the top of the MDX body:\n` +
      `   import gallery from "./gallery.json";\n` +
      `   <Gallery images={gallery} />\n`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
