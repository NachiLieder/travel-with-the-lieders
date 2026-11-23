---
name: new-trip-post
description: "Turns raw family-trip notes + a photo folder into a fully structured Hebrew MDX blog post for the Travel With The Lieders blog, plus a per-channel social media pack (IG, Reel, Pinterest, Facebook, newsletter) and SEO variants. Use when the user says 'new trip', 'write up a trip', 'turn my notes into a post', 'I just got back from X', or shares trip notes / a photo folder. Also use when the user has run npm run trip:new and wants Claude to fill it in."
---

# new-trip-post — turn raw notes into a polished family-trip blog post

This skill takes the user's raw trip notes (and optionally a photo folder) and produces:

1. A **fully structured Hebrew MDX trip post** matching the blog's 15-section template
2. A **per-channel social media pack** (Instagram, Reel/TikTok, Pinterest, Facebook, newsletter)
3. **SEO variants** (3 title options + meta description + Pinterest pin titles)

The blog is **Travel With The Lieders** — a real-family Hebrew travel blog. The repo lives at the project root (look for `content/trips/`, `lib/countries.ts`, `lib/trips.ts`). Always consult those files for the canonical schema, voice tone, and existing trips.

---

## Voice & tone — read this before writing a single word

The blog's identity is **a real Israeli family being honest about traveling with kids**. The voice is set in the project instructions and in the reference trip at `content/trips/romania-10-days-2024/index.mdx`. Read that file before writing — it is the voice anchor.

Concrete rules:

- **Warm, personal, energetic.** Sentences feel like a friend telling another friend. Not a tour guide. Not a travel agent.
- **Honest, not polished.** Say what was hard. Say what surprised you. Say "this didn't work" when it didn't.
- **Practical over poetic.** Concrete logistics beat lyrical writing. "3 hours of driving" not "a journey through verdant landscapes."
- **No fake luxury / influencer voice.** No "stunning", "breathtaking", "absolutely magical". No emoji spam. No hype superlatives.
- **Hebrew only in body content.** English appears only in proper nouns, slugs, SEO fields.

If a draft sentence wouldn't pass the test "Would a real parent at a school pickup say this naturally?" — rewrite it.

---

## Workflow

Run these phases in order. Don't skip ahead.

### Phase 0 — Discover what you have

Before asking the user anything, silently check the repo state:

1. **Read** `lib/countries.ts` — confirm the trip's country already exists. If it doesn't, you'll add it in Phase 4.
2. **Read** `content/trips/romania-10-days-2024/index.mdx` — internalize the voice and the structure. This is the gold standard.
3. **List** `content/trips/` — see what other trips exist (for related-trip suggestions).
4. **Check** if the user has already run `npm run trip:new -- <slug>` (look for an existing stub in `content/trips/<slug>/index.mdx`).
5. **Check** if the user has already run `npm run photos:import -- <slug> ...` (look for `content/trips/<slug>/gallery.json` and `public/trips/<slug>/gallery/`).

Don't show this discovery to the user. Use it to skip questions you can already answer.

### Phase 1 — Gather the trip facts

Run a focused interview using the AskUserQuestion tool. Group into 4 questions max per message. Required facts (anything the discovery already filled in — skip):

**Block A — identity:**
- Country (Hebrew + ISO 3166-1 alpha-2)
- Region(s) within that country
- Slug (English, kebab-case, e.g. `north-italy-lakes-2024`)
- Year + season (spring/summer/autumn/winter)
- Duration in days

**Block B — the family on this trip:**
- Kids' ages on the trip (array of numbers)
- Transport (flight / rental-car / train / bus / cruise — multi-select)

