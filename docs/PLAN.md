# Travel With The Lieders — Rebuild Plan

A practical, opinionated plan to take the Lieder family travel blog off Wix and rebuild it as a fast, image-driven, RTL Hebrew site with an interactive world map as the centerpiece.

---

## 1. Vision recap

**One-line pitch:** A real Israeli family sharing real trips — beautiful, honest, kid-tested — discoverable through an interactive world map where every country we've visited lights up and tells its story.

**Target reader:** Hebrew-speaking parents (mostly Israeli) planning their next family trip, who want practical logistics, kid-friendly itineraries, and honest "what actually happened" stories — not generic travel-guide fluff.

**Three north-star metrics to optimize for:**
1. **Time on site / pages per session** — proxy for "clicky" engagement.
2. **Returning visitors** — proxy for trust and brand strength.
3. **Instagram + Pinterest referrals** — proxy for social pipeline working.

---

## 2. Current state (inventory from Wix)

Family: Lieder — Irit, Nachi, Hayley, Daniel.

Trips currently published:

| # | Trip | Country / Region | Approx. date |
|---|------|------------------|--------------|
| 1 | צפון צ'כיה | Czech Republic (North) | Oct 2025 |
| 2 | דרום פורטוגל והאי מדירה | Portugal + Madeira | 2024–2025 |
| 3 | צפון איטליה — אגם מאג'ורה ואגם גארדה | Italy (lakes) | 2024 |
| 4 | עשרה ימים ברומניה המפתיעה | Romania | 2024 |
| 5 | הרפובליקה הדומיניקנית — שבועיים | Dominican Republic | Oct 2024 |
| 6 | Ultimate Packing List | Tips (cross-cutting) | — |

**Issues to fix on the way out:**
- Wix is loading slowly and is image-heavy without proper optimization.
- Several Wix URL slugs are wrong (e.g. the Italy post URL is `טיול-בלתי-נשכח-לתאילנד` — Thailand slug pointing to Italy content). Need clean, descriptive slugs.
- Contact section still has Wix's default placeholder (`123-456-7890`, San Francisco address). Out of scope content-wise but flagged for the new site.
- No structured tagging (best-for-toddlers, road-trip, nature, etc.) — we'll add this.

**Countries to seed the map (v1):** Czech Republic, Portugal, Italy, Romania, Dominican Republic. Thailand if there's draft content somewhere.

---

## 3. Tech stack (decided)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Best DX for image-heavy, SEO-critical, partially-interactive sites. SSG for trip pages, ISR if needed. |
| Styling | **Tailwind CSS** with `rtl:` variants | RTL-friendly out of the box, fast, no CSS sprawl. |
| Content | **MDX in the repo** via **Velite** (or `@next/mdx` + gray-matter) | Git is the CMS. Velite gives typed frontmatter via Zod and clean DX. |
| i18n / RTL | **next-intl** + `dir="rtl"` on `<html>` + CSS logical properties | Standard 2026 setup for Hebrew. Lets us add English later as a 2nd locale without rework. |
| Map | **react-simple-maps** (SVG, country-level click) — d3-geo + world-atlas TopoJSON under the hood | Perfect for "click a country → go to country page". If we later want pan/zoom/3D we swap in **MapLibre GL JS**. |
| Images | `next/image` + remote loader; **Cloudinary** or **Bunny.net** once volume grows | Free on Vercel up to limits, automatic AVIF/WebP, responsive sizes. |
| Hosting | **Vercel (Hobby tier)** | Zero-config, generous free tier, edge CDN, preview deploys per PR. |
| Analytics | **Vercel Analytics** + **Plausible** (or Umami self-hosted) | Privacy-friendly, GDPR-safe, no cookie banner. |
| Comments (optional) | **Giscus** (GitHub Discussions) | Free, no DB, fits the static-site model. |
| Newsletter | **Buttondown** or **Beehiiv** | Cheap, ESP-quality, embeds well. |

**Why not Astro?** It's a great fit, but the interactive map + image gallery components are nicer to author in React-only land. Next.js wins on ecosystem and on familiarity for future contributions.

---

## 4. Information architecture

