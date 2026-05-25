/**
 * Trip content loader.
 *
 * Reads MDX files from /content/trips/<slug>/index.mdx, parses frontmatter
 * via gray-matter, and returns a typed Trip object. Sorted by publishedAt desc.
 *
 * This runs only at build time (called from RSC pages). It's intentionally
 * simple — we'll graduate to Velite or contentlayer if/when the catalog grows
 * past ~30 trips or we need richer querying.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type TripBestFor =
  | "toddlers"
  | "young-kids"
  | "older-kids"
  | "teens"
  | "nature"
  | "road-trip"
  | "rainy-days"
  | "easy-hikes"
  | "stroller-friendly"
  | "city-break"
  | "beach"
  | "budget"
  | "luxury"
  | "long-flight"
  | "short-flight";

export type TripFrontmatter = {
  title: string;
  slug: string;
  country: string;      // ISO 3166-1 alpha-2
  region?: string;
  season?: "spring" | "summer" | "autumn" | "winter";
  year: number;
  durationDays: number;
  kidsAges: number[];
  transport: string[];
  heroImage?: string;
  coverImage?: string;
  excerpt: string;
  bestFor: TripBestFor[];
  tags?: string[];
  publishedAt: string;  // ISO date
  updatedAt?: string;
  relatedTrips?: string[];
  seoTitle?: string;
  metaDescription?: string;
};

export type Trip = TripFrontmatter & {
  body: string;         // MDX body (not yet compiled — RSC will compile)
};

const TRIPS_DIR = path.join(process.cwd(), "content", "trips");

export function getAllTrips(): Trip[] {
  if (!fs.existsSync(TRIPS_DIR)) return [];

  const slugs = fs
    .readdirSync(TRIPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const trips = slugs
    .map((slug) => {
      const filePath = path.join(TRIPS_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        ...(data as TripFrontmatter),
        slug,
        body: content,
      } as Trip;
    })
    .filter((t): t is Trip => t !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return trips;
}

export function getTripBySlug(slug: string): Trip | null {
  return getAllTrips().find((t) => t.slug === slug) ?? null;
}

export function getTripsByCountry(iso2: string): Trip[] {
  return getAllTrips().filter((t) => t.country === iso2);
}

/**
 * Load the auto-generated gallery.json for a trip if it exists.
 * Returns the catalog produced by `npm run photos:import` (with each entry's
 * srcs, caption, altText). Used by the trip page to render <Gallery />.
 */
export function getTripGallery(slug: string): unknown[] | null {
  const galleryPath = path.join(TRIPS_DIR, slug, "gallery.json");
  if (!fs.existsSync(galleryPath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(galleryPath, "utf-8"));
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function getRelatedTrips(trip: Trip, limit = 3): Trip[] {
  const all = getAllTrips();
  // Explicit relations win
  const explicit = (trip.relatedTrips ?? [])
    .map((s) => all.find((t) => t.slug === s))
    .filter((t): t is Trip => Boolean(t));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Fill from same country, then any same-tag, excluding self + already chosen
  const seen = new Set([trip.slug, ...explicit.map((t) => t.slug)]);
  const sameCountry = all.filter(
    (t) => !seen.has(t.slug) && t.country === trip.country
  );
  for (const t of sameCountry) {
    if (explicit.length >= limit) break;
    explicit.push(t);
    seen.add(t.slug);
  }
  if (explicit.length < limit) {
    const sameTag = all.filter(
      (t) =>
        !seen.has(t.slug) &&
        (t.tags ?? []).some((tag) => (trip.tags ?? []).includes(tag))
    );
    for (const t of sameTag) {
      if (explicit.length >= limit) break;
      explicit.push(t);
    }
  }
  return explicit;
}
