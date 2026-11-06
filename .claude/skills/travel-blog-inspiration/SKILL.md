---
name: travel-blog-inspiration
description: "Detailed design reference built from six leading travel blogs, with The Blonde Abroad as the PRIMARY reference (its fonts, three-band header and sticky menu, featured trip cards, bucket-list carousel, postcard About, numbered destination accordion and photo world map), plus Roadbook, Rojo Cangrejo, Wander-Lush, HeyCiara and Anywhere We Roam: exact fonts, sizes, colors, spacing, button dimensions, hover and transition behavior, image ratios, grid gaps, header/footer/menu mechanics, widgets, and a small-details checklist. Use when building or restyling any hero, nav, menu, card grid, button, newsletter, trip timeline, trip-type chips, About block, footer, or when the user says 'like other travel blogs', 'what do the good blogs do', 'mimic', 'apply the small details', or 'polish'. Always combine with site-design-system, which wins on conflicts (turquoise theme, Hebrew RTL)."
---

# travel-blog-inspiration

A measured pattern library. Numbers below were read from live pages (computed styles and stylesheet `:hover` rules). Where something is an inference or was not measurable, it is marked **(inferred)** or **(not measured)**.

**Authority order:** `site-design-system` (turquoise theme, Hebrew, RTL, motion rules) > this skill. Borrow patterns and numbers, never images, logos, copy, or font files. Full per-site write-up: `docs/travel-blog-design-research.md`.

## Workflow for applying a pattern

1. Find the pattern in section 2 (what to copy) and the matching numbers in sections 3-6.
2. Map colors to the site's tokens in `app/globals.css`. Only use a borrowed hex when this skill says so.
3. Run the **RTL pass**: mirror hero text side, arrows, slide counter, hover-underline origin, timeline direction, icon arrows ("->" becomes "<-").
4. Run the **Hebrew font pass**: Fraunces, Moret, Ivy Mode, Baskerville, Marquette Script, Karla, Outfit do not cover Hebrew. Pair with a Hebrew-capable face and use the Latin face only for numerals and English words. Never let the browser fall back silently.
5. Run the **small-details checklist** (section 7) before calling it done.

---

## 0. PRIMARY REFERENCE: The Blonde Abroad (theblondeabroad.com)

This is the main model for the site's feel: soft, boutique, scrapbook/postcard. When a choice is open, copy its approach first, then fall back to the other five sites (sections 1-8). All numbers were measured on the live home page at 1024px viewport (the layout is fixed-width ~1024 with a 960px logo and 340px card columns). Items marked **(inferred)** or **(not measured)** are not hard facts.

### 0.1 Palette (all measured)

| Token | Hex | Used for |
|---|---|---|
| Text gray | `#73736F` | all body text, headings, nav links |
| Tan | `#C5B8A8` | active nav item, "LEARN MORE" links, list links, arrows icons |
| Script peach | `#DBBBA0` | the "featured" script word |
| Terracotta | `#BC8774` | open accordion row, small H4 labels |
| Pink-beige | `#DDCBC0` | solid CTA buttons ("VIEW THE FULL STORY"), white text on it |
| Number peach | `#E4C9B5` | accordion numbers and diamond bullets |
| Cream | `#F6F0E7` | bucket-list chips, top bar tint |
| Overlay cream | `rgba(246,242,239,.9)` | slide-down menu/search overlay |
| Off-white | `#FBFAF9` | "featured" section background |
| White | `#FFFFFF` | page, sticky nav, dropdowns |
| Hairlines | `#F0ECE9`, `#DDDDDD`, `#E3C9B6`, `#FFFFFF` | 1px ring shadows, input borders, divider under card titles |
| Footer text | `#AAAAAA` | footer on a transparent background |

Rule: **no black anywhere**. Text is warm gray, accents are sandy tan/peach. Everything is low contrast and airy. For our turquoise site, keep this structure but swap tan/peach for turquoise tints, and keep cream as the neutral. Re-check contrast: `#73736F` on white is ~4.7:1 (OK), `#C5B8A8` on white is only ~2:1 (fine for decorative arrows, **not** for text that carries meaning; darken to at least 4.5:1 for real text).

### 0.2 Fonts (measured)

| Role | Font | Spec |
|---|---|---|
| Headings, card titles, section titles | **Ivy Mode** (thin high-contrast serif) | weight **100**, uppercase for section titles with tracking **1.5px**; card titles 18px/26px, tracking .5px, sentence case; "About" title 15px caps; H2 sizes 21px and 29px |
| Script accent word | **Sebastian Bobby** (flowing signature script) | 70px (featured), **110px** (bucket list), 90px (all-female tours); tracking 2px; line-height set tiny (15px) so the script hangs/overlaps the neighbor line; colors `#DBBBA0` (peach) or `#73736F` |
| Second script | Saturday Script | 64px, used on the hero banner/promos |
| Light display | `jules_biglight` | 15px / tracking .5px, used in small headings (H4) |
| Body, nav, buttons | **Lato** 400 | body 16px/26px; nav 12px caps tracking 1px; buttons 12px caps tracking 1px; small text 14px/24px; labels 11-13px caps tracking .5-1px |

