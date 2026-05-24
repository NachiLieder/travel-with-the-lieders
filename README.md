# Travel With The Lieders

> בלוג טיולים משפחתי אמיתי — a real-family travel blog in Hebrew, built around the trips we actually take.

A practical, image-driven blog by the Lieder family — Irit, Nachi, Hayley & Daniel — for Hebrew-speaking parents who want honest, kid-tested trip notes instead of generic travel-guide writing.

This repo is the full site: Next.js 16, Tailwind CSS v4, MDX, RTL Hebrew throughout, plus a small content pipeline that turns a folder of photos into a polished trip post.

---

## Table of contents

- [What's in here](#whats-in-here)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [How content is organized](#how-content-is-organized)
- [Adding a new trip](#adding-a-new-trip)
- [Migrating photos from the old Wix site](#migrating-photos-from-the-old-wix-site)
- [Adding a new country](#adding-a-new-country)
- [Deployment](#deployment)
- [The Cowork skill](#the-cowork-skill)
- [Credits](#credits)

---

## What's in here

- **A Hebrew, RTL Next.js site** with an About-Us hero on the homepage and a card-grid of every trip below.
- **A 15-section trip template** (hero · quick facts · itinerary day cards · "what worked with kids" / "what was hard" callouts · practical tips · gallery · budget · would-we-do-it-again) — see `app/trips/[slug]/page.tsx` and the MDX components in `components/trip/`.
- **A per-trip content layout** that keeps the MDX, originals, maps, and attachments together in one folder, with auto-generated optimized image variants for the web.
- **Scripts** for scaffolding a new trip (`trip:new`), optimizing a folder of photos (`photos:import`), and a one-shot scraper for migrating from the legacy Wix site (`wix:import`).
- **A Cowork (Claude) skill** at `.claude/skills/new-trip-post/` that takes raw trip notes + photos and produces the full MDX + social-media pack + SEO variants.
- **The full project plan** in `docs/PLAN.md`.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) — static-first, SEO-friendly, fast.
- **React 19** + TypeScript.
- **Tailwind CSS v4** with custom brand tokens (`@theme inline` in `app/globals.css`).
- **MDX** via `next-mdx-remote/rsc` for trip content, with custom Hebrew-friendly components.
- **gray-matter** for frontmatter parsing.
- **sharp** for image optimization (4 widths, EXIF stripping, mozjpeg).
- **lucide-react** for icons (with a small `BrandIcons.tsx` for the trademarked Instagram/Facebook/WhatsApp marks that v1 of lucide stripped).
- **Heebo** + **Frank Ruhl Libre** Hebrew fonts via `next/font`.

---

## Quick start

```bash
git clone https://github.com/NachiLieder/travel-with-the-lieders.git
cd travel-with-the-lieders
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run build           # production build (also a fast type-check)
npm run start           # serve the production build
npm run trip:new        # scaffold a new trip folder
npm run photos:import   # optimize photos for a trip
npm run wix:import      # one-shot scraper for the legacy Wix site
```

---

## How content is organized

Everything for a single trip lives in one folder:

```
content/trips/<slug>/
├── index.mdx                ← post body + frontmatter (source of truth)
├── photos/                  ← drop originals here, named descriptively
│   ├── 01-hero.jpg                 big top image
│   ├── 02-cover.jpg                square trip-card thumbnail
│   ├── 03-day1-sinaia.jpg
│   └── 04-peles-castle.jpg         convention: NN-subject.jpg
├── maps/                    ← optional: .geojson tracks, route PNGs
├── attachments/             ← optional: PDFs, printable itineraries, receipts
└── gallery.json             ← auto-generated; your caption edits survive re-runs
```

The optimizer reads `content/trips/<slug>/photos/`, generates four web-ready sizes per image, strips EXIF, and writes the public assets:

```
public/trips/<slug>/gallery/
├── 04-peles-castle.jpg          1920w
├── 04-peles-castle-large.jpg    1280w
├── 04-peles-castle-medium.jpg    640w
└── 04-peles-castle-thumb.jpg     320w
```

**Filename → caption auto-derivation** (`lib/captions.ts`): `04-peles-castle-exterior.jpg` becomes `"Peles Castle Exterior"` by default, used as the caption AND the alt text. You can override either per-image in `gallery.json`.

### Top-level layout

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
  wix-import.ts               npm run wix:import
public/trips/<slug>/gallery/  Auto-generated optimized assets
.claude/skills/new-trip-post/ Cowork skill that drafts trip posts end-to-end
docs/PLAN.md                  Full project plan
```

---

## Adding a new trip

The fastest path uses the Cowork skill.

### Option A — Cowork skill (recommended)

In Cowork mode, say *"new trip — we just got back from X"* (or paste your notes). The `new-trip-post` skill runs a focused interview and produces the full MDX + per-channel social-media pack (Instagram, Reel hook, Pinterest, Facebook, newsletter) + 3 SEO title variants and a meta description.

### Option B — manual

```bash
# 1. Scaffold the trip folder
npm run trip:new -- north-italy-lakes-2024

# 2a. Drop your photos into content/trips/north-italy-lakes-2024/photos/
#     with descriptive names: 01-hero.jpg, 02-cover.jpg, 03-day1-sirmione.jpg, ...

# 2b. Or copy from an external folder — the script copies them in for you:
npm run photos:import -- north-italy-lakes-2024 ~/Pictures/Italy

# 3. Optimize them (4 widths, strip EXIF, generate gallery.json with auto captions)
npm run photos:import -- north-italy-lakes-2024

# 4. Edit captions/altText in content/trips/<slug>/gallery.json if you want
#    Re-running photos:import preserves your edits.

# 5. Add <Gallery images={gallery} /> to the MDX where you want photos to appear
# 6. npm run dev → preview at http://localhost:3000/trips/<slug>
```

---

## Migrating photos from the old Wix site

One-shot scraper that pulls every photo from the legacy Wix blog:

```bash
npm run wix:import                       # all 5 trips
npm run wix:import -- czech-north-2025   # one trip
```

Per trip the script: fetches the Wix post → extracts all wixstatic image URLs → downloads the full-resolution originals into `content/trips/<slug>/photos/` as `wix-NN.jpg` → then runs the standard photo optimizer to produce `public/` assets + `gallery.json`.

**After running**, look at `content/trips/<slug>/photos/` and rename the `wix-NN.jpg` files to descriptive names (`01-hero.jpg`, `04-peles-castle.jpg`, etc.) — that's what makes the auto-captions meaningful. Then re-run `npm run photos:import -- <slug>` to regenerate `gallery.json` with the new names.

The mapping of trip slugs to Wix URLs lives at the top of `scripts/wix-import.ts` (`TRIP_MAP`).

---

## Adding a new country

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

The country gets its own `/countries/<slug>` page and lights up the country chip on any trip card from that country.

---

## Deployment

The site is static-first and deploys cleanly to [Vercel](https://vercel.com/new) with zero configuration — Vercel detects Next.js automatically. Push to `main` → live in ~30 seconds. Preview deploys per PR work out of the box.

For other hosts: `npm run build` produces a standard Next.js production output that runs anywhere Node 18+ runs.

---

## The Cowork skill

This repo includes a Claude Cowork skill at `.claude/skills/new-trip-post/SKILL.md`. When the project is open in [Cowork](https://claude.ai/cowork), Claude can run the skill to draft a complete trip post — voice-matched to the existing Romania reference trip, with the full 15-section structure, gallery wiring, Hebrew captions, and a per-channel social-media pack — from raw notes and a photo folder.

It enforces the blog's voice rules (warm, personal, honest about what was hard; no fake luxury-influencer tone; no emoji spam) and produces output that's ready to commit.

---

## Credits

- **Content** — Irit & Nachi Lieder. All photos and post text © the Lieder family.
- **Migrated from** — the original Wix site at https://i66demri.wixsite.com/travel-with-the-lied.
- **Built with** — Next.js, Tailwind CSS, MDX, and Anthropic's Claude (Cowork mode) as the engineering co-pilot.

---

*Want to use this codebase as a template for your own family travel blog? Open an issue — happy to help.*