```
/                            # Hero: interactive world map + latest trips + tips strip
/trips                       # Grid of all trips, filterable by tags
/trips/[slug]                # Individual trip post (MDX)
/countries                   # Index of countries with content
/countries/[country]         # Country landing page → all trips in that country
/tags/[tag]                  # e.g. /tags/toddlers, /tags/road-trip
/tips                        # Practical posts (packing, flying with kids, etc.)
/tips/[slug]
/about                       # The Lieder family
/contact
/api/og/[slug]               # Dynamic OG image generation per trip
sitemap.xml, rss.xml, robots.txt
```

**Hebrew-first URLs.** We'll use English slugs for portability and SEO (Hebrew slugs work but break copy-paste, share previews, and analytics on some platforms). Hebrew title is the source of truth; slug is a kebab-case English transliteration we choose deliberately. Example: `/trips/north-czech-republic-2025`.

---

## 5. The interactive world map (the centerpiece)

**What it does:**
- Renders a full-world SVG map, Hebrew-friendly (no labels on the map — labels appear on hover/tap).
- Countries we've visited are **filled and pulse subtly**; others are muted gray.
- Hover (desktop) or tap (mobile) shows a tooltip: country name in Hebrew + cover image + "X טיולים".
- Click navigates to `/countries/[country]`.

**Implementation:**
- `react-simple-maps` with the `world-atlas` (110m) TopoJSON dataset.
- A `countries.ts` data file maps ISO-3166 country codes → metadata: `{ heName, slug, tripCount, coverImage, themeColor }`.
- Visited countries lookup is the keyset of that map; the renderer styles them accordingly.
- Mobile fallback: below `md` breakpoint, render the **card grid** (the `theworldtravelguy.com` style) instead — long-press on tiny country shapes is bad UX on phones.

**Performance:** The 110m TopoJSON is ~100KB gzipped — fine for first paint. We lazy-load the map component (`dynamic(() => import('@/components/WorldMap'), { ssr: false })`).

**Accessibility:** Each country path gets `role="button"`, `aria-label="טיולים ב{country}"`, keyboard navigation via tab + Enter. Tooltip is also announced.

---

## 6. Trip page anatomy (the template that has to be great)

Each trip MDX file follows this frontmatter contract (validated by Velite/Zod at build):

```yaml
---
title: "עשרה ימים ברומניה המפתיעה"
slug: "romania-10-days-2024"
country: "RO"            # ISO 3166-1 alpha-2
region: "Transylvania, Bucharest"
season: "summer"
year: 2024
durationDays: 10
kidsAges: [6, 9]
transport: ["flight", "rental-car"]
heroImage: "./hero.jpg"
coverImage: "./cover.jpg"   # square, for cards
excerpt: "טיול מפתיע במזרח אירופה..."
bestFor: ["nature", "road-trip", "older-kids", "budget"]
tags: ["castles", "carpathians", "transylvania"]
publishedAt: "2024-09-15"
updatedAt: "2025-12-01"
relatedTrips: ["czech-north-2025", "italy-lakes-2024"]
---
```

**Page sections (in this exact order — matches your project instructions):**

1. **Hero** — full-bleed image + Hebrew title + "best for" pill tags.
2. **Quick facts strip** — sticky band: dates · kids' ages · length · transport · budget tier (`$`/`$$`/`$$$`).
3. **Emotional hook** — 2–3 sentences in your voice (warm, personal). Auto-pulled from the first MDX block.
4. **Quick summary** — TL;DR box.
5. **Who this trip is good for** — bullets with icons.
6. **Suggested itinerary** — day-by-day collapsible cards with day map insets.
7. **What we actually did** — the honest narrative section.
8. **What worked with kids** — green-tinted callout.
9. **What was hard or surprising** — yellow-tinted callout.
10. **Practical tips** — bulleted list, scannable.
11. **Stops, food, photo spots** — interactive map of pins (Leaflet inset).
12. **Budget / planning notes** — optional table.
13. **"Would we do it again?"** — short opinionated take.
14. **Social share row** — pre-filled WhatsApp / FB / Pinterest / IG-copy CTAs.
15. **Related trips** — auto-rendered from `relatedTrips` frontmatter + same-country fallback.

We'll build these as reusable MDX components (`<KidsCallout>`, `<DayCard>`, `<TipsList>`, `<PhotoMap>`, `<BudgetTable>`, `<RelatedTrips>`) so writing a new trip is mostly fill-in-the-blanks.

---

## 7. Design direction