The signature trick: **a two-voice heading**. A big lowercase script word, followed by a thin uppercase serif phrase on the same baseline ("*featured* FROM THE BLOG", "*travel* FOR FREE", "BUCKET LIST *experiences*", "Packing *Guides*"). The script word goes before or after the serif phrase and is 3-5x larger.

Hebrew adaptation: Ivy Mode, Sebastian Bobby and Lato have **no Hebrew glyphs**. Use a Hebrew-capable thin serif (for example Frank Ruhl Libre at its lightest weight; verify coverage in the Google Fonts page before adopting) for the "Ivy" role, Heebo/Assistant light for the "Lato" role, and keep the script accent for **Latin-only words** or numerals, or choose a Hebrew handwriting face (for example Gveret Levin; verify) for the accent. Hebrew has no uppercase: replace "caps" with size, weight and tracking (keep tracking at most ~.05em for Hebrew).

### 0.3 Header and menu bar (measured)

Three stacked bands:

1. **Utility bar (top, ~53px row, cream/blush tint with a painted brush-stroke bottom edge):** left side links HOME, ABOUT, BLOG, LIGHTROOM PRESETS, PRESS, CONTACT, FAQ. Each link is a 53px-high hit area, `padding 13.5px`, Lato **12px caps, tracking 1px**, `#73736F`; the current page link is tan `#C5B8A8`. `transition: .1s ease-in-out` on color. Right side: a **search box 180x36px** (white fill, no border, padding 5px 8px, 12px caps placeholder "SEARCH THE SITE ...", magnifier icon at the right edge). Under it a row of tiny round social icons (Instagram, Facebook, Twitter, YouTube, Pinterest, RSS; ~11-12px glyphs, spaced ~14px).
2. **Logo band (white, ~90px tall logo, 960px wide, centered):** a wide light-weight wordmark "THE *Blonde* ABROAD" where THE and ABROAD are thin uppercase sans/serif and **Blonde is a flowing script**. The logo is a **background-image** on the site-title link; the site tagline text is kept in the DOM for SEO (hidden). Generous whitespace above and below (about 70px each).
3. **Main nav (white, hairline top/bottom, centered, 12px caps, tracking 1px):** [home icon] START HERE, DESTINATIONS, PACKING GUIDES, TYPE OF TRIP ▾, LIFESTYLE ▾, PHOTOGRAPHY, TRAVEL SHOP, RESOURCES ▾, [cart icon]. Link `padding 13.5px`, row 53px high. **Wraps to a second centered row** at ~1024px.
   - **Sticky:** this band becomes `position: fixed` at the top of the viewport after scrolling past the header (class `sticky-nav`), white background, so the menu stays reachable with no shrink animation (**shrink not observed**).
   - **Dropdowns:** `.sub-menu` ~190px wide, white, each item `padding 10px`, 12px caps tracking 1px, text `#73736F`; fade in with `opacity .4s ease-in-out` (hidden by `left:-9999px`). Item hover uses the same `.1s ease-in-out` color shift. A small ▾ caret follows parent items.
4. **Slide-down overlay:** a fixed full-viewport `div.tba-overlay.overlay-slidedown` (`rgba(246,242,239,.9)` cream, 768px tall at that viewport) that slides down from the top, used for the mobile menu / search **(inferred from class names; not opened)**.

For the Lieders site: keep the three-band structure (utility links + search + socials / centered wordmark / main nav with caret dropdowns), make the main nav sticky, make dropdowns fade `.4s`. In RTL the utility links start on the right and the search box sits at the left.

### 0.4 Hero (measured)

- A single full-width **linked banner image** (1900x1242 source, shown ~400px tall at 1024 wide, `object-fit` crop) with **all text baked into the image**: a left photo (hiker on a red rock arch), a middle polaroid-style framed photo (Sphinx/pyramid) on a sandy paper background with leaf illustrations, and on the right "*Welcome to*" in a large script, "THE · BLONDE · ABROAD" spaced caps, a dictionary-style "noun" tag, a 3-line description in Lato, and a tan "START HERE" button (flat, ~100x20px small caps).
- **Art-directed mobile version:** separate 440x470 image, swapped by class (`img.desktop` / `img.mobile`), not a responsive crop.
- The whole banner is one link to "Start Here".
- Takeaway: the hero is a designed collage, not a text-on-photo overlay. If we copy it, build it as real HTML over layered images instead (so Hebrew text stays editable, accessible and crisp), keeping the layout: two photos left/center, text panel on a paper-textured background at the end side.

### 0.5 "Featured from the blog" trip cards (measured)

