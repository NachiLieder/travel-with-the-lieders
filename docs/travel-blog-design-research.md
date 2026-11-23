# Travel blog design research (6 sites)

Method: opened each homepage in a browser and read computed styles (fonts, sizes, colors), the page text, and one screenshot at 800x600.
Limits: hover/scroll animations were not captured. Anywhere We Roam's screenshot rendered blank (still loading), so its hero and colors are from computed styles only. Sizes are desktop-ish values at the 800px test viewport, so they may scale up on wide screens.

---

## 1. Roadbook: editorial magazine

- **Mood:** Monocle / Kinfolk. Quiet, premium, type-led.
- **Background:** warm off-white `#F3F2EB`. Text pure black. Hero text white over full-bleed photos.
- **Fonts:** `moret` (a high-contrast serif, weight 300) for everything editorial. `ff-nexus-typewriter` (a typewriter-style mono) for UI labels, categories, nav and buttons.
- **Type scale:**
  - Hero H1 36px / lh 1.1
  - Newsletter H1 48px
  - H2 24px
  - Body 16px, weight 300
  - Labels 12–20px, UPPERCASE
  - Fullscreen menu links ~53px serif, white
- **Header:** tiny (41px). Giant "ROADBOOK" wordmark centered at top, plus a black round **MENU** pill top-right. Menu opens a fullscreen overlay with huge serif links (City Guides, Travel, Opinion, People, Photography, Hotels), and small mono links (About Us, Store, Subscribe, Search).
- **Layout:** stacked `panel` sections: a full-height hero, then a "FEATURED" mono label with an editorial grid. Each card shows a date (mono caps), a category tag, then a serif headline. About 80 images, no card borders or shadows, just whitespace.
- **Widgets:** a black mailing-list toast bottom-right with a white pill "SUBSCRIBE NOW" button. Full-width newsletter block ("Subscribe to the newsletter", 48px). "Advertisement" slots. A City Guides footer list.
- **Buttons:** white pill, mono 12px caps, dark text `#25292B`.
- **Steal:** mono caps date+category metadata above serif headlines, and the fullscreen giant-type menu.

## 2. Rojo Cangrejo: full-bleed hero slider (Spanish)

- **Mood:** bold, photo-first, adventurous.
- **Background:** white body. The home hero is a full-screen image slider (10 slides, "1 | 10" counter bottom-right, arrow buttons on the sides).
- **Fonts:** custom display font `RojoCangrejo` for headings (weight 300, 34px, white over the image). System UI stack for body (19px, `#231F20`).
- **Nav:** absolute-positioned over the hero (135px tall), transparent. Items are white uppercase, 20.8px, letter-spacing 2.08px: DESTINOS, LO MÁS LEÍDO, ESPAÑA, SOBRE MÍ, CONTACTO, plus social icons and a search icon top-right.
  - DESTINOS opens a mega-dropdown of countries (Alemania, Bélgica, España, Francia, Grecia, Italia...) in dark `#231F20` uppercase.
  - Region tabs under it: Europa / América / África / Asia / Oceanía.
- **Slide structure:** a small caps CTA button per slide with an outline, e.g. "SÚBETE AL BARCO", "EMPIEZA EL VIAJE", "COMIENZA LA RUTA". Title 34px, then an italic-ish tagline, then the CTA.
- **Below the hero:** "DESTACADO" featured block (e.g. Egipto) with an EXPLORAR button, author block (name, "Conóceme"), a "Calentito en Rojo Cangrejo" latest-posts list with country tag, date and comment count.
- **Link color in body:** bright turquoise `#4DE7D7`. This is the closest match to your turquoise theme.
- **Steal:** CTA copy with personality (verb-led, themed per post), the transparent overlay nav, the slide counter, and turquoise links.

## 3. Wander-Lush: clean, calm, split hero

- **Mood:** thoughtful, literary, colorful photography on white.
- **Background:** white body, black text, light grey panel (`#F0F0F0`-ish) on the hero's right half.
- **Fonts:** `Fraunces` serif (weight 300) for H1/H2. `DM Sans` for everything else.
- **Type scale:**
  - H2 hero 35px, section H2 30.8px
  - Card H3 17px DM Sans 300
  - Body 18px, weight 300
  - Nav 16px uppercase, letter-spacing 0.14px
  - Submenu 14px
  - "As seen in:" label 17px, 500, uppercase
