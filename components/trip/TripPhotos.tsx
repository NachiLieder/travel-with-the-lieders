"use client";

/**
 * Trip photo system — context + provider + inline photo components + a
 * single shared lightbox.
 *
 * Lets MDX content reference photos by their gallery id (or partial id),
 * intersperse them between text, and click any one to open a shared
 * full-screen lightbox that browses ALL photos in the trip.
 *
 * Usage in MDX (after the page wraps the article in <TripPhotosProvider>):
 *
 *   <Photo id="peles-castle" caption="ארמון פלש בסיניה" />
 *   <Photos ids={["peles-park-stream", "roadside-stand", "forest-berries-basket"]} />
 *   <PhotoBreak id="transfagarasan-road" caption="כביש הטרנספגרשאן" />
 *
 * IDs match by substring (case-insensitive) against gallery entry ids, so
 * `id="peles"` resolves to `09-day2-peles-castle`. Convenient + tolerant.
 */

import {
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import {
  Captions,
  Counter,
  Fullscreen,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { captionFromFilename } from "@/lib/captions";
import {
  TripPhotosContext,
  type TripPhoto,
  type TripPhotosContextValue,
} from "./TripPhotosContext";

export type { TripPhoto } from "./TripPhotosContext";

function useTripPhotos(): TripPhotosContextValue {
  const ctx = useContext(TripPhotosContext);
  if (!ctx)
    throw new Error(
      "Trip photo components must be used inside <TripPhotosProvider>"
    );
  return ctx;
}

function resolveCaption(p: TripPhoto): string {
  return (
    (p.caption && p.caption.trim()) ||
    (p.filename ? captionFromFilename(p.filename) : "") ||
    ""
  );
}

// ----- Provider -----

export function TripPhotosProvider({
  gallery,
  children,
}: {
  gallery: TripPhoto[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState(-1);

  const resolve = useCallback(
    (idOrMatch: string) => {
      if (!gallery?.length) return null;
      // 1. Exact id match
      let i = gallery.findIndex((p) => p.id === idOrMatch);
      // 2. Filename match
      if (i < 0) i = gallery.findIndex((p) => p.filename === idOrMatch);
      // 3. Substring (case-insensitive)
      if (i < 0) {
        const m = idOrMatch.toLowerCase();
        i = gallery.findIndex(
          (p) =>
            p.id.toLowerCase().includes(m) ||
            (p.filename ?? "").toLowerCase().includes(m)
        );
      }
      return i >= 0 ? { index: i, photo: gallery[i] } : null;
    },
    [gallery]
  );

  const value = useMemo<TripPhotosContextValue>(
    () => ({ gallery, open: setOpenIndex, resolve }),
    [gallery, resolve]
  );

  const slides = useMemo(
    () =>
      gallery.map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.altText ?? resolveCaption(p),
        title: resolveCaption(p),
      })),
    [gallery]
  );

  return (
    <TripPhotosContext.Provider value={value}>
      {children}
      <Lightbox
        open={openIndex >= 0}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter, Fullscreen, Zoom]}
        captions={{
          descriptionTextAlign: "end",
          descriptionMaxLines: 3,
          showToggle: true,
        }}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        carousel={{ finite: false, padding: "16px" }}
        animation={{ fade: 280, swipe: 400 }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleClickMaxStops: 2,
        }}
        styles={{
          root: {
            "--yarl__color_backdrop": "rgba(10, 8, 6, 0.94)",
            "--yarl__slide_captions_container_background":
              "rgba(0, 0, 0, 0.55)",
            "--yarl__slide_title_font_family":
              "var(--font-display), Georgia, serif",
            "--yarl__slide_title_font_weight": "600",
          },
        }}
      />
    </TripPhotosContext.Provider>
  );
}

// ----- Inline photo components -----

/**
 * <Photo id="..." caption="..." align="center" />
 *
 * A single photo embedded in the text. Defaults to centered, breaks slightly
 * out of the reading width on desktop. Click to zoom.
 */