- Section background `#FBFAF9`, title centered, margin `40px 0 15px`: script "featured" (Sebastian Bobby 70px, `#DBBBA0`, tracking 2px, `margin-right 10px`) + "FROM THE BLOG" (Ivy Mode 21px caps, tracking 1.5px, `#73736F`).
- **3 cards per row, each 340x430px, gap 2px** (x = 0, 342, 684). Each card has a **5px transparent border** and a **paper-texture background image** (`featured-bg@2x.jpg`, soft blush/greige marbling), plus a **1px ring shadow `#F0ECE9`** so it looks like a matted print.
- Inside, in order:
  1. Photo **280x260px** (ratio ~1.08, nearly square), margins `22px 25px 12px`, `object-fit: cover`, no radius.
  2. Title: Ivy Mode **18px / 26px**, tracking .5px, centered, **forced 2 lines via `<br>`** ("Where to Travel in 2026 / Based on Your Zodiac"), gray `#73736F`, margins `0 27.5px 10px`.
  3. A **1px white hairline** under the title (`border-bottom 1px solid #fff`, inset 27.5px each side).
  4. "LEARN MORE": Lato **12px caps, tracking 1px, tan `#C5B8A8`**, centered, `transition .1s ease-in-out` (hover darkens, **exact hover color not measured**).
- The section ends with a **stitched / zig-zag decorative border** along the bottom edge (a repeating small dashed pattern), then white space.
- Card hover: **no image zoom observed** (no transform rules found). The card is quiet; the only reaction is the link color.
- Mapping to Lieders trip cards: paper-textured mat (a very light cream with subtle grain, or a faint turquoise-tint paper), near-square photo, 2-line serif title, hairline, small caps "לקריאה" link. Cap titles at 2 lines with `<br>` or `text-wrap: balance`.

### 0.6 "Bucket List experiences" carousel (measured)

- Section on white. Title: "BUCKET LIST" Ivy Mode 29px caps tracking 1.5px + script "experiences" in **110px** Sebastian Bobby, `margin-left 10px`, line-height 15px so the script drops below the baseline; heading `margin-bottom 70px` to make room.
- **Flickity carousel**, 8 tiles, `wrapAround: true`, `draggable: false`, `pageDots: false`, `groupCells: 100%` (arrow-paged only, no dots, no dragging).
- Tile **320x419px portrait** (source 1280x1802, ratio ~0.71), photo fills the tile (`cover`). Partial tiles peek at both edges.
- Label: a **cream `#F6F0E7` rectangle button** pinned to the bottom center of the photo, text "ROAD TRIP", "SOLO TRIP", "LEAF PEEPING IN THE USA", "AFRICAN SAFARI", "A GIRLS' TRIP", "TRIPS TO TAKE IN YOUR 30S", "BACKPACK SOUTHEAST ASIA", "GO TO A FESTIVAL"; Lato 12px caps tracking .5px, `#73736F`, ~160x32px, sits ~25px above the tile bottom. The label width fits its text.
- Arrows: **30x75px** flat rectangles, `rgba(255,255,255,.75)` fill, dark `#333` chevron, vertically centered on the tile edges, no radius, `.1s ease-in-out`.

### 0.7 About: the postcard (measured)

- On a **parchment/cream textured panel** (~530px wide) designed as a **postcard**: left a framed photo **280x365**; then a **dashed vertical divider** (image `postcard-divider@2x.png`, 30x360); then the message side with an **80x80 "par avion" stamp** and a second postmark/stamp **175x105** in the top corner.
- Text on the message side, centered, width ~280-300px: "ABOUT KIERSTEN" Ivy Mode **15px caps tracking 1.5px lh 28px**, margin `30px 0 15px`; body Lato **14px / 24px** gray, margin-bottom 24px; button **"VIEW THE FULL STORY"** `200x35px`, background `#DDCBC0`, white text, 12px caps tracking 1px, `padding 2px 10px`, 1px border `#DDCBC0`, no radius.
- To the right of the postcard, a narrower column "*travel* FOR FREE" with a list of two links, each with a **small arrow/paper-plane icon at the end** and a hairline under each row; link text tan `#C5B8A8`.
- For us: a family-postcard About block (stamp with a Hebrew postmark, dashed divider, "לסיפור המלא" button). Dashed divider flips side in RTL, and the stamp moves to the top-start corner.

### 0.8 Destinations: accordion list + map (measured)

This section is titled "EXPLORE BY DESTINATION" (Ivy Mode 29px caps tracking 1.5px, centered, gray) and has **three coordinated controls**:

1. **Left (start-side) accordion box**, `210px` wide, white, `10px solid #fff` border, `padding 20px`. Small label "CLICK TO EXPAND" (Lato **11px caps, tracking .5px**). Then 9 rows, **alphabetical and numbered 1-9: Africa, Asia, The Caribbean, Central America, Europe, The Middle East, North America, Oceania, South America**.
   - Row = tan number `#E4C9B5` + a **small diamond with a "+" icon** (peach `#E4C9B5`) + region name **13px caps, tracking 1px, `#73736F`**. Row height ~37px.
   - Open state (jQuery `data-collapse="accordion"`, `aria-expanded` toggles): row text goes terracotta `#BC8774` **(inferred from heading color)**, the "+" becomes "-" **(inferred)**, and a list reveals: first item "VIEW REGION", then countries in caps (13px, tracking 1px, gray), each linking to a destination guide. Only one open at a time.
