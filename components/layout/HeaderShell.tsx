"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Home, Menu, Search } from "lucide-react";

import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { SlideDownOverlay } from "@/components/layout/SlideDownOverlay";

/**
 * Three-band header, modelled on The Blonde Abroad (see the
 * travel-blog-inspiration skill, section 0.3):
 *   1. utility bar  — small links, search box, social icons, torn-paper edge
 *   2. wordmark     — centered mixed-type logo (thin caps + script)
 *   3. main nav     — hairline-ruled, centered, sticky, with fading dropdowns
 * Below `md` the utility bar is dropped and the nav collapses to a
 * hamburger + search row that opens a slide-down overlay.
 *
 * The sticky nav is a sibling of <header>, not a child, so it can stay
 * pinned for the whole page height.
 */

export type HeaderRegion = {
  id: string;
  heName: string;
  countries: { slug: string; heName: string }[];
};
export type HeaderType = { id: string; label: string };
export type SearchItem = {
  slug: string;
  title: string;
  country: string;
  excerpt: string;
};

const UTILITY_LINKS = [
  { href: "/about", label: "קצת עלינו" },
  { href: "/tips", label: "טיפים" },
  { href: "/newsletter", label: "ניוזלטר" },
];

const MAIN_LINKS_BEFORE = [
  { href: "/about", label: "התחילו כאן" },
  { href: "/trips", label: "כל הטיולים" },
];
const MAIN_LINKS_AFTER = [
  { href: "/tips", label: "טיפים" },
  { href: "/newsletter", label: "ניוזלטר" },
];

// Deterministic "torn paper" edge so server and client render the same path.
const TORN_PATH = (() => {
  const w = 1200;
  const step = 20;
  let d = `M0 0 H${w} V6`;
  for (let i = Math.floor(w / step); i >= 0; i--) {
    const y = 6 + Math.abs(Math.sin(i * 1.7)) * 4 + ((i * 37) % 4);
    d += ` L${i * step} ${y.toFixed(1)}`;
  }
  return d + " Z";
})();

