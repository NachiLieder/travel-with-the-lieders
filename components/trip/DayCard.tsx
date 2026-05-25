"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { RowsPhotoAlbum, type Photo as AlbumPhoto } from "react-photo-album";
import "react-photo-album/rows.css";

import { useTripPhotosOptional } from "./useTripPhotosOptional";
import { captionFromFilename } from "@/lib/captions";

/**
 * Walk the rendered children tree and pull every photo id/match string that
 * appears inside an inline <Photo>, <Photos>, or <PhotoBreak>. Used by the
 * DayCard to dedupe: an inline photo shouldn't ALSO appear in the auto-grid
 * at the bottom of the card.
 *
 * Identification uses `displayName` (set explicitly on each component) so it
 * survives minification.
 */
function collectInlinePhotoNeedles(node: ReactNode): string[] {
  const out: string[] = [];
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;

    const type = child.type as unknown as { displayName?: string };
    const name = type?.displayName;
    const props = child.props as Record<string, unknown>;

    if (name === "Photo" || name === "PhotoBreak") {
      const id = props?.id;
      if (typeof id === "string") out.push(id);
    } else if (name === "Photos") {
      const ids = props?.ids;
      if (Array.isArray(ids)) {
        for (const id of ids) if (typeof id === "string") out.push(id);
      } else if (typeof ids === "string") {
        ids
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((id) => out.push(id));
      }
    }

    const innerChildren = (props as { children?: ReactNode })?.children;
    if (innerChildren !== undefined) {
      out.push(...collectInlinePhotoNeedles(innerChildren));
    }
  });
  return out;
}

/**
 * One day in a trip itinerary.
 *
 * Auto-detects photos that belong to this day by matching `dayN-` in the
 * filename (e.g. `12-day3-zarnesti-canyon-hike.jpg` → day 3) and renders
 * them as a tight justified row inside the card, after the text.
 *
 * If no matching photos exist for this day, no photo section renders.
 * The MDX author doesn't have to do anything — just `<DayCard day={N} title="...">`
 * and the photos appear automatically.
 */
export function DayCard({
  day,
  title,
  photos,
  children,
}: {
  day: number | string;
  title: string;
  /** Optional explicit list of photo id substrings. If provided, overrides
   *  the auto-match against `day{N}-`. Each entry matches by substring. */
  photos?: string[];
  children: ReactNode;
}) {
  const ctx = useTripPhotosOptional();
  const gallery = ctx?.gallery ?? [];

  // Photos the user placed INSIDE the card's text get resolved to actual
  // gallery ids so the auto-grid below can skip them (no duplicates).
  const inlineNeedles = collectInlinePhotoNeedles(children);
  const consumedIds = new Set<string>();
  for (const needle of inlineNeedles) {
    const m = needle.toLowerCase();
    const hit = gallery.find(
      (p) =>
        p.id.toLowerCase() === m ||
        p.id.toLowerCase().includes(m) ||
        (p.filename ?? "").toLowerCase().includes(m)
    );
    if (hit) consumedIds.add(hit.id);
  }

  // 1. Explicit `photos` list wins.
  // 2. Otherwise auto-match by `dayN-` if `day` is numeric.
  // In either case, drop anything already used inline.
  const dayPhotos = (
    photos
      ? photos
          .map((needle) => {
            const m = needle.toLowerCase();
            return gallery.find(
              (p) =>
                p.id.toLowerCase().includes(m) ||
                (p.filename ?? "").toLowerCase().includes(m)
            );
          })
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
      : typeof day === "number"
        ? gallery.filter((p) => {
            const f = (p.filename ?? p.id ?? "").toLowerCase();
            return new RegExp(`(^|[^a-z])day${day}[-_]`).test(f);
          })
        : []
  ).filter((p) => !consumedIds.has(p.id));

  // Build photo album entries — index back to gallery for shared lightbox
  const photoEntries = dayPhotos.map((p) => {
    const globalIndex = ctx?.gallery.findIndex((g) => g.id === p.id) ?? -1;
    return { p, globalIndex };
  });

  const albumPhotos: AlbumPhoto[] = photoEntries.map(({ p }) => ({
    src: p.medium ?? p.large ?? p.src,
    width: p.width ?? 1600,
    height: p.height ?? 1200,
    alt: p.altText ?? (p.filename ? captionFromFilename(p.filename) : ""),
    title: p.caption || (p.filename ? captionFromFilename(p.filename) : ""),
    srcSet: [
      p.thumb && { src: p.thumb, width: 320, height: 0 },
      p.medium && { src: p.medium, width: 640, height: 0 },
      p.large && { src: p.large, width: 1280, height: 0 },
    ].filter(Boolean) as { src: string; width: number; height: number }[],
  }));

  return (
    <article className="my-5 rounded-2xl border border-line bg-bg-elev p-5 sm:p-6 hover:shadow-md transition-shadow">
      <header className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-3xl font-bold text-accent">
          {day}
        </span>
        <span className="text-xs uppercase tracking-wider text-ink-muted">
          יום {day}
        </span>
        <h3 className="font-display text-lg font-bold flex-1">{title}</h3>
      </header>
      <div className="text-ink-soft leading-relaxed [&>p]:mb-3 last:[&>p]:mb-0">
        {children}
      </div>

      {albumPhotos.length > 0 && (
        <div className="mt-5 -mx-1" dir="ltr">
          <RowsPhotoAlbum
            photos={albumPhotos}
            spacing={4}
            targetRowHeight={(width) =>
              width < 500 ? 130 : width < 900 ? 180 : 220
            }
            rowConstraints={{ singleRowMaxHeight: 320 }}
            onClick={({ index }) => {
              const globalIdx = photoEntries[index]?.globalIndex ?? -1;
              if (globalIdx >= 0) ctx?.open(globalIdx);
            }}
            componentsProps={{
              image: {
                loading: "eager",
                className:
                  "rounded-md object-cover transition-transform duration-300 hover:scale-[1.02]",
                style: { cursor: "zoom-in" },
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