2. **Dropdown `<select>` "BY DESTINATION"**, `394x45px`, white, `1px solid #ddd`, `padding 10px`, Lato 14px, caps, with native chevron. Options are all countries alphabetically; choosing one navigates immediately (`onchange → location`). Next to it, the search box (same style as the header search).
3. **The map (right side), `810x480px`** (source file 1620x960, @2x), an illustrated **world map PNG** wired to a real HTML `<map>` with **9 polygon hotspots** (one per continent; resized with `imageMapResize` so clicks line up at any width). Each hotspot links to the region guide.

**What the map image looks like (viewed directly):**
- A cream/ivory **paper-textured world silhouette** (no country borders, soft edges) on a transparent background so it sits on the page's white.
- On each continent: a **polaroid-style photo frame** (square-ish photo with a thin double outline: inner border plus an outer offset border), roughly 100x100px at map scale, placed to overlap the continent's coast so photos never cover the whole land mass.
- A **numbered circle badge (1-9)**, translucent blush-pink circle with a light number, overlapping the frame's corner; the numbers match the accordion rows exactly.
- A **caption under each photo in small spaced caps** (the Ivy Mode look): AFRICA, ASIA, THE CARIBBEAN, CENTRAL AMERICA, EUROPE, THE MIDDLE EAST, NORTH AMERICA, OCEANIA, SOUTH AMERICA.
- Photos are iconic travel shots: Golden Gate (N. America), a woman on a boat (C. America), Havana car (Caribbean), Machu Picchu (S. America), Brussels Grand-Place (Europe), a camel in dunes (Middle East), a giraffe at a window (Africa), turquoise islands (Asia), a palm beach (Oceania).
- **Hover/click behavior:** only a link on each hotspot; **no hover animation was found** (the picture is static) **(not measured beyond that)**.

**Recommendation for the Lieders map (better than an image map):** build it as an **inline SVG (or positioned buttons over a background SVG)** so it is crisp, responsive, accessible and RTL-safe:
- Cream paper silhouette, one **polaroid marker per visited country/trip** (photo from that trip), numbered badge, small caps caption in Hebrew.
- Each marker is a real `<a>`/`<button>` with `aria-label`, keyboard focus ring, and hover that lifts the polaroid (`translateY(-4px) rotate(-1deg)`, shadow, `.3s`), since the original has no hover.
- Keep the **three-way sync**: hover/focus a row in the accordion highlights its marker (badge fills), and vice versa; the select and search are an escape hatch for people who don't like maps.
- **Do not mirror the map** in RTL (geography stays); do mirror the accordion/search placement. Data source for countries is probably `lib/countries.ts` **(verify)**.
- Number badges should be shown in Latin digits or Hebrew letters consistently in both list and map.

### 0.9 Other sections worth copying (measured)

- **Press / ad slots:** `mv-ad-box` 250px-tall slots between sections (we should skip ads but keep the vertical rhythm: ~70-90px between bands).
- **Shop / "Packing Guides" block:** a stamp-style badge image (213x113 "TBA collection" stamp) over a heading with the two-voice style ("Packing *Guides*"), paragraph, and a "Read More" link. Use for a "Packing list" or "Gear" block.
- **Presets block / blogger resources block:** large image-backed rows with a script heading, text, and a single flat button.
- **Newsletter row at the bottom ("tba-blog-sub"):** 325px band, simple; three small gray dots appear as a loader (page-bottom).
- **Footer:** transparent background, `#AAAAAA` 12px text.

### 0.10 Micro-interaction summary

| Element | Behavior |
|---|---|
| Nav links, dropdown items, "LEARN MORE", carousel arrows | color/opacity shift with `transition: .1s ease-in-out` (very quick, subtle) |
| Dropdown panels | fade `opacity .4s ease-in-out` |
| Main nav | becomes fixed/sticky on scroll |
| Overlay menu/search | slides down, cream 90% |
| Bucket-list carousel | arrow-paged, wraps around, no dots, no drag |
| Destination accordion | exclusive open, plus/minus icon, numbers align with map |
| Map | clickable polygons, no hover effect |
| Cards | no zoom; calm |
Everything is **quiet and fast**. The site's life comes from texture, script type, layered paper, and photography, not from animation. site-design-system still requires life: add the lift-and-rotate polaroid hover on the map, a gentle 1.03 image scale on cards (`.5s`), and fade-ins on scroll while keeping that calm tone, and respect `prefers-reduced-motion`.

### 0.11 Build checklist for this reference

