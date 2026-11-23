---
name: site-design-system
description: "The visual and interaction rulebook for the Travel With The Lieders site — the turquoise/ocean theme, type scale, spacing, RTL rules, component patterns, and the motion/interactivity system that keeps pages feeling alive rather than static. Use whenever building, restyling, or reviewing any UI: a new page or section, a component, a layout change, colors, typography, animation, hover/scroll behavior, or when the user says 'make it look better', 'add some life to it', 'redesign', 'style this', or 'does this match the theme'."
---

# site-design-system — how this site looks and moves

This is the design contract for **Travel With The Lieders**. Every piece of UI on the site follows it.

Two non-negotiables sit above everything else:

1. **The site is Hebrew and RTL.** Direction is not a styling afterthought; it dictates layout, icon direction, and animation direction.
2. **The site must feel alive.** A page that is just well-typed HTML has failed this skill. Motion, response to the cursor, and transitions between states are part of the design, not decoration added at the end.

Read `app/globals.css` alongside this document. That file is the compiled source of truth for tokens; this one explains the intent behind them and the rules for using them.

---

## 1. The theme: deep ocean turquoise

The identity is **water** — ocean, lagoon, open sea. Cool blue-turquoise, crisp and bright, with a sense of depth. It should feel like a **boutique travel postcard**: quiet, airy, matted prints and light type, as in The Blonde Abroad (see `travel-blog-inspiration`, section 0) — but in turquoise, not tan.

### Boutique-postcard overlay (home page, header, footer, cards)

Added when the home page was rebuilt on The Blonde Abroad's structure. These tokens exist in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--color-cream` | `#f8f4ec` | warm band background, label chips |
| `--color-paper` | `#f1ede3` | card mat, postcard parchment (with `--grain`) |
| `--color-paper-cool` | `#eaf3f2` | faint turquoise-tinted mat |
| `--color-hair` | `#e3ddd0` | 1px rings and hairlines |
| `--color-accent-tint` | `#8fcfd0` | **decorative only**: numbers, diamond bullets, arrows (the "tan" role) |
| `--color-script` | `#3f9ea3` | script accent word, **display size only (>= 56px)** |

Utilities: `.paper-mat`, `.paper-panel`, `.stitch-edge`, `.two-voice` (+ `.script` Latin, `.script-he` Hebrew), `.nav-link`, `.btn-flat`, `.btn-flat-outline`, `.zoom-frame`.

Rules for this overlay:
- **Square corners** on photos, mats, buttons and chips. The `rounded-*` scale in section 3 applies to everything else (inputs, search box, tags).
- **Two-voice headings**: one script accent word (Latin via Allura, or Hebrew via Playpen Sans Hebrew) next to a thin, lightly tracked Frank Ruhl Libre phrase. One script moment per viewport.
- **Hebrew is never uppercased**; label emphasis comes from size and `letter-spacing` (<= 0.08em).
- `--color-accent-tint` and `--color-script` never carry body text or meaning alone.
- Turquoise stays the only interactive color.

### Core tokens

Declare these in `:root` in `app/globals.css` and mirror them in the `@theme inline` block so Tailwind v4 generates utilities. **Never hardcode a hex value in a component.** If you need a color that is not here, add a token first.

```css
:root {
  /* Surfaces — cool, near-white with a blue cast */
  --color-bg: #f4f9fb;          /* page background */
  --color-bg-elev: #ffffff;     /* cards, raised panels */
  --color-bg-sunk: #e8f2f6;     /* wells, inset areas, table stripes */

  /* Ink */
  --color-ink: #0c1f2a;         /* headings, primary text — deep sea navy */
  --color-ink-soft: #35535f;    /* body copy */
  --color-ink-muted: #56747f;   /* metadata, captions, disabled */
  --color-line: #d4e6ed;        /* hairlines, borders, dividers */

  /* Brand */
  --color-accent: #097785;      /* primary turquoise — links, CTAs, active state */
  --color-accent-hover: #065f6b;
  --color-accent-soft: #cdeef1; /* tinted fills, pills, badges */
  --color-accent-ink: #06525a;  /* text on --color-accent-soft */

  /* Depth — the dark end of the ocean, for heroes and immersive panels */
  --color-deep: #072a38;
  --color-deep-elev: #0d3b4d;

  /* Supporting hues — use sparingly, for meaning only */
  --color-lagoon: #3fc9c2;      /* highlights, glow, "new" */
  --color-sand: #e8b96b;        /* warmth accent, ratings, sun */
  --color-coral: #e4705e;       /* warnings, "what was hard" */
  --color-leaf: #4f9d7a;        /* nature, success, "what worked" */

  /* Map */
  --map-visited: #097785;
  --map-visited-hover: #065f6b;
  --map-unvisited: #dbe9ef;
  --map-stroke: #f4f9fb;
}
```