- **Header:** 102px, white, relative. Brand wordmark left, search and hamburger icons right. Mega-menu groups (About, Places > Asia/Cambodia/Hong Kong...) with "Expand" toggles.
- **Hero:** split layout. Photo left (about 55%), grey text panel right: serif headline, short author bio, two buttons ("About me" outlined grey border, "Plan your trip" white).
- **Sections:** "As seen in" press logos, "Featured Guides for Georgia", "New on the Blog" (6 cards), "Video Guides" (YouTube cards with small colored tags: TRAVEL UPDATE / CITY GUIDE / ROAD REPORT), "More on the blog →" link.
- **Cards:** image on top, light 17px title, no border.
- **Steal:** the split hero (photo and text panel), tag-labeled video cards, and a press-logo strip.

## 4. HeyCiara: bold personality, color-blocked

- **Mood:** warm, upbeat, personal brand.
- **Background:** cream `#FDF8E8`-ish, with colored section blocks.
- **Palette:** deep green `#146D57` (section labels), coral red `#E05747` (big headlines), peach `#FFAC71` (script accent), black body text.
- **Fonts:** 4 types mixed deliberately:
  - `Baskerville Bold` for H1/H2, 48px, coral or green
  - `Karla Bold` for uppercase labels, 16–22px, letter-spacing about 1px
  - `Karla` for body, 14px
  - `Marquette Script` for handwritten accents, 28px, peach ("Wanna be Pen Pals?")
- **Header:** colorful rainbow logotype "HEYCIARA" left, nav right (HOME ABOUT TRAVEL BLOG PORTFOLIO CONTACT SHOP) in small black caps, search icon in peach.
- **Hero:** full-width photo of Ciara in an orange dress. Text sits on the right in the open sky: "Hey, I'm Ciara!" in coral serif, then a green caps tagline, "I HELP WANDERERS PURSUE EXTRAORDINARY LIVES...".
- **Sections:** "FEATURED PRESS:" logo strip, then a story/About block with a green-caps pull-quote ("YOUR GIRL STARTED WITH NO EXPERIENCE AND CERTAINLY NO TRUST FUND"), a "Shop my Travel Essentials" bar, and a pen-pal newsletter signup. 7 images only, so it's text-forward.
- **Steal:** the script-font accent line, mixing a serif headline with green caps labels, and an About block right on the home page.

## 5. Anywhere We Roam: clean grid blog

- **Mood:** friendly, practical, guide-first.
- **Background:** white, near-black text `#141618`, nav submenu text `#303133`.
- **Fonts:** `Outfit` for headings and nav (500–700). `Montserrat` for body (18px, 400). `Inter` is loaded as a fallback.
- **Type scale:** H1 26px, 500, white with 1.82px letter-spacing (over the hero image). Card H3 21px, 500. Nav 14px, 600, letter-spacing 1.4px (white on the hero, dark inside dropdowns). Dropdown items 14px, 500.
- **Header:** transparent, absolute over the hero. Left items "ABOUT US", "PLACES", "EXPERIENCES", "BLOG". PLACES is a large mega-menu grouped by region (England / Europe / Americas / Africa / Asia / Australia) with bold group headings.
- **Hero:** full-bleed photo with centered white "Anywhere We Roam" and the tagline "A TRAVEL BLOG FOR INDEPENDENT TRAVELLERS".
- **Sections:** an intro paragraph (two travellers, Paul and Mark), a **"where we've been and where we're going" timeline** (JUL 2026 Amsterdam & Berlin, AUG 2026 Austria, NOW London, NOV 2026 South Africa...). Then a destination card grid (Egypt, Vienna, Patagonia, Southwest USA, Morocco...) with dates in the card title like "Egypt (Jan–Apr 2027)". 29 images.
- **Links in text:** strong blue `#0151C1`, weight 600.
- **Steal:** the "now / next" travel timeline. It maps directly onto a family-trip blog.