- [ ] Three-band header: utility links + search + social / centered mixed-script wordmark / sticky main nav with fade dropdowns.
- [ ] Two-voice section titles (script word + thin caps serif) on every home section.
- [ ] Hero as a layered collage (photo, polaroid, paper panel with text), not a flat photo.
- [ ] Trip cards 340x430 with paper mat, 5px border, 1px ring, 280x260 photo, 2-line title, hairline, tiny caps link.
- [ ] Portrait trip-type carousel 320x419, cream label chip at the bottom, boxed 30x75 arrows, wrap-around.
- [ ] Postcard About with stamp(s) and dashed divider.
- [ ] Destinations: numbered accordion + select + search + photo-polaroid world map, all synced.
- [ ] No black, no heavy shadows, 0px radius on photos and buttons (these are flat, matte).
- [ ] Hebrew: font pair verified, no letter-spacing abuse, script accents Latin-only or a Hebrew handwriting face.
- [ ] RTL: list/search/utility links mirrored; map not mirrored; arrows and postcard divider mirrored.

---

## 1. The six sites at a glance

| Site | Personality | Headings | Body / UI | Page color |
|---|---|---|---|---|
| Roadbook | Quiet magazine | `moret` serif 300 | Moret 300 16px; `ff-nexus-typewriter` mono caps for labels | warm off-white `#F3F2EB`, text `#000`, footer black |
| Rojo Cangrejo | Adventurous, photo-first | custom `RojoCangrejo` 300, 34.5px, white on photo | system sans 19.2px `#231F20` | white; footer `#F0F0F0` text `#262626`; accent turquoise `#4DE7D7` |
| Wander-Lush | Calm, literary, colorful photos | `Fraunces` 300 | `DM Sans` 300, 18px | white, black text |
| HeyCiara | Warm personal brand | `Baskerville Bold` 48px; `Marquette Script` 28px | `Karla` 14px body, `Karla Bold` caps labels | cream page; green `#146D57`, coral `#E05747`, peach `#FFAC71` |
| Anywhere We Roam | Friendly practical guide | `Outfit` 500 | `Montserrat` 18px 400 | white, text `#141618`, alt section `#F7F7F7` |
| The Blonde Abroad | Soft boutique | `Ivy Mode` weight 100 uppercase | `Lato` 16px `#73736F` | white + cream `#F6F0E7` + tan `#C5B8A8` |

---

## 2. Pattern catalog (what to copy, with exact specs)

### 2.1 Full-bleed hero with transparent nav (Rojo Cangrejo, Anywhere We Roam)
- Nav sits **over** the photo: `position:absolute`, transparent background, ~135px tall (Rojo). Nav items white, uppercase, 20.8px, weight 300, letter-spacing **2.08px (0.1em)** (Rojo); AWR uses 14px / 600 / 1.4px (0.1em).
- Hero content stack (Rojo): title 34.5px white weight 300, one-line tagline, then an **outline CTA**.
- Rojo slider: 10 slides, side arrows (white circle on hover, `.flickity-button:hover {background:#fff}`), a large "1 | 10" counter bottom corner, arrows fade to `opacity:1` on hover.
- AWR: centered white "Anywhere We Roam" H1 26px / 500 / letter-spacing 1.82px (0.07em), tagline in caps under it.
- Rule: the photo must carry enough contrast for white text, so add a dark gradient scrim behind the text.

### 2.2 Split hero / About panel (Wander-Lush)
- Left ~55% full-height photo, right ~45% light-grey panel (not white, so it reads as a card).
- Panel stack: serif H2 **35px** weight 300, bio paragraph 18px/300, two buttons side by side (outline "About me", filled or white "Plan your trip").
- Header above it: 102px tall, white, brand left, search + hamburger icons right.

### 2.3 Editorial card (Roadbook)
- Order of elements: image, then **date (mono caps)**, then category tags (mono caps), then **serif headline**.
- No borders, no shadows, no radius (0px). Separation is whitespace only.
- Image ratios used in one grid: 1.25, 0.77, 0.75, 1.5, 1.78. Mixed portrait and landscape tiles, all `object-fit: cover`.
- Section titles are mono caps 20px / lh 22px: "FEATURED", "IN MOTION", "THE FUTURE OF TRAVEL".
- Container max-width 1500px; tile columns at 33.33%; grid wrap uses `calc(100% + 20px)` to cancel 10px gutters.

### 2.4 Fullscreen overlay menu (Roadbook)
- Trigger: small round **black MENU pill**, `position:fixed`, top-right, always visible while scrolling.
- Overlay is a white fixed `nav` with giant serif links ~**52.8px** (lh 58px), a black fixed secondary strip for About/Store/Subscribe/Search (mono caps 20px, white), a fixed social list, and a fixed `menu-images` slot (image preview that changes per link, **(inferred)**).
- Hover on the pill: the black circle behind it scales **1.1** with `transition: .3s`.

### 2.5 Destinations mega-menu (Rojo, AWR, Wander-Lush)
- Rojo: DESTINOS opens a dark panel (`#1C1C1C` overlay) with country links in uppercase 20.8px / 2.08px tracking, plus region tabs Europa / América / África / Asia / Oceanía.
- AWR: PLACES opens a region-grouped list; group headings 14px **700**, links 14px **500**, color `#303133`.
- Wander-Lush: items with "Expand" toggles, top level 16px caps 0.144px tracking, children 14px.