**Mood:** Warm, real-family, slightly editorial — closer to Kinfolk than to a generic affiliate travel blog. Big imagery, generous whitespace, clean Hebrew typography.

- **Typography:** `Heebo` or `Assistant` for body; `Frank Ruhl Libre` for editorial headlines. All from Google Fonts, both have RTL pairs.
- **Color system:** Neutral background (`#FAF7F2` warm off-white), deep ink for text, one signature accent (e.g. terracotta `#C66B4A` — evokes travel without being cliché blue). Per-country theme tint pulled from `themeColor` in country metadata, used subtly in headers and pin colors.
- **Components:** Card grid with hover lift, ken-burns slow-zoom on hero images, sticky reading progress bar, a "ספרו לחברים" floating share button on mobile.
- **Mobile-first.** ~80% of family travel browsing happens on phones — design at 375px first, scale up.

I'd suggest also pulling 2–3 references you actively like (besides theworldtravelguy.com) and we'll converge on a moodboard before writing CSS.

---

## 8. Content workflow

**Repo as the single source of truth.**

```
/content
  /trips
    /romania-10-days-2024
      index.mdx
      hero.jpg
      gallery/
        001-bran-castle.jpg
        002-carpathians.jpg
        ...
      day-map.geojson
  /tips
    /packing-list-2025
      index.mdx
```

**Author flow (for you):**
1. `pnpm new:trip romania-10-days-2024` scaffolds the folder with a frontmatter stub + placeholder images.
2. Dump your notes into `index.mdx`.
3. Drop photos into `gallery/`. A script auto-generates blurred placeholders, EXIF strips, resizes to multiple widths, and writes `gallery.json` with captions.
4. `pnpm dev` → preview locally.
5. Push to a branch → Vercel preview URL → review on phone → merge → live.

**AI-assisted draft pipeline (Claude):**
- Raw notes → polished Hebrew trip post in the house tone.
- Same notes → IG caption, Reel hook, Pinterest title, newsletter blurb, SEO title + meta description.
- This is the natural spot for a custom Cowork **skill** (see §13).

---

## 9. SEO strategy

**Hebrew family-travel search is under-served.** A practical, well-structured Hebrew blog can rank fast.

- **Per-post SEO fields:** `seoTitle`, `metaDescription`, `keywords` in frontmatter. If omitted, sensible defaults are generated.
- **Schema.org structured data:** `TravelAction`, `Article`, `BreadcrumbList`, `FAQPage` (where we have FAQs).
- **Open Graph + Twitter cards** auto-generated per trip via `/api/og/[slug]` (Next.js `ImageResponse`).
- **Sitemap + RSS** generated at build.
- **Internal linking:** `<RelatedTrips>`, `<SameCountry>`, "trips with similar kids' ages" — algorithmic, not manually curated.
- **Target keyword clusters (Hebrew):**
  - `טיול משפחתי ל[יעד]` ("family trip to [destination]")
  - `מה לעשות ב[יעד] עם ילדים` ("what to do in [destination] with kids")
  - `סדר יום טיול [יעד]` ("itinerary [destination]")
  - `טיולי שטח עם ילדים בישראל / באירופה`
  - `אריזה לטיול עם ילדים`
- **English shadow content (phase 3):** as we grow, translate the top 5 posts into English to capture global searches. next-intl makes this trivial.

---

## 10. Social media + growth

**Per-trip content pack** (auto-drafted by the skill, finalized by you):

| Channel | Asset | Notes |
|---|---|---|
| Instagram feed | 1 carousel + 1 reel | Carousel = "5 things we learned in X"; reel = 15s highlight cuts. |
| Instagram caption | ~120 Hebrew words + 8–12 hashtags | Strong opening line, no emojis spam. |
| Pinterest | 3 pins (vertical 1000×1500) | Hebrew + English text overlay versions. |
| Facebook | Short post + link | Israeli family travel groups are big. |
| TikTok | 1 hook + B-roll script | Optional, only if you want the lift. |
| Newsletter | "trip drop" email | 1 photo + 100 words + link. |

**The unfair advantage:** because everything lives in the repo, posting to social can pull from `index.mdx` + `gallery/` + frontmatter — no copy-pasting from a CMS.

---

## 11. Phased roadmap

