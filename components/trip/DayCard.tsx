"use client";

import { Children, isValidElement, type ReactNode } from "react";

import { useTripPhotosOptional } from "./useTripPhotosOptional";
import { captionFromFilename } from "@/lib/captions";
import type { TripPhoto } from "./TripPhotosContext";

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
  _gallery,
  children,
}: {
  day: number | string;
  title: string;
  /**
   * Explicit photo list, overriding the `dayN-` auto-match.
   *
   * Accepts a comma-separated string (`photos="a, b"`) as well as an array.
   * Prefer the string form in MDX: expression attributes (`photos={["a"]}`)
   * are stripped by the parser in this project's Hebrew/RTL files, which
   * silently drops every photo — the same reason `day` is written `day="1"`.
   */
  photos?: string[] | string;
  _gallery?: import("./TripPhotosContext").TripPhoto[];
  children: ReactNode;
}) {
  const ctx = useTripPhotosOptional();
  const gallery = _gallery ?? ctx?.gallery ?? [];

  // MDX `day="3"` arrives as a string; `day={3}` arrives as a number.
  // Coerce so the dayN- regex match works either way.
  const dayNum =
    typeof day === "number"
      ? day
      : typeof day === "string" && /^\d+$/.test(day)
        ? parseInt(day, 10)
        : null;

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

  // Normalise `photos` to a list, accepting the comma-separated string form.
  const photoNeedles: string[] | undefined = Array.isArray(photos)
    ? photos
    : typeof photos === "string"
      ? photos
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

  // 1. Explicit `photos` list wins.
  // 2. Otherwise auto-match by `dayN-` if `day` is numeric.
  // In either case, drop anything already used inline.
  const dayPhotos = (
    photoNeedles && photoNeedles.length > 0
      ? photoNeedles
          .map((needle) => {
            const m = needle.toLowerCase();
            return gallery.find(
              (p) =>
                p.id.toLowerCase().includes(m) ||
                (p.filename ?? "").toLowerCase().includes(m)
            );
          })
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
      : dayNum !== null
        ? gallery.filter((p) => {
            const f = (p.filename ?? p.id ?? "").toLowerCase();
            return new RegExp(`(^|[^a-z])day${dayNum}[-_]`).test(f);
          })
        : []
  ).filter((p) => !consumedIds.has(p.id));

  // Photo entries with index back to the gallery (for the shared lightbox)
  const photoEntries: { p: TripPhoto; globalIndex: number }[] = dayPhotos.map(
    (p) => {
      const globalIndex = gallery.findIndex((g) => g.id === p.id);
      return { p, globalIndex };
    }
  );

  return (
    <article className="my-5 rounded-2xl border border-line bg-bg-elev p-5 sm:p-6 hover:shadow-md transition-shadow">
      <header className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-3xl font-bold text-accent">
          {dayNum ?? day}
        </span>
        <span className="text-xs uppercase tracking-wider text-ink-muted">
          יום {dayNum ?? day}
        </span>
        <h3 className="font-display text-lg font-bold flex-1">{title}</h3>
      </header>
      <div className="text-ink-soft leading-relaxed [&>p]:mb-3 last:[&>p]:mb-0">
        {children}
      </div>

      {photoEntries.length > 0 && (
        <div
          className={
            photoEntries.length === 1
              ? "mt-6 max-w-xl mx-auto"
              : "mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2"
          }
          dir="ltr"
        >
          {photoEntries.map(({ p, globalIndex }) => {
            const cap =
              p.caption || (p.filename ? captionFromFilename(p.filename) : "");
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  globalIndex >= 0 ? ctx?.open(globalIndex) : undefined
                }
                className="group relative block w-full aspect-[4/3] overflow-hidden rounded-xl bg-line shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                aria-label={`להגדיל: ${cap || "תמונה"}`}
              >
                <img
                  src={p.large ?? p.medium ?? p.src}
                  alt={p.altText ?? cap}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
}