### 2.6 Where-we-have-been timeline (Anywhere We Roam)
- Rows: **month + year in caps** (JUL 2026), place name, one-sentence note. One row is labelled **NOW**. Future rows are real upcoming trips (NOV 2026, JAN ...).
- Followed by destination cards where the **dates sit in the title**: "Egypt (Jan-Apr 2027)", 21px / 500 / `#141618`.
- Cards: radius 0, soft shadow `0 15px 30px rgba(0,0,0,.075)` (resting `0 0 30px rgba(0,0,0,.075)`).

### 2.7 Trip-type pill chips (The Blonde Abroad)
- Background `#F6F0E7`, text `#73736F`, 12px caps, tracking **0.5px**. Chips: ROAD TRIP, SOLO TRIP, LEAF PEEPING IN THE USA, AFRICAN SAFARI, A GIRLS' TRIP...
- Section header above: "BUCKET LIST experiences" with "BUCKET LIST" in caps serif and "experiences" in lowercase (case contrast is the style).

### 2.8 Personality accents (HeyCiara, Blonde Abroad)
- One **script** phrase per page area ("Wanna be Pen Pals?" 28px peach `#FFAC71` tracking 2.8px; "all-female tours" 90px; "Welcome to" in script on the cream hero tile). Never more than one script line per viewport.
- Pair a coral serif H1 (`#E05747`, 48px) with a **green caps label** (`#146D57`, Karla Bold 18-22px, tracking 0.05em).
- Pull-quote in caps green under the hero, then a plain-language story block, all on the home page.

### 2.9 Social proof strip (Wander-Lush, HeyCiara)
- Label "As seen in:" 17px / 500 / uppercase (Wander-Lush) or "FEATURED PRESS:" Karla Bold 22px / 1.1px tracking in green (HeyCiara), then a row of grayscale logos.

### 2.10 Newsletter (Roadbook)
- **Toast:** black rounded box, bottom-right, white 12px text, small close "x", a white pill button "SUBSCRIBE NOW" (mono 12px caps, lh 18px, text `#25292B`). On button hover the cookie/toast button shifts to radius 22px and font 10px **(its hover is a small shrink)**.
- **Block:** a full-width section, H1 **48px** serif weight 300 ("Subscribe to the newsletter"), H2 24px, kicker "JOIN US FOR THE JOURNEY" in mono caps above, white input (16px mono caps, text `#25292B`) with a pill button.

### 2.11 Video / content-type tags (Wander-Lush)
- Small caps colored tag above the title (TRAVEL UPDATE, CITY GUIDE, ROAD REPORT), then title, plus a "More on YouTube ->" link right-aligned with the section heading.

### 2.12 Header variants
- **Tall centered (Blonde Abroad):** 189px; top utility row (12px caps, 1px tracking, active item tan `#C5B8A8`, others `#73736F`); search box top-right; tiny social icons; big centered logo; second row with home icon + START HERE, DESTINATIONS, PACKING GUIDES, TYPE OF TRIP, LIFESTYLE, PHOTOGRAPHY, TRAVEL SHOP, RESOURCES, cart icon. Lives on a pale marbled/cream texture strip.
- **Minimal (Wander-Lush):** 102px white, brand text 18px left, two icons right.
- **Oversized logo (Roadbook):** logo spans most of the width at the top and scrolls away, menu pill stays fixed.

---

## 3. Typography details

| Role | Spec |
|---|---|
| Hero H1 | 26-48px, weight 300 (serifs) or 500 (Outfit); line-height 1.1 for big serif (Roadbook 36px/39.6px) |
| Section H2 | 24-35px; Wander-Lush 30.8px Fraunces 300 |
| Card title | 17px (Wander-Lush DM Sans 300), 18px Blonde Abroad Ivy Mode with 0.5px tracking, 21px AWR Outfit 500 |
| Body | 16-19px; weight **300** is common (Roadbook, Wander-Lush) for a light editorial feel |
| Label / meta | 12-16px, uppercase, tracking 0.5-2.1px; dates and categories use a different family than the headline |
| Nav | 12px (Blonde Abroad, tracking 1px), 14px (AWR, tracking 1.4px), 16px (Wander-Lush, tracking 0.14px), 20.8px (Rojo, 2.08px) |
| Overlay menu | ~53px display serif |
| Script accent | 28px (HeyCiara) up to 90px (Blonde Abroad) |

Detail rules:
- **Light weights (100-300) on large text** give the airy look. Do not combine with low contrast gray below 4.5:1 for body.
- **Letter-spacing scales with caps**: roughly 0.05em-0.1em on small uppercase. Never track lowercase body text.
- **Two typographic voices:** a "headline voice" (serif) and a "label voice" (mono or sans caps). Mixing 3+ families is only for script accents.
- Use font-weight 300 only if the chosen Hebrew font has a real light cut; otherwise it will be faux-synthesized.

---

## 4. Buttons and links (measured)