export function Photo({
  id,
  caption,
  align = "center",
  aspect,
}: {
  id: string;
  caption?: string;
  align?: "left" | "right" | "center" | "wide";
  aspect?: "auto" | "square" | "landscape" | "portrait";
}) {
  const { open, resolve } = useTripPhotos();
  const found = resolve(id);
  if (!found) return null;
  const { index, photo } = found;
  const finalCaption = caption ?? resolveCaption(photo);

  // All photos are block-level (no floats). Floats with RTL Hebrew create
  // awkward narrow text columns and gaps — we use clean block layout.
  // `align="wide"` gets a slightly wider feel via a max-width bump, but is
  // still constrained to the article so it never overflows.
  const wrapper =
    align === "wide"
      ? "my-6 sm:my-8 mx-auto max-w-full"
      : "my-6 sm:my-8 mx-auto max-w-full sm:max-w-[92%]";

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "landscape"
        ? "aspect-[4/3]"
        : aspect === "portrait"
          ? "aspect-[3/4]"
          : "";

  return (
    <figure className={wrapper} dir="ltr">
      <button
        type="button"
        onClick={() => open(index)}
        className="group relative block w-full overflow-hidden rounded-2xl bg-line shadow-md hover:shadow-2xl transition-shadow duration-500"
        aria-label={`להגדיל: ${finalCaption || "תמונה"}`}
      >
        <div className={`relative ${aspectClass}`}>
          <img
            src={photo.large ?? photo.src}
            alt={photo.altText ?? finalCaption}
            loading="eager"
            className={`block w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
              aspectClass ? "h-full" : "max-h-[60vh]"
            }`}
          />
        </div>
        <span className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </span>
      </button>
      {finalCaption && (
        <figcaption
          className="mt-2 text-sm text-ink-muted text-center italic px-2"
          dir="rtl"
        >
          {finalCaption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * <Photos ids={["...","...","..."]} />
 *
 * 2–4 photo mosaic. Layout adapts to count.
 */
export function Photos({ ids }: { ids?: string[] | string }) {
  const { open, resolve } = useTripPhotos();
  // Accept array or comma-separated string; coerce defensively
  const list: string[] = Array.isArray(ids)
    ? ids
    : typeof ids === "string"
      ? ids.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
  const items = list
    .map((id) => resolve(id))
    .filter((x): x is { index: number; photo: TripPhoto } => Boolean(x));
  if (items.length === 0) return null;

  // Layout heuristics
  const gridClass =
    items.length === 1
      ? "grid-cols-1"
      : items.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : items.length === 3
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="my-6 sm:my-8" dir="ltr">
      <div className={`grid ${gridClass} gap-2 sm:gap-3`}>
        {items.map(({ index, photo }) => {
          const cap = resolveCaption(photo);
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => open(index)}
              className="group relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-xl bg-line shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
              aria-label={`להגדיל: ${cap || "תמונה"}`}
            >
              <img
                src={photo.medium ?? photo.large ?? photo.src}
                alt={photo.altText ?? cap}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * <PhotoBreak id="..." caption="..." />
 *
 * Full-bleed photo break — the editorial "stop the page, look at this" moment.
 * Breaks out of the article reading width entirely.
 */
export function PhotoBreak({
  id,
  caption,
}: {
  id: string;
  caption?: string;
}) {
  const { open, resolve } = useTripPhotos();
  const found = resolve(id);
  if (!found) return null;
  const { index, photo } = found;
  const finalCaption = caption ?? resolveCaption(photo);

  // Cinema-banner aspect (max-h-[55vh]) keeps PhotoBreak compact even for
  // landscape originals — no more 900px placeholders eating the page.
  // Image is eager-loaded so there's no lazy-load placeholder gap.
  return (
    <section
      className="relative my-8 sm:my-12 left-1/2 right-1/2 -translate-x-1/2 w-screen max-w-none"
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => open(index)}
        className="group relative block w-full overflow-hidden bg-line max-h-[55vh] sm:max-h-[60vh]"
        aria-label={`להגדיל: ${finalCaption || "תמונה"}`}
      >
        <img
          src={photo.large ?? photo.src}
          srcSet={[
            photo.medium && `${photo.medium} 640w`,
            photo.large && `${photo.large} 1280w`,
            `${photo.src} 1920w`,
          ]
            .filter(Boolean)
            .join(", ")}
          sizes="100vw"
          alt={photo.altText ?? finalCaption}
          loading="eager"
          className="block w-full max-h-[55vh] sm:max-h-[60vh] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
        <span className="absolute top-4 left-4 sm:top-6 sm:left-6 grid place-items-center w-11 h-11 rounded-full bg-black/35 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5" />
        </span>
      </button>
      {finalCaption && (
        <figcaption
          className="mx-auto max-w-3xl px-5 sm:px-8 mt-2 text-sm text-ink-muted text-center italic"
          dir="rtl"
        >
          {finalCaption}
        </figcaption>
      )}
    </section>
  );
}