## 6. The Blonde Abroad: soft feminine / boutique

- **Mood:** airy, pastel, lifestyle brand.
- **Background:** white page with beige/cream panels `#F6F0E7`. Text is warm grey `#73736F`. Active nav and accent: tan `#C5B8A8`.
- **Fonts:**
  - `Ivy Mode` (thin serif, weight 100) for headings, uppercase, letter-spacing 1.5px, 18–29px
  - `Lato` for body, 16px
  - Nav 12px uppercase, letter-spacing 1px
  - Script accents: `Sebastian Bobby` (90px, "all-female tours") and `Saturday Script` (64px)
  - The logo is a mixed thin sans plus script "The Blonde Abroad"
- **Header:** 189px, tall and centered. Top utility bar (HOME ABOUT BLOG LIGHTROOM PRESETS PRESS CONTACT) with a search box right and tiny social icons, then a big centered logo, then a second nav row with a home icon: START HERE, DESTINATIONS, PACKING GUIDES, TYPE OF TRIP, LIFESTYLE, PHOTOGRAPHY, TRAVEL SHOP, RESOURCES, cart.
- **Hero:** a collage of 2–3 photos side by side. The right tile is a pale beige panel with "Welcome to" in script, a stylized postage-stamp photo frame, and a tan "LEARN MORE" button.
- **Sections:** "featured FROM THE BLOG" (3 tiles with a LEARN MORE link), About Kiki block with "VIEW THE FULL STORY", a "travel FOR FREE" points & miles promo, "BUCKET LIST experiences" as pill chips (ROAD TRIP, SOLO TRIP, AFRICAN SAFARI...) in cream with warm-grey text, "EXPLORE BY DESTINATION" numbered expandable list (1 AFRICA, 2 ASIA...). Heavy at 103 images.
- **Steal:** the beige pill chips for trip types, light uppercase serif section titles, and script words as accents.

---

## Cross-site patterns

| Pattern | Seen on |
|---|---|
| Full-bleed hero photo with transparent nav on top | Rojo Cangrejo, Anywhere We Roam, HeyCiara |
| Serif headline + sans/mono body pairing | All six |
| Uppercase small-caps labels with letter-spacing (1–2px) | Roadbook, Rojo, Blonde Abroad, HeyCiara, AWR |
| Script/handwritten accent font | HeyCiara, Blonde Abroad |
| Mega-menu for destinations (by region) | Rojo, Wander-Lush, AWR, Blonde Abroad |
| Press / "As seen in" logo strip | Wander-Lush, HeyCiara |
| Newsletter capture (toast or full block) | Roadbook, HeyCiara |
| Tag chips (category, trip type) | Roadbook, Blonde Abroad, Wander-Lush |
| Author intro on the home page | Wander-Lush, HeyCiara, Blonde Abroad, Rojo, AWR |
| Cards with no borders or shadows, just whitespace | Roadbook, Wander-Lush, AWR |

## Suggested direction for your site (turquoise theme)

1. **Hero:** full-bleed family photo, transparent nav on top (Rojo Cangrejo / AWR style), with a verb-led CTA ("Join the trip").
2. **Fonts:** a serif for headlines (Fraunces is free and works with a turquoise theme; make sure it has Hebrew coverage or pair with a Hebrew serif) plus a clean sans for body. Add one script accent for a single phrase.
3. **Labels:** small uppercase letter-spaced metadata (country, date) above each card title, as in Roadbook and Blonde Abroad.
4. **Palette:** keep your turquoise (Rojo Cangrejo's `#4DE7D7` is a good reference for link/hover), add a warm cream (`#F6F0E7`) for panel backgrounds and a coral or peach (`#E05747` / `#FFAC71`) accent for CTAs.
5. **Home sections:** "Where we've been / where we're going" timeline (AWR), a split hero for the About (Wander-Lush), pill chips for trip types (Blonde Abroad), a newsletter toast (Roadbook).
6. **RTL:** all of these are LTR, so mirror layouts (hero text panel, arrows, timeline direction) when applying them.