| Style | Source | Spec |
|---|---|---|
| Outline CTA on photo | Rojo | `padding 12px 35px`, `border 1px solid #fff`, radius 0, height 45px, 16px caps, `transition .3s` |
| Outline on grey | Wander-Lush | `padding 4.4px 14px`, `border 1px solid #000`, radius 0, height 36px, 16px, `transition .3s ease-in-out`; heavier variant `2px solid #000` (38px) |
| Filled | Wander-Lush | `padding 7.2px 18px`, radius **3px**, 18px, height 43px, `.3s ease-in-out`; hover swaps to the highlight/button-hover color |
| White pill | Roadbook | white bg, text `#25292B`, mono caps 12px / lh 18px, fully rounded |
| Utility button | Blonde Abroad | `padding 10px`, white bg, text `#73736F`, radius 0, 12px caps, `transition .1s ease-in-out` |
| Cream chip | Blonde Abroad | `#F6F0E7`, 12px caps, 0.5px tracking |

Hover and link behavior:
- **Underline appears on hover** (Rojo: `a:hover {text-decoration:underline}`; HeyCiara: underline + `opacity .8` on titles, subheads, paragraph links; Roadbook quote link: `underline 2px`, tag links `1px`).
- **Muted-on-hover** for inline links (Roadbook `p a:hover {color:#777}`).
- **Wander-Lush:** `a:hover` changes color to a highlight variable and sets `text-underline-offset: .25em`. Header nav uses an **underline grow**: `::after` scales from 0 to 1 on hover.
- **Button ripples (AWR/Uncode):** `btn-ripple-out`, `btn-ripple-in` (a 12px-outset ring fades over **1s**), `btn-underline-in/out` (underline bar scales from left or right, text nudges **0.075em** up/down), `btn-hover` (label slides **-100%** to reveal a second label), icon-rotate **360deg**.
- **HeyCiara menu:** hover sets color coral `#E05747` and bumps size to **24px**; `opacity` transitions **.5s**.
- **Social icons (Wander-Lush):** `transform: scale(1.1)`.
- **Carousel arrows (Rojo):** idle faded, `opacity: 1` on hover; arrow background becomes white; `opacity .3s`.
- Link color in running text varies: turquoise `#4DE7D7` (Rojo), blue `#0151C1` weight 600 (AWR), black with 1px bottom border (Wander-Lush, `border-bottom: 1px solid #000`), tan `#C5B8A8` (Blonde Abroad).

---

## 5. Images, grids, spacing

**Image behavior**
- Radius is **0px on every site**. Sharp rectangles are the norm; do not round photos unless site-design-system says so.
- `object-fit: cover` everywhere cards need fixed boxes (Roadbook, HeyCiara, Blonde Abroad).
- **Hover zoom on cards (Roadbook):** `.grid-wrap-inner:hover img { transform: scale(1.05) }` with `transition: .5s ease-in-out`; same on shop grid tiles. Rojo's carousel images also use `.5s ease-in-out`.
- Ratios seen: 3:2 (1.50) card tiles at 355x237 (Rojo), 4:5 / 3:4 portraits (0.75-0.79) and 16:9 hero tiles (Roadbook), perfect squares 200x200 and 306x306 (Wander-Lush, HeyCiara, Blonde Abroad Instagram feed), 2.2:1 logo bars.
- Hero banners 1920 wide, 1.25-1.78 ratio.

**Grid and gap**
- Wander-Lush: 3 columns at ~318px wide with gap **15px / 10px** (row/col); 4 columns at ~240px with **15px / 5px**; 3-col content row gap 16px; max container **1290px**, narrow reading column **1024px**, with `90%` width on small screens.
- Roadbook: container 1500px, 10px gutters.
- Blonde Abroad: containers 960 / 1110 / 1680px.
- Rojo: 960px content column, Bootstrap-style 8.33% / 16.67% / 25% / 41.67% / 50% / 75% fractions.
- Section heights are generous: 700-1800px sections with 100px+ vertical rhythm (**not measured exactly**). Leave at least 64-96px between home sections.

**Shadows**
- Mostly none. When used they are very soft: `0 2px 13px rgba(0,0,0,.1)` (small), `0 0 32px rgba(0,0,0,.1)` (drawers), AWR cards `0 15px 30px rgba(0,0,0,.075)`.
- Rojo has one **hard offset shadow**: `7px 7px 0 #4DE7D7` (turquoise block shadow, a playful sticker effect) and an **inset bottom bar** `0 -4px 0 #4DE7D7 inset` (underlined active state).
- Blonde Abroad uses **1px ring shadows** instead of borders: `0 0 0 1px #F0ECE9`, inset `#E3C9B6`.

**Sections**
- Alternate white and a tint (AWR `#F7F7F7`, Blonde Abroad cream `#F6F0E7`) to separate content without lines.
- Footer: Roadbook black (842px tall, 12px type), Rojo light gray `#F0F0F0` with `#262626` text (740px), Blonde Abroad `#AAAAAA` text on transparent. Footers are tall and hold: city/destination list, about/studio/Instagram/LinkedIn/Pinterest/privacy/sitemap links, copyright.

---

## 6. Behavior and widgets