**Phase 0 — Foundations (Week 1)**
- Init Next.js 15 + Tailwind + next-intl + Velite.
- Set up `dir="rtl"`, Hebrew font, base layout, brand colors.
- Migrate one trip (Romania) end-to-end as the reference implementation.
- Deploy to Vercel + custom domain.

**Phase 1 — MVP (Weeks 2–3)**
- Build trip page template (all 15 sections).
- Build country page + countries index.
- Build the interactive world map.
- Migrate remaining 4 existing trips from Wix.
- Wire SEO, OG images, sitemap, RSS.
- Set up Plausible analytics.

**Phase 2 — Polish + launch (Week 4)**
- Tips section.
- Newsletter signup + Buttondown.
- Pinterest-ready image variants per trip.
- Social share UI.
- Per-trip dynamic OG cards.
- Performance pass (Lighthouse ≥ 95 mobile).
- Redirect map from old Wix URLs → new URLs.
- Announce on social.

**Phase 3 — Growth (ongoing)**
- AI-assisted content pipeline (the skill).
- Photo gallery improvements (lightbox, fullscreen).
- Comments via Giscus.
- English locale for top 5 trips.
- Affiliate / monetization layer (see §12).
- Trip planning interactive tools (budget calculator, packing list generator).

---

## 12. Monetization (eventually)

Not phase 1, but worth designing for so we don't paint ourselves into a corner:

- **Affiliate partnerships** — Booking.com, GetYourGuide, Airbnb, gear brands. Cleanly tagged links, transparent disclosure in Hebrew.
- **Sponsored trips / collaborations** — destination tourism boards, family-friendly hotels.
- **Digital products** — printable itineraries, packing checklists, country mini-guides as PDFs.
- **Newsletter sponsorships** — once the list is >5k.
- **Don't do ads** — destroys the feel of the site. Affiliate + products is much more brand-aligned.

We'll add a typed `<AffiliateLink>` MDX component that handles UTM tagging + disclosure automatically.

---

## 13. Open decisions for you to make

These are the things I need from you before we start coding:

1. **Domain.** Do you own a custom domain? If not, suggested options to register: `lieder-travel.com`, `traveltothelied.com`, or a Hebrew-friendly `.co.il`. Vercel makes connecting trivial.
2. **Logo / brand mark.** Do you want me to draft 2–3 concepts, or do you already have something?
3. **Privacy / contact.** Real contact details to replace the Wix placeholder.
4. **Photo licensing.** Are all photos yours? Any need for attribution or copyright watermark policy?
5. **Tone calibration sample.** Pick the one existing post that sounds *most* like you — we'll use it as the voice anchor.
6. **English later?** Confirm Hebrew-only for v1, English in phase 3. If you want bilingual from day 1, infrastructure cost is minor but content cost doubles.
7. **Comments — yes/no?** Giscus is free and clean but adds a social surface to moderate.
8. **Where do photos currently live?** (Google Photos, Lightroom, Dropbox?) Affects the import pipeline.

---

## 14. What I'd do next, in order

If you give me the green light, my next steps would be:

1. **Initialize the repo** in `/sessions/nifty-trusting-brown/mnt/personal_blog/` with the Next.js 15 + Tailwind + next-intl scaffold and a working RTL Hebrew homepage.
2. **Build a single end-to-end vertical slice** — Romania trip, country page, and the world map with one clickable country — so we can validate the feel before scaling.
3. **Migrate the remaining 4 trips** once the template is locked.
4. **Cut over** by pointing the domain and redirecting old Wix URLs.

I'd estimate ~3–4 focused weekends to get from zero to launched MVP. The biggest variable is photo cleanup and per-trip writing time, not code.

---

## 15. Proposed skill (asking before building)

I see a clear opportunity for a custom Cowork skill — call it `new-trip-post`. It would:

- Take raw trip notes + a country + dates + photo folder as input.
- Produce a fully structured MDX file matching the §6 schema, in your house Hebrew voice.
- Generate the per-channel social media pack from §10 in one shot.
- Suggest 3 SEO title variants, meta description, and Pinterest pin titles.
- Flag missing sections ("you didn't mention budget — want me to ask?").

**Should I create this skill once we have the trip template locked?** It would 5–10x the speed of publishing new trips, and it's a clean fit for the skill-creator pattern.

---

*Plan owner: Nachi. Last updated: 2026-05-24.*
