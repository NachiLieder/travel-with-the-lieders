"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Site-wide photographic backdrop.
 *
 * A real shot from the archive — Cayo Levantado beach, Dominican Republic 2024 —
 * pinned behind every page. It is scenery, not a hero: held at low opacity under
 * a veil so body copy stays readable on every route.
 *
 * Because the layer is `fixed`, content scrolls over a stationary photo, which
 * reads as depth without any scroll listener.
 *
 * Swap the photo by changing SITE_BACKDROP to any wide landscape under
 * `public/trips/*\/gallery/`. Prefer one with a large low-detail region.
 */
const SITE_BACKDROP =
  "/trips/dominican-republic-2024/gallery/13-cayo-levantado-beach.jpg";

export function SiteBackdrop() {
  // The home page is a flat cream/white boutique layout (Blonde Abroad
  // structure), so the photographic backdrop is skipped there.
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <Image
        src={SITE_BACKDROP}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
      {/*
        Veil — drops the photo back so text stays readable.
        Body copy (--color-ink-soft) clears AA across the whole frame at this
        strength. Small muted metadata and inline links measure ~3.4:1 where
        they cross the darkest palm shade; see the backdrop note in the
        design-system skill before putting small text straight onto this layer.
      */}
      <div className="absolute inset-0 bg-bg/80" />
      {/* Cools the sand and ties the photo to the turquoise palette. */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-soft/30 via-transparent to-bg/60" />
    </div>
  );
}