- **Fixed UI:** Roadbook menu pill and overlay layers; Rojo's navbar (black, fixed) and overlay (`#1C1C1C`); Wander-Lush header and drawers (overlay `rgba(0,0,0,.4)`, white drawer); Blonde Abroad has a fixed semi-transparent cream bar `rgba(246,242,239,.9)` (a sticky nav on scroll).
- **Mobile drawer:** Wander-Lush slides a white drawer over a 40% black overlay.
- **Transitions in use:** `.1s linear` (fast color change), `.2s ease-in-out`, `.3s` / `.3s ease-in-out` (buttons, menu pill), `.5s ease-in-out` (image zoom, fades), `opacity .3s` (arrows), `.1s ease-in-out` (Blonde Abroad buttons). Pick **0.3s for controls, 0.5s for imagery**.
- **Keyframes:** Rojo has `shake-vertical` (a small attention shake, typically on a scroll-down arrow **(inferred)**). Roadbook defines no keyframe animations; its life comes from the 1.05 zoom and the menu overlay.
- **Widgets present:** Instagram feed grid with lightbox (Blonde Abroad, 6-up squares), slide counter (Rojo), press logo strip, newsletter toast, cookie bar, scroll-to-top button (Wander-Lush, filled/outline styles), search drawer, "Advertisement" slots (Roadbook), YouTube video cards, points-and-miles promo block, shop/store grid, expandable destination accordion (Blonde Abroad "CLICK TO EXPAND", numbered 1 AFRICA, 2 ASIA...).
- **Scroll:** `scroll-behavior` is `auto` on the sites checked, so none use smooth scroll by default.

---

## 7. Small-details checklist (run on every UI change)

Typography
- [ ] Headline and label use different families or clearly different treatments (serif vs caps label).
- [ ] Uppercase labels have letter-spacing (0.05-0.1em); body does not.
- [ ] Light weights on big display text only; body stays readable.
- [ ] Hebrew font verified for every text style; numerals and Latin words checked.

Color and surfaces
- [ ] Alternating section tints instead of divider lines.
- [ ] One warm neutral (cream) next to the turquoise to avoid a cold look.
- [ ] Text contrast at least 4.5:1, including white text over photos (add a scrim).
- [ ] Photos are sharp-cornered **unless** site-design-system defines a radius.

Interaction
- [ ] Every link has a hover state (underline, color shift, or opacity .8).
- [ ] Buttons transition **.3s**; images zoom to **1.05** over **.5s ease-in-out** inside an `overflow:hidden` frame.
- [ ] Menu trigger has a hover scale (1.1).
- [ ] Carousel arrows idle faded, full opacity on hover; counter visible.
- [ ] Social icons scale 1.1 on hover.
- [ ] Focus-visible styles exist for keyboard users.
- [ ] `prefers-reduced-motion` disables the zoom and shake.

Layout
- [ ] Container max ~1290px content, ~960-1024px reading column.
- [ ] Gutters 10-16px between cards; 64-96px between sections.
- [ ] Card meta order: image, date, category, headline (Roadbook).
- [ ] Tall sections: hero is full viewport; nothing important hides under the transparent nav.
- [ ] Fixed elements (menu pill, newsletter toast, cookie bar) don't overlap each other on mobile.

Content touches
- [ ] CTA labels are verbs with personality ("Join the trip", "Start the route"), not "Read more".
- [ ] Dates in titles for trips (Egypt (Jan-Apr 2027)).
- [ ] A "now / next" marker in the trip timeline.
- [ ] Author or family intro visible on the home page.
- [ ] One script/handwritten moment at most per screen.

RTL
- [ ] Hero text panel, arrows, counter, hover-underline origin, timeline, and "->" arrows mirrored.
- [ ] Logical CSS properties (`margin-inline`, `inset-inline`, `text-align: start`) used instead of left/right.
- [ ] Mono caps labels: Hebrew has no case, so replace "uppercase" emphasis with weight, size, or tracking.

---

## 8. Don'ts

- Don't copy images, logos, fonts, or text.
- Don't replace the turquoise theme with a borrowed palette. Use borrowed hexes only as accents (cream `#F6F0E7`, coral `#E05747`, peach `#FFAC71`, Rojo's turquoise `#4DE7D7` for hover/links).
- Don't round photo corners or add heavy shadows to mimic these sites. They are sharp and flat.
- Don't ship a pattern without verifying it on mobile and in RTL.

## 9. Known gaps (re-measure if they matter)

- Exact vertical section padding, footer column layout, and the Roadbook menu image-preview behavior were not measured.
- Anywhere We Roam's hero screenshot never rendered; its hero look is inferred from styles (white centered H1 over a photo).
- Hover values come from stylesheet rules; real feel (easing curves on nav drop-downs, carousel speeds) needs a manual pass.
- To refresh: open the site, read `getComputedStyle` for body/h1-h3/nav/buttons, scan `document.styleSheets` for `:hover` rules, record `document.fonts`, capture a screenshot, then update this file and `docs/travel-blog-design-research.md`.