export function HeaderShell({
  regions,
  types,
  searchIndex,
}: {
  regions: HeaderRegion[];
  types: HeaderType[];
  searchIndex: SearchItem[];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Close everything on route change.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setDrop(null);
  }, [pathname]);

  // Dropdown: Escape and outside click close it.
  useEffect(() => {
    if (!drop) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrop(null);
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setDrop(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [drop]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header>
        {/* BAND 1 — utility bar (desktop) */}
        <div className="hidden md:block relative">
          <div className="paper-panel">
            <div className="mx-auto max-w-6xl px-8 flex items-start justify-between">
              <ul className="flex items-center">
                {UTILITY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isCurrent(l.href) ? "page" : undefined}
                      className="nav-link flex items-center h-[53px] px-[13px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="חיפוש באתר"
                  className="flex items-center justify-between w-[180px] h-9 px-3 bg-bg-elev text-ink-muted text-xs tracking-wide hover:text-accent transition-colors"
                >
                  <span>חיפוש באתר…</span>
                  <Search className="w-3.5 h-3.5" aria-hidden />
                </button>
                <div className="flex items-center gap-3.5 pb-3 text-ink-muted">
                  <a
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="hover:text-accent hover:scale-110 transition"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    aria-label="Facebook"
                    className="hover:text-accent hover:scale-110 transition"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 1200 16"
            preserveAspectRatio="none"
            className="block w-full h-[14px] -mt-px"
            style={{ fill: "var(--color-paper)" }}
          >
            <path d={TORN_PATH} />
          </svg>
        </div>

        {/* BAND 2 — wordmark */}
        <div className="bg-bg-elev text-center py-6 md:py-14">
          <Link
            href="/"
            aria-label="Travel with the Lieders — עמוד הבית"
            dir="ltr"
            className="inline-flex items-baseline justify-center gap-3 md:gap-5"
          >
            <span className="font-display font-light uppercase tracking-[0.28em] text-ink-soft text-lg md:text-3xl">
              Travel with the
            </span>
            <span
              className="text-script leading-none text-5xl md:text-7xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Lieders
            </span>
          </Link>
          <p className="mt-2 md:mt-3 text-[11px] md:text-xs tracking-[0.18em] text-ink-muted">
            טיולים משפחתיים מכל העולם
          </p>
        </div>
      </header>

      {/* BAND 3 — main nav (sticky) */}
      <div
        ref={navRef}
        className="sticky top-0 z-40 bg-bg-elev border-y border-hair"
      >
        {/* Mobile row */}
        <div className="md:hidden flex items-center justify-between px-3 h-[53px]">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="תפריט"
            aria-expanded={menuOpen}
            className="grid place-items-center w-11 h-11 text-ink-soft hover:text-accent transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            href="/"
            dir="ltr"
            aria-label="עמוד הבית"
            className="text-script text-3xl leading-none"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Lieders
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="חיפוש באתר"
            className="grid place-items-center w-11 h-11 text-ink-soft hover:text-accent transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop row */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden md:flex flex-wrap items-center justify-center mx-auto max-w-6xl"
        >
          <Link
            href="/"
            aria-label="בית"
            aria-current={pathname === "/" ? "page" : undefined}
            className="nav-link flex items-center h-[53px] px-[13px]"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>

          {MAIN_LINKS_BEFORE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="nav-link flex items-center h-[53px] px-[13px]"
            >
              {l.label}
            </Link>
          ))}

          <Dropdown
            id="destinations"
            label="יעדים"
            openId={drop}
            setOpen={setDrop}
          >
            <div className="grid gap-4 p-4 min-w-[220px]">
              {regions.map((r) => (
                <div key={r.id}>
                  <p className="text-[11px] tracking-[0.12em] text-ink-muted mb-1 px-2.5">
                    {r.heName}
                  </p>
                  <ul>
                    {r.countries.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/countries/${c.slug}`}
                          className="nav-link block px-2.5 py-2"
                        >
                          {c.heName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/countries"
                className="nav-link block px-2.5 py-2 border-t border-hair"
              >
                לכל היעדים
              </Link>
            </div>
          </Dropdown>

          <Dropdown
            id="types"
            label="סוג טיול"
            openId={drop}
            setOpen={setDrop}
          >
            <ul className="p-2 min-w-[190px]">
              {types.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/trips?type=${t.id}`}
                    className="nav-link block px-2.5 py-2.5"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Dropdown>

          {MAIN_LINKS_AFTER.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="nav-link flex items-center h-[53px] px-[13px]"
            >
              {l.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="חיפוש באתר"
            className="nav-link flex items-center h-[53px] px-[13px]"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <SlideDownOverlay open={menuOpen} onClose={closeMenu} label="תפריט">
        <MobileMenu
          regions={regions}
          types={types}
          onNavigate={closeMenu}
          onSearch={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
        />
      </SlideDownOverlay>

      {/* Search */}
      <SlideDownOverlay open={searchOpen} onClose={closeSearch} label="חיפוש">
        <SearchPanel
          items={searchIndex}
          onNavigate={closeSearch}
          active={searchOpen}
        />
      </SlideDownOverlay>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Dropdown({
  id,
  label,
  openId,
  setOpen,
  children,
}: {
  id: string;
  label: string;
  openId: string | null;
  setOpen: (v: string | null) => void;
  children: React.ReactNode;
}) {
  const open = openId === id;
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          setOpen(null);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`dd-${id}`}
        onClick={() => setOpen(open ? null : id)}
        className="nav-link flex items-center gap-1 h-[53px] px-[13px]"
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        id={`dd-${id}`}
        // Fades in over .4s; `visibility` keeps it out of the tab order when closed.
        className="absolute start-0 top-full z-50 bg-bg-elev border border-hair shadow-[0_2px_13px_rgb(0_0_0/0.1)] transition-[opacity,visibility] duration-[400ms] ease-in-out"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MobileMenu({
  regions,
  types,
  onNavigate,
  onSearch,
}: {
  regions: HeaderRegion[];
  types: HeaderType[];
  onNavigate: () => void;
  onSearch: () => void;
}) {
  const link =
    "block py-3 font-display font-light text-[1.65rem] leading-tight text-ink-soft hover:text-accent transition-colors";
  return (
    <nav aria-label="תפריט נייד" className="px-8 pt-20 pb-12 max-w-md mx-auto">
      <ul className="divide-y divide-hair">
        <li>
          <Link href="/" onClick={onNavigate} className={link}>
            בית
          </Link>
        </li>
        {[...MAIN_LINKS_BEFORE].map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className={link}>
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <details className="group">
            <summary className={`${link} flex items-center justify-between cursor-pointer list-none`}>
              יעדים
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-3 grid gap-3">
              {regions.map((r) => (
                <div key={r.id}>
                  <p className="text-xs tracking-[0.12em] text-ink-muted mb-1">
                    {r.heName}
                  </p>
                  <ul>
                    {r.countries.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/countries/${c.slug}`}
                          onClick={onNavigate}
                          className="nav-link block py-2 text-sm"
                        >
                          {c.heName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/countries"
                onClick={onNavigate}
                className="nav-link block py-2 text-sm"
              >
                לכל היעדים
              </Link>
            </div>
          </details>
        </li>
        <li>
          <details className="group">
            <summary className={`${link} flex items-center justify-between cursor-pointer list-none`}>
              סוג טיול
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="pb-3">
              {types.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/trips?type=${t.id}`}
                    onClick={onNavigate}
                    className="nav-link block py-2 text-sm"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
        {MAIN_LINKS_AFTER.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className={link}>
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" onClick={onSearch} className={`${link} w-full text-start`}>
            חיפוש
          </button>
        </li>
      </ul>
    </nav>
  );
}

function SearchPanel({
  items,
  onNavigate,
  active,
}: {
  items: SearchItem[];
  onNavigate: () => void;
  active: boolean;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!active) setQ("");
  }, [active]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) =>
      `${i.title} ${i.country} ${i.excerpt}`.toLowerCase().includes(needle)
    );
  }, [q, items]);

  return (
    <div className="px-8 pt-24 pb-12 max-w-2xl mx-auto">
      <label htmlFor="site-search" className="sr-only">
        חיפוש טיולים
      </label>
      <input
        id="site-search"
        data-autofocus
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="חפשו טיול, מדינה או נושא…"
        className="w-full h-14 px-5 bg-bg-elev border border-hair text-lg text-ink placeholder:text-ink-muted outline-none focus:border-accent"
      />
      <p className="mt-4 text-xs tracking-[0.1em] text-ink-muted" aria-live="polite">
        {results.length === 0 ? "לא נמצאו תוצאות" : `${results.length} טיולים`}
      </p>
      <ul className="mt-2 divide-y divide-hair">
        {results.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/trips/${r.slug}`}
              onClick={onNavigate}
              className="block py-4 group"
            >
              <span className="block text-xs tracking-[0.1em] text-ink-muted">
                {r.country}
              </span>
              <span className="block font-display font-light text-xl text-ink-soft group-hover:text-accent transition-colors">
                {r.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
