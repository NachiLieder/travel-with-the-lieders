#!/usr/bin/env node
/**
 * Scaffold a new trip. Usage:
 *   npm run trip:new -- <slug>
 *
 * Creates content/trips/<slug>/index.mdx with the full frontmatter skeleton +
 * the standard 15-section structure, ready for editing.
 */

import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run trip:new -- <slug>");
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const tripDir = path.join(ROOT, "content", "trips", slug);
if (fs.existsSync(tripDir)) {
  console.error(`Trip "${slug}" already exists at ${tripDir}`);
  process.exit(1);
}

fs.mkdirSync(tripDir, { recursive: true });
// Per-trip content subfolders
for (const sub of ["photos", "maps", "attachments"]) {
  const dir = path.join(tripDir, sub);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
}

const today = new Date().toISOString().slice(0, 10);

const stub = `---
title: ""
slug: "${slug}"
country: ""
region: ""
season: "summer"
year: ${new Date().getFullYear()}
durationDays: 7
kidsAges: []
transport: ["flight"]
heroImage: ""
coverImage: ""
excerpt: ""
bestFor: []
tags: []
publishedAt: "${today}"
relatedTrips: []
seoTitle: ""
metaDescription: ""
---

## למה דווקא ביעד הזה?

(הסיפור הקצר של למה בחרנו ביעד הזה.)

## למי הטיול הזה מתאים?

- ילדים בגילאי X-Y
- אוהבי טבע / חופים / ערים / תקציב / יוקרה

## המסלול שלנו

<DayCard day={1} title="...">
...
</DayCard>

<DayCard day={2} title="...">
...
</DayCard>

<KidsWorked>
- ...
- ...
</KidsWorked>

<KidsHard>
- ...
- ...
</KidsHard>

## טיפים פרקטיים

<TipBox>
**...**
</TipBox>

## נקודות עניין מומלצות

- ...
- ...

## תקציב לטיול

| קטגוריה | סה"כ |
|---------|------|
| טיסות | 0€ |
| לינות | 0€ |
| אוכל | 0€ |
| **סה"כ** | **0€** |

## האם נחזור?

(התשובה הכנה.)
`;

fs.writeFileSync(path.join(tripDir, "index.mdx"), stub);
console.log(`✅ Created content/trips/${slug}/`);
console.log(`     ├── index.mdx`);
console.log(`     ├── photos/      ← drop your photos here (NN-subject.jpg)`);
console.log(`     ├── maps/        ← (optional) .geojson / route images`);
console.log(`     └── attachments/ ← (optional) PDFs, receipts, etc.`);
console.log(`\nNext steps:`);
console.log(`  1. Fill in the frontmatter (title, country, kidsAges, etc.)`);
console.log(`  2. Drop photos into content/trips/${slug}/photos/`);
console.log(`  3. npm run photos:import -- ${slug}`);
console.log(`  4. npm run dev → http://localhost:3000/trips/${slug}`);