**Why `--color-accent` is `#097785` and not a brighter turquoise.** A vivid `#0e9aa7` only reaches 3.19:1 on `--color-bg` and 3.39:1 under white text — both fail AA for body-sized text, and this token is used for links *and* as a button fill. `#097785` clears 4.96:1 and 5.26:1 respectively. The vivid end of the palette still exists as `--color-lagoon`, which is **decorative only** — glow layers, gradient stops, never text or a lone meaning-bearing element.

### Country identity colors

`lib/countries.ts` carries a `themeColor` per country, used for country-page heroes and as the gradient fallback for trips with no photos. These are a **separate axis** from the brand tokens: they must stay distinguishable from one another while reading as part of the ocean family. All clear 3:1 under white display text.

| Country | Token | Reads as |
|---|---|---|
| Romania | `#2f6f6a` | deep Carpathian teal |
| Czech Republic | `#3f7a5e` | pine green |
| Portugal | `#1a7790` | Atlantic blue |
| Italy | `#52669f` | lake indigo |
| Dominican Republic | `#b8803a` | Caribbean sand — the one warm note, and deliberate |

Adding a country means adding a `themeColor` that is cool-leaning, distinct from all five above, and ≥3:1 against white.

### Using color

- **Turquoise is the only interactive color.** If something is clickable, it is turquoise (or turns turquoise). If it is turquoise, it must be clickable. No decorative accent text.
- **Backgrounds alternate** between `--color-bg` and `--color-bg-sunk` to separate page sections. Never more than two neighbouring sections on the same surface.
- **Supporting hues carry meaning, never mood.** `--color-leaf` means "this worked", `--color-coral` means "this was hard", `--color-sand` means a rating. Do not use them to add visual variety.
- **Deep tones are for immersion only** — hero overlays, the gallery lightbox, the footer. Body content is never on a dark surface.

### Gradients and glow

Flat fills read as dead. Depth comes from two devices, both subtle:

```css
/* Ambient glow — sits behind a section heading or a featured card */
.glow-ambient {
  background: radial-gradient(
    60% 50% at 50% 0%,
    color-mix(in oklab, var(--color-lagoon) 22%, transparent) 0%,
    transparent 70%
  );
}

/* Depth scrim — over hero photos so white text stays readable */
.scrim-deep {
  background: linear-gradient(
    to top,
    color-mix(in oklab, var(--color-deep) 88%, transparent) 0%,
    color-mix(in oklab, var(--color-deep) 35%, transparent) 45%,
    transparent 100%
  );
}
```

Glow is always **behind** content and always low opacity. If you can point at the gradient and name its edge, it is too strong.

---

## 2. Typography

The fonts are already wired in `app/layout.tsx`: **Frank Ruhl Libre** (`--font-display`) for headings, **Heebo** (`--font-sans`) for body. Do not add a third family. For numbers and codes, use `font-variant-numeric: tabular-nums` rather than importing a monospace face — a Latin monospace next to Hebrew looks broken.

| Role | Size | Weight | Family | Notes |
|---|---|---|---|---|
| Page title (h1) | `clamp(2.25rem, 5vw, 4rem)` | 700 | display | `letter-spacing: -0.02em`, `line-height: 1.05` |
| Section heading (h2) | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | display | `letter-spacing: -0.015em` |
| Card title (h3) | `1.25rem` | 600 | display | |
| Body | `1.0625rem` | 400 | sans | `line-height: 1.75` — Hebrew needs more leading than English |
| Lead paragraph | `1.1875rem` | 400 | sans | `--color-ink-soft` |
| Metadata / eyebrow | `0.8125rem` | 500 | sans | uppercase is **forbidden** in Hebrew; use `letter-spacing: 0.04em` + `--color-ink-muted` |
| Stat number | `clamp(2rem, 4vw, 3rem)` | 700 | display | `tabular-nums` |

