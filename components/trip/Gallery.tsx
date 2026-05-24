"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { captionFromFilename } from "@/lib/captions";

export type GalleryImage = {
  id: string;
  filename?: string;
  src: string;
  large?: string;
  medium?: string;
  thumb?: string;
  width?: number;
  height?: number;
  /** Editor-provided caption; falls back to a derivation from filename */
  caption?: string;
  altText?: string;
};

/**
 * Image gallery with lightbox.
 * Feed it the `gallery.json` produced by `npm run photos:import`.
 *
 * Usage in MDX:
 *   import gallery from "./gallery.json";
 *   <Gallery images={gallery} />
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  // Resolve a display caption: prefer user-provided, then derive from filename
  const displayCaption = (img: GalleryImage): string =>
    (img.caption && img.caption.trim()) ||
    (img.filename ? captionFromFilename(img.filename) : "") ||
    "";

  const displayAlt = (img: GalleryImage): string =>
    (img.altText && img.altText.trim()) || displayCaption(img);

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i == null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setOpen((i) => (i == null ? null : (i + 1) % images.length));

  return (
    <section className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((img, idx) => {
          const alt = displayAlt(img);
          return (
            <button
              key={img.id}
              onClick={() => setOpen(idx)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-line"
              aria-label={alt || `תמונה ${idx + 1}`}
            >
              <img
                src={img.thumb ?? img.src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          );
        })}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={close}
          dir="ltr"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            aria-label="סגור"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-5 text-white/80 hover:text-white"
            aria-label="הקודם"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-5 text-white/80 hover:text-white"
            aria-label="הבא"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <figure className="max-w-[92vw] max-h-[88vh] flex flex-col items-center">
            <img
              src={images[open].large ?? images[open].src}
              alt={displayAlt(images[open])}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {displayCaption(images[open]) && (
              <figcaption
                className="mt-3 text-white/90 text-sm text-center max-w-xl"
                dir="rtl"
              >
                {displayCaption(images[open])}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