**Block C — content:**
- The 2-3 sentence emotional hook (what made this trip special / surprising)
- Day-by-day what you did (raw notes are fine; you'll structure them)
- What worked great with the kids
- What was hard or surprising
- Top practical tips (3-7)
- Budget tier ($/$$/$$$) or actual numbers if known
- "Would we do it again?" — the honest answer

**Block D — meta:**
- "Best for" tags (multi-select from the canonical list — see `lib/trips.ts` `TripBestFor`)
- Free-form tags (e.g. specific city names, "castles", "lakes")
- Related trips from existing trips (you suggest based on country/tags, user confirms)

**If the user has already provided notes**, parse what you can from them first, then ONLY ask about the missing fields. Don't make them repeat information.

### Phase 2 — Structure the post

Build the MDX following the **exact 15-section structure** from the project's `docs/PLAN.md` §6 (and matched in the Romania reference). Use these MDX components, all of which are wired into the renderer:

- `<DayCard day="N" title="...">...</DayCard>` — one per day of the itinerary

  **Always use quoted string attributes, never `{...}` expressions.** The MDX parser strips expression attributes in this project's Hebrew/RTL files, and it fails silently — the prop simply arrives `undefined`. Write `day="3"`, not `day={3}`, and `photos="a, b, c"`, not `photos={["a","b","c"]}`. The Dominican Republic post lost every one of its in-text photos to exactly this.

  Each day's photos render **inside its card, right after the text** — that is the house layout, not a gallery dump at the end of the post. They are picked up two ways:

  - **Automatic:** any gallery file whose name contains `dayN-` (e.g. `12-day3-zarnesti-canyon-hike.jpg` → day 3). Name files this way during `photos:import` and the itinerary illustrates itself. This is what Romania and Italy do.
  - **Explicit:** `photos="needle, needle"` on the card, where each needle is a substring of the filename. Use this when filenames are not day-numbered.

  After writing, check that every gallery photo lands in some day. One that matches nothing appears only in the bottom gallery.
- `<KidsWorked>...</KidsWorked>` — the "what worked with kids" callout
- `<KidsHard>...</KidsHard>` — the "what was hard / surprising" callout
- `<TipBox>**Bold lead.** Body.</TipBox>` — single-tip box, use 3-5 of these in a row in the Practical Tips section
- `<Gallery images={gallery} />` — only if `gallery.json` exists (Phase 3)

Section order (mandatory):

1. (frontmatter — see Phase 4)
2. `## למה דווקא [יעד]?` — the hook expanded into a short opening
3. `## למי הטיול הזה מתאים?` — bullet list, who should pick this trip
4. `## המסלול שלנו — יום אחרי יום` — `<DayCard>` per day
5. `<KidsWorked>` — flowing under the itinerary
6. `<KidsHard>` — right after KidsWorked
7. `## טיפים פרקטיים` — 3-5 `<TipBox>` blocks
8. `## נקודות עניין מומלצות` — bulleted list of places
9. (optional) `<Gallery />` if photos are imported
10. `## תקציב לטיול` — markdown table (€ or ₪, whichever the user prefers)
11. `## האם נחזור?` — short opinionated paragraph

For day cards, write **2-3 short paragraphs each**. Concrete (where you went, what you ate, how it felt with the kids). No filler.

### Phase 3 — If photos were imported, wire them in

The per-trip content layout is:

```
content/trips/<slug>/
├── index.mdx
├── photos/                     ← descriptively-named originals (NN-subject.jpg)
├── maps/                       ← optional
├── attachments/                ← optional
└── gallery.json                ← auto-generated catalog
```

If `content/trips/<slug>/gallery.json` exists:

1. Read it to get the image count and the existing captions/altText.
2. Pick the first image as the default `heroImage`, second as `coverImage` (these are usually already set by the import script — verify in the frontmatter).
3. Insert a `<Gallery>` block in the post body — best position is **after "What worked / What was hard"**, before "Practical Tips". This is the moment the reader is most invested and most likely to scroll through photos.
4. Add the MDX import at the **top of the file body** (right under the frontmatter):

   ```mdx
   import gallery from "./gallery.json";
   ```

5. **Suggest Hebrew captions** for 4-6 strategic images based on the trip narrative. The script will have populated English defaults (derived from filenames); you propose Hebrew that's actually descriptive of the scene. Show the user a list of `id` → `proposed Hebrew caption` pairs and have them confirm/edit. Then update `gallery.json` to set `caption` (Hebrew) on those entries. **Note:** re-running `npm run photos:import -- <slug>` preserves user-edited captions, so it's safe.

6. **If the photos came from the Wix scraper** (filenames look like `wix-NN.jpg`), nudge the user to rename them descriptively in `content/trips/<slug>/photos/` for better captions/alt-text. Suggested names by mapping which photo shows what subject, then re-running `npm run photos:import -- <slug>`.

### Phase 4 — Write the frontmatter

Use this canonical structure (see `lib/trips.ts` for the typed schema):

```yaml
---
title: "..."                       # Hebrew, full title
slug: "..."                        # kebab-case English
country: ".."                      # ISO 3166-1 alpha-2
region: "..."                      # Hebrew
season: "summer"
year: 2026
durationDays: 10
kidsAges: [6, 9]
transport: ["flight", "rental-car"]
heroImage: "/trips/<slug>/gallery/001.jpg"
coverImage: "/trips/<slug>/gallery/002.jpg"
excerpt: "..."                     # Hebrew, 2-3 sentences, the emotional hook
bestFor: ["older-kids", "nature"]  # see lib/trips.ts TripBestFor for full list
tags: ["..."]
publishedAt: "YYYY-MM-DD"
relatedTrips: ["other-slug-1"]     # 1-3 slugs of existing trips
seoTitle: "..."                    # Hebrew, includes target keyword
metaDescription: "..."             # Hebrew, 140-160 chars
---
```

**If the country is new to the blog**, add it to `lib/countries.ts`:

- Find the country's ISO 3166-1 numeric code (e.g. France = "250"). Look it up — don't guess.
- Pick a `themeColor` that fits the country's vibe (terracotta, forest green, ocean blue, sand yellow, etc.).
- Pick a Hebrew name that matches how Israelis actually call the country.
- Append the entry. Order doesn't matter functionally; group by continent for readability.

### Phase 5 — Generate the social media pack

After the MDX is written, produce the per-channel content pack as a single markdown block the user can copy. **Match each channel's native conventions:**

- **Instagram caption** — ~120 Hebrew words. Strong opening line (a hook, not a description). Story arc: open → tease → call to read more → CTA. 8-12 hashtags at the end, mix general (#טיולעםילדים #משפחה) and specific (#רומניה #קרפטים). Avoid emoji spam — at most 2-3.
- **Reel / TikTok hook** — 1 sentence, 8-12 words, must work as silent text overlay. Examples: "טסנו לרומניה ציפיות נמוכות — וזה מה שקיבלנו" / "המקום שלא חשבנו שנאהב כל כך."
- **Pinterest pin titles (3 variants)** — Hebrew text overlay style, each ≤ 8 words. Pin titles should promise practical value: "מסלול 10 ימים ברומניה עם ילדים", "טיול משפחתי חוסך באירופה".
- **Facebook post** — slightly longer (200-300 Hebrew words), conversational. Israeli family travel groups respond well to direct questions at the end.
- **Newsletter blurb** — 80-120 Hebrew words. One photo + a teaser + a clear link CTA. Less hashtag-y, more email-y.

### Phase 6 — Generate SEO variants

- **3 SEO title options** — Hebrew, each ≤ 60 chars, each leading with the target keyword cluster (e.g. "טיול משפחתי ל[יעד]"). Pick the strongest as `seoTitle`.
- **Meta description** — 140-160 Hebrew chars, includes the keyword and a hook.
- **Slug check** — confirm the slug is descriptive, includes the country/region, and (where relevant) the year for evergreen-vs-timely signaling.

### Phase 7 — Save + summarize

Write the MDX to `content/trips/<slug>/index.mdx` (overwrite if a stub exists). If you modified `lib/countries.ts` or `gallery.json`, save those too.

Then summarize to the user:

```
✅ Trip post written: content/trips/<slug>/index.mdx
   <N> day cards · <K> tip boxes · <P> photos in gallery

Preview: http://localhost:3000/trips/<slug>

Social media pack (paste below) — copy-paste ready:
[the pack]

SEO variants:
[the variants]
```

Don't print the entire MDX inline — link to the file instead.

---

## Common pitfalls (do not do these)

- ❌ Generic AI travel-writer voice. Read Romania first.
- ❌ Adding emoji to the body of the post. The blog has zero emojis in trip text.
- ❌ Filling Day Cards with vague filler. If the user only gave you 2 sentences for day 4, say so and ask — don't invent details.
- ❌ Marking visible photo file paths the user didn't confirm exist. Always check `gallery.json` first.
- ❌ Inventing country codes. ISO 3166 has a definitive list — look it up.
- ❌ Overstuffing hashtags. 8-12 in IG, max. Quality > quantity.
- ❌ Promising places the family didn't visit. The blog's trust depends on "we actually did this."

---

## Quick reference

| What | Where |
|---|---|
| Voice anchor | `content/trips/romania-10-days-2024/index.mdx` |
| Trip schema | `lib/trips.ts` (TripFrontmatter + TripBestFor) |
| Country registry | `lib/countries.ts` |
| MDX components | `components/trip/mdxComponents.tsx` |
| Page template | `app/trips/[slug]/page.tsx` |
| Photo import | `npm run photos:import -- <slug> <folder>` |
| New trip stub | `npm run trip:new -- <slug>` |
| Full plan | `docs/PLAN.md` |