Rules:

- **Line length caps at 68 characters** (`max-width: 34em`) for body copy. Hebrew gets unreadable fast in wide columns.
- **Never uppercase Hebrew.** It does nothing — there is no case — and `text-transform: uppercase` on mixed strings mangles Latin fragments mid-sentence.
- **Headings are tight, body is loose.** Negative tracking on display sizes, generous leading on body.

---

## 3. Space, shape, and elevation

**Spacing scale** (Tailwind steps): `2, 3, 4, 6, 8, 12, 16, 24, 32`. Nothing else. Section vertical rhythm is `py-16` on mobile, `py-24` on desktop.

**Radii** (the boutique-postcard components listed in "Boutique-postcard overlay" above are square, 0 radius):
- `rounded-lg` (8px) — buttons, pills, inputs
- `rounded-2xl` (16px) — cards, panels
- `rounded-3xl` (24px) — hero media, feature blocks
- Never `rounded-full` except on avatars and icon buttons.

**Elevation** is a border plus a soft, cool-tinted shadow — never a grey drop shadow:

```css
--shadow-card: 0 1px 2px rgb(12 31 42 / 0.04), 0 8px 24px -12px rgb(12 31 42 / 0.12);
--shadow-lift: 0 2px 4px rgb(12 31 42 / 0.05), 0 20px 40px -16px rgb(14 154 167 / 0.28);
```

`--shadow-card` is the resting state; `--shadow-lift` is the hover state. The lift shadow is tinted turquoise, so cards appear to glow upward when touched.

---

## 4. RTL rules

The document is `dir="rtl"`. Getting this wrong is the fastest way to make the site look amateur.

- **Use logical properties, always.** `ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`, `text-start`/`text-end`. Never `ml-*`, `pr-*`, `left-*`, `text-left`.
- **Directional icons must flip.** An arrow meaning "read more" points **left** (`←`) in Hebrew. Either pick the mirrored glyph or apply `rtl:-scale-x-100`. Non-directional icons (clock, calendar, heart, pin) never flip.
- **Motion follows reading direction.** Content entering from "ahead" slides in from the **left**; "back" slides from the right. This is the opposite of the LTR default — write transforms against logical direction, not hardcoded `translateX(-20px)`.
- **Numbers, dates and Latin names stay LTR.** Wrap mixed runs in `<bdi>` or `dir="ltr"` so `8–12 גילאי` doesn't reorder into nonsense.
- **Carousels and progress bars fill right-to-left.**

---

## 5. The motion & interactivity system

This is the part that separates this site from a static page. **Every interactive surface must respond to the user within 100ms of input.**

### Motion tokens

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* default — fast out, soft landing */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot, for appearing elements */
--dur-fast: 150ms;    /* hover, color, small state flips */
--dur-base: 300ms;    /* card lift, expand/collapse */
--dur-slow: 550ms;    /* section reveals, hero */
```

Nothing uses `linear` or `ease`. Nothing animates longer than 600ms.

### Reduced motion is mandatory

Every animated component checks it. `components/ui/Reveal.tsx` is the reference implementation — follow its pattern. Also add the global guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reduced motion means content appears **instantly and fully** — never hidden, never stuck at `opacity: 0`.

### The six required interaction patterns

Any substantial page should use at least three of these. A page using none is not finished.

**1. Scroll reveal.** Use the existing `<Reveal>` from `components/ui/Reveal.tsx`. Stagger siblings by 60–80ms via its `delay` prop. Never stagger more than 6 items — beyond that the last item arrives late enough to feel broken.

**2. Cursor-tracking glow.** Cards track the pointer and move a soft turquoise radial highlight under it. Client component, writes CSS custom properties directly on the node — never React state, which would re-render on every mousemove.

```tsx
"use client";
import { useRef, type ReactNode } from "react";

export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group card-surface relative overflow-hidden rounded-2xl
                  border border-line bg-bg-elev
                  hover:-translate-y-1 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                   duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-lagoon) 20%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
```

Touch devices get no glow (there is no hover) — the lift on `:active` covers them.

Because `@theme inline` only generates utilities for colors and fonts, shadows and easings live in a small CSS class rather than arbitrary values. Add this once to `app/globals.css`:

```css
.card-surface {
  box-shadow: var(--shadow-card);
  transition: transform var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}
