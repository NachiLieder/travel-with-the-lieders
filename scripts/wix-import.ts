#!/usr/bin/env node
/**
 * One-shot scraper that pulls every photo from the legacy Wix blog into the
 * right trip's `content/trips/<slug>/photos/` folder.
 *
 *   npm run wix:import                       (all trips)
 *   npm run wix:import -- czech-north-2025   (one trip)
 *
 * Per trip the script:
 *   1. Fetches the Wix post HTML
 *   2. Pulls every static.wixstatic.com image URL
 *   3. Normalizes each to the full-resolution original
 *   4. Dedupes (Wix renders each image twice — LQIP + full)
 *   5. Filters the global menu thumbnail
 *   6. Downloads each into content/trips/<slug>/photos/ as `wix-NN.jpg`
 *   7. Calls the standard photo optimizer (npm run photos:import) — which
 *      generates the 4-size public/ assets, writes gallery.json, and updates
 *      heroImage/coverImage.
 *
 * After running, RENAME the files in content/trips/<slug>/photos/ from
 *   wix-01.jpg → 01-bran-castle.jpg
 * to give them meaningful names. Re-run `npm run photos:import -- <slug>`
 * after renaming and gallery.json will pick up the new captions.
 *
 * Re-runnable. Existing wix-* files are overwritten; descriptively-named
 * files you've already renamed are left alone.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(__dirname, "..");
const CONTENT_TRIPS = path.join(ROOT, "content", "trips");

const TRIP_MAP: Record<string, string> = {
  "czech-north-2025":
    "https://i66demri.wixsite.com/travel-with-the-lied/post/צפוןן-צ-יכיה-אוקטובר-2025",
  "portugal-madeira-2025":
    "https://i66demri.wixsite.com/travel-with-the-lied/post/דרום-פורטוגל-והאי-מדירה",
  "italy-lakes-2024":
    "https://i66demri.wixsite.com/travel-with-the-lied/post/טיול-בלתי-נשכח-לתאילנד",
  "romania-10-days-2024":
    "https://i66demri.wixsite.com/travel-with-the-lied/post/exploring-southeast-asia-top-travel-destinations-and-tips",
  "dominican-republic-2024":
    "https://i66demri.wixsite.com/travel-with-the-lied/post/europe-s-hidden-gems-off-the-beaten-path-travel-adventures",
};

const EXCLUDED_FILENAMES = new Set([
  "681824_727a8a5b872c4d179214e53dbf7d8a7a", // site-wide header thumbnail
]);

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

function normalizeWixUrl(url: string): string {
  const idx = url.indexOf("/v1/");
  return idx === -1 ? url : url.slice(0, idx);
}

function fileStem(url: string): string {
  const base = url.split("/").pop() ?? "";
  const noExt = base.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
  return noExt.replace(/~mv2$/i, "");
}

function fileExt(url: string): string {
  const m = url.match(/\.(jpg|jpeg|png|webp)(?=$|\?)/i);
  if (!m) return "jpg";
  const ext = m[1].toLowerCase();
  return ext === "jpeg" ? "jpg" : ext;
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function extractImageUrls(html: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const regex = /https:\/\/static\.wixstatic\.com\/media\/[^\s)"']+/g;
  for (const match of html.matchAll(regex)) {
    const normalized = normalizeWixUrl(match[0]);
    const stem = fileStem(normalized);
    if (EXCLUDED_FILENAMES.has(stem)) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "image/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}

async function importTrip(slug: string, wixUrl: string) {
  console.log(`\n🌍 ${slug}`);
  console.log(`   ${wixUrl}`);

  const tripDir = path.join(CONTENT_TRIPS, slug);
  if (!fs.existsSync(tripDir)) {
    console.warn(`   ⚠️  Skipping: content/trips/${slug}/ doesn't exist`);
    return;
  }
  const photosDir = path.join(tripDir, "photos");
  fs.mkdirSync(photosDir, { recursive: true });

  console.log(`   Fetching HTML…`);
  const html = await fetchHtml(wixUrl);
  const urls = extractImageUrls(html);
  console.log(`   Found ${urls.length} unique images`);
  if (urls.length === 0) {
    console.warn(`   ⚠️  No images extracted — Wix layout may have changed`);
    return;
  }

  // Download each image into the photos folder as wix-NN.<ext>
  let idx = 0;
  for (const src of urls) {
    idx++;
    const id = String(idx).padStart(2, "0");
    const ext = fileExt(src);
    const outPath = path.join(photosDir, `wix-${id}.${ext}`);
    try {
      const buf = await downloadImage(src);
      fs.writeFileSync(outPath, buf);
      process.stdout.write(`   ✓ wix-${id}.${ext}\n`);
    } catch (err) {
      console.warn(`   ✗ wix-${id} — ${(err as Error).message}`);
    }
  }

  // Hand off to the standard optimizer
  console.log(`\n   Running photos:import to optimize…`);
  execSync(`npx tsx ${path.join(ROOT, "scripts", "import-photos.ts")} ${slug}`, {
    cwd: ROOT,
    stdio: "inherit",
  });
}

async function run() {
  const onlySlug = process.argv[2];
  const targets = onlySlug ? { [onlySlug]: TRIP_MAP[onlySlug] } : TRIP_MAP;

  if (onlySlug && !TRIP_MAP[onlySlug]) {
    console.error(`Unknown trip slug: ${onlySlug}`);
    console.error(`Known: ${Object.keys(TRIP_MAP).join(", ")}`);
    process.exit(1);
  }

  for (const [slug, url] of Object.entries(targets)) {
    try {
      await importTrip(slug, url as string);
    } catch (err) {
      console.error(`❌ ${slug} failed: ${(err as Error).message}`);
    }
  }

  console.log(
    `\n✅ Done.\n\n` +
      `Next:\n` +
      `  1. Look at content/trips/<slug>/photos/ and rename wix-NN.jpg files\n` +
      `     to descriptive names (e.g. 01-hero.jpg, 04-peles-castle.jpg).\n` +
      `  2. Re-run: npm run photos:import -- <slug>\n` +
      `     This will regenerate public/ assets and pick up your new names.`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
