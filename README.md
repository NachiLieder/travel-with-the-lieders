# Travel With The Lieders

A Hebrew, RTL, image-driven family travel blog. Trips, country guides, and practical tips for traveling with kids.

Built with **Next.js 16** (App Router) · **Tailwind CSS v4** · **MDX**.

See `docs/PLAN.md` for the full strategic plan.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Repo layout — everything per trip in one place

```
content/trips/<slug>/
├── index.mdx               ← the post body + frontmatter (source of truth)
├── photos/                 ← YOU drop originals here, named descriptively
│   ├── 01-hero.jpg              big top image
│   ├── 02-cover.jpg             square trip-card thumbnail
│   ├── 03-day1-sinaia.jpg
│   ├── 04-peles-castle.jpg
│   └── ...                      NN-subject.jpg convention
├── maps/                   ← (optional) .geojson tracks, route PNGs, day maps
├── attachments/            ← (optional) PDFs, printable itineraries, receipts
└── gallery.json            ← AUTO-generated catalog (do not edit by hand;
                              your caption/altText overrides ARE preserved on re-run)
```

The photo optimizer reads `content/trips/<slug>/photos/`, generates four
web-ready sizes per image, strips EXIF, and writes the public/ assets:

```
public/trips/<slug>/gallery/
├── 04-peles-castle.jpg          1920w
├── 04-peles-castle-large.jpg    1280w
├── 04-peles-castle-medium.jpg    640w
└── 04-peles-castle-thumb.jpg     320w
```

**Filename → caption auto-derivation:** `04-peles-castle-exterior.jpg`
becomes `"Peles Castle Exterior"` by default, used as the caption AND alt text.
You can override either per-image in `gallery.json`.

### Repo layout (top level)

```
app/                          Next.js App Router pages
components/                   layout/, trip/, ui/
content/trips/<slug>/         (above)
lib/
  countries.ts                Country registry
  trips.ts                    MDX loader
  captions.ts                 Filename → caption helper
scripts/
  new-trip.ts                 npm run trip:new
  import-photos.ts            npm run photos:import
  wix-import.ts               npm run wix:import (one-shot legacy scraper)
public/trips/<slug>/gallery/  Auto-generated optimized assets
.claude/skills/new-trip-post/ Cowork skill that drafts new trip posts end-to-end
docs/PLAN.md                  Full project plan
```

## Adding a new trip

The fastest path uses two scripts and the `new-trip-post` Cowork skill.

### Option A — fastest (Cowork skill, recommended)

In Cowork, just say *"new trip — we just got back from X"* (or paste your notes). The `new-trip-post` skill at `.claude/skills/new-trip-post/SKILL.md` will run a focused interview and produce the full MDX + social-media pack + SEO variants.

### Option B — manual

```bash
# 1. Scaffold the trip folder with photos/ maps/ attachments/ subdirs + MDX stub
npm run trip:new -- north-italy-lakes-2024

# 2a. Drop your photos into content/trips/north-italy-lakes-2024/photos/
#     with descriptive names: 01-hero.jpg, 02-cover.jpg, 03-day1-sirmione.jpg, ...

# 2b. (Or copy from an external folder — script copies them in for you)
npm run photos:import -- north-italy-lakes-2024 ~/Pictures/Italy

# 3. Optimize them (4 widths, strip EXIF, generate gallery.json with auto captions)
npm run photos:import -- north-italy-lakes-2024

# 4. Edit captions/alt text in content/trips/<slug>/gallery.json if you want
#    Re-running photos:import preserves your edits.

# 5. Add <Gallery images={gallery} /> to the MDX where you want photos to appear
# 6. npm run dev → preview at http://localhost:3000/trips/<slug>
```

### Migrating photos from the old Wix site

One-shot scraper that pulls every photo from the legacy Wix blog:

```bash
npm run wix:import                       # all 5 trips
npm run wix:import -- czech-north-2025   # one trip
```

Per trip the script: fetches the Wix post → extracts all wixstatic image URLs → downloads the full-resolution originals into `content/trips/<slug>/photos/` as `wix-NN.jpg` → then runs the standard photo optimizer to produce `public/` assets + `gallery.json`.

**After running**, look at `content/trips/<slug>/photos/` and rename the `wix-NN.jpg` files to descriptive names (`01-hero.jpg`, `04-peles-castle.jpg`, etc.) — that's what makes the auto-captions meaningful. Then re-run `npm run photos:import -- <slug>` to regenerate `gallery.json` with the new names.

The mapping of trip slugs to Wix URLs lives at the top of `scripts/wix-import.ts` (`TRIP_MAP`).

### Adding a new country

Add an entry to `lib/countries.ts`:

```ts
{
  iso2: "FR",
  heName: "צרפת",
  enName: "France",
  slug: "france",
  continent: "Europe",
  themeColor: "#4f7da3",
}
```

(The `isoNum` field is no longer needed since the world map was removed.)

## Deployment

Deploy to [Vercel](https://vercel.com/new). No configuration needed — `next build` works out of the box.