.card-surface:hover {
  box-shadow: var(--shadow-lift);
}
```

**Color utilities come from the theme, not arbitrary values.** Because every token is mirrored in `@theme inline`, write `bg-accent`, `text-ink-muted`, `border-line` — never `bg-[var(--color-accent)]` or `bg-[--color-accent]`. If a utility doesn't exist, the token is missing from `@theme inline`; add it there rather than reaching for brackets.

**3. Shared-element morph between routes.** When a trip card opens into a trip page, the photo **morphs** — it does not disappear and reappear. This version of Next supports React's `<ViewTransition>` natively, so do **not** reach for Framer Motion `layoutId`.

Enable it once in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  experimental: { viewTransition: true },
};
```

Then give the same `name` to both ends:

```tsx
import { ViewTransition } from "react";

// in the card
<ViewTransition name={`trip-${trip.slug}`}>
  <Image src={trip.heroImage} alt="" />
</ViewTransition>

// in the trip hero
<ViewTransition name={`trip-${trip.slug}`}>
  <Image src={trip.heroImage} alt="" priority />
</ViewTransition>
```

Names must be unique per page. Browsers without support simply navigate normally.

**4. Animated counters.** Stat numbers (`5 מדינות`, `5 טיולים`) count up when scrolled into view, easing out over ~900ms. Static numbers on a stat block look unfinished. Respect reduced motion by jumping to the final value.

**5. Live filtering, never a page reload.** Country filters, tag filters, and gallery categories filter client-side with a crossfade and layout shift. Selecting a filter must never cause a navigation or a spinner.

**6. Parallax and scroll-linked depth.** Hero images drift slower than the page (`transform: translate3d`, driven by a passive scroll listener or `animation-timeline: view()` where supported). Keep displacement under 40px — subtle depth, not a funfair.

### Performance guardrails

- Animate **only** `transform` and `opacity`. Animating `width`, `height`, `top`, or `box-shadow` on scroll will drop frames.
- Pointer and scroll listeners are **passive** and write to CSS properties, not React state.
- Add `will-change` only while an animation is actually running, then remove it.
- Server Components are the default. Add `"use client"` only to the leaf that genuinely needs interactivity — never to a page or layout.

---

## 6. Component patterns

**Buttons**

| Variant | Use |
|---|---|
| Primary | Solid `--color-accent`, white text, `rounded-lg`, lifts 1px and darkens on hover. One per view. |
| Secondary | Transparent, `1px` `--color-line` border, ink text; border and text go turquoise on hover. |
| Ghost | Text only in `--color-accent`, with an underline that grows from the **right** (RTL) on hover. |

Minimum hit target 44×44px. Every button gets a visible `:focus-visible` ring using `--color-accent`.

**Trip cards** — full-bleed photo, `.scrim-deep` overlay, country pill top-start, title and metadata bottom-start. On hover: image scales to `1.04`, card lifts, glow activates. Metadata line is always `year · duration · kids' ages`.

**Pills / badges** — `--color-accent-soft` fill with `--color-accent-ink` text, `rounded-lg`, `0.8125rem`, `px-3 py-1`.

**Sections** — eyebrow (small, muted, tracked) → `h2` → one-line lead in `--color-ink-soft` → content. Keep this order everywhere; it is the site's rhythm.

**Photographic backdrops** — a section may sit on a real archive photo instead of a flat fill. The photo is **scenery, not a hero**: it must never compete with the text in front of it.

- Use a real shot from `public/trips/*/gallery/` — never stock, never an illustration.
- Prefer a wide landscape with a large area of low detail (open sky, water, haze). That calm region is where the text goes.
- `next/image` with `fill`, `sizes="100vw"`, `priority` if above the fold, and `alt=""` — it is decorative, so the wrapper is `aria-hidden` and `pointer-events-none`.
- Opacity around `0.45`, then a vertical scrim that fades the photo into `--color-bg` by the bottom edge: `from-bg/20 via-bg/85 to-bg`. The `via` stop does the real work — it sits where body copy lands.
- Verify contrast against the photo's **lightest** region, not its average.

**The site-wide backdrop.** `components/layout/SiteBackdrop.tsx` pins one archive photo (currently Cayo Levantado beach) behind every route at `-z-10`, under an 80% `--color-bg` veil. It is `fixed`, so content scrolls over a stationary photo — depth with no scroll listener. `<body>` must stay transparent for it to show; the base color comes from `html` in `globals.css`.

**The hard limit — read before putting small text on a photo.** Measured against this photo's darkest region (palm shade, near `#020703`):

| Veil | `ink-soft` body | `ink-muted` metadata | `accent` links |
|---|---|---|---|
| 80% (shipped) | 5.29 ✅ | 3.22 ❌ | 3.39 ❌ |
| 92% | 6.60 ✅ | 4.01 ❌ | 4.22 ❌ |
| 94% | 6.90 ✅ | 4.20 ❌ | 4.42 ❌ |
| 98% | 7.52 ✅ | 4.55 ✅ | 4.79 ✅ |
| opaque panel | 7.75 ✅ | 4.71 ✅ | 4.96 ✅ |

Body copy is safe at any usable veil. **Small muted text and inline links cannot reach 4.5:1 over a visible photo** — at 94% the photo is already invisible and they still fall short. Blurring does not fix it (a large dark mass keeps a dark core); neither does cropping, nor a translucent `backdrop-filter` panel (a blurred 94% panel still only reaches 4.22). The threshold is **98% opacity**, which is indistinguishable from opaque.

### The rule

- **Body copy** (`--color-ink-soft`, `--color-ink`) and **display headings** may sit directly on the backdrop.
- **Small metadata (`--color-ink-muted`), inline links (`--color-accent`), and anything under ~1rem** must sit on `.content-surface` — an opaque panel — or on an existing opaque card.

```css
.content-surface        /* opaque panel: rounded-3xl + --shadow-card */
.content-surface-flush  /* same fill, no rounding — edge-to-edge bands */
```

This produces the site's layout logic: **text blocks float as panels over the scenery**, and the photo stays visible in the page margins, between sections, and behind the hero bands. Current users are the About-Us text column (`app/page.tsx`), the trip reading column (`app/trips/[slug]/page.tsx`) and the footer.

Two cautions:

- A panel is opaque by design. Do not reach for a translucent variant to "let the photo through" — that is the exact failure the table above measures.
- `PhotoBreak` escapes its container with `left-1/2 -translate-x-1/2 w-screen`. Inside a panel it will cross the panel edge rather than be clipped. That is acceptable, but check it if you use one.

**Images** — always `next/image` with explicit `sizes`. Every image needs a real Hebrew `alt`, or `alt=""` if purely decorative. Reserve aspect ratio so nothing shifts on load.

---

## 7. Accessibility floor

Not optional, and not a separate pass.

- Body text contrast ≥ 4.5:1; large text ≥ 3:1. `--color-ink-muted` on `--color-bg` is the lowest allowed pairing — never go lighter for real content.
- Visible focus on every interactive element. Never `outline: none` without a replacement.
- Color never carries meaning alone — pair it with an icon or label.
- Keyboard reachable in logical order; lightbox and menu trap focus and close on `Escape`.
- Decorative glow layers are `aria-hidden` and `pointer-events-none`.

---

## 8. Checklist before calling UI done

- [ ] No hardcoded hex values — every color is a token
- [ ] Logical properties only; no `ml-`, `pr-`, `left-`, `text-left`
- [ ] Directional icons and slide directions are RTL-correct
- [ ] At least three of the six interaction patterns are present
- [ ] `prefers-reduced-motion` verified — content fully visible, no stuck opacity
- [ ] Only `transform`/`opacity` animated
- [ ] `"use client"` sits on leaves, not pages or layouts
- [ ] Focus rings visible; contrast checked
- [ ] Small text and links sit on `.content-surface` or a card, never on the raw backdrop
- [ ] Checked at 375px, 768px and 1280px
- [ ] Hebrew never uppercased; mixed Latin/number runs wrapped in `<bdi>`

---

## 9. Things this site does not do

- Dark page backgrounds for reading content (deep tones are for heroes and immersive panels only)
- Glassmorphism / heavy `backdrop-blur` panels — they fight photography and hurt Hebrew legibility
- Neon borders, cyberpunk framing, or a "dashboard" feel
- A third typeface, or Latin monospace next to Hebrew
- Bouncy, long, or looping animation; anything over 600ms
- Carousels for primary content (exception: the "סוגי טיולים" trip-type strip on the home page, arrow-paged, no autoplay)
- Emoji as interface icons (use `lucide-react`)
- Motion without a `prefers-reduced-motion` path
