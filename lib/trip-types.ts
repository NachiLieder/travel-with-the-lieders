/**
 * Trip "types" shown in the header dropdown and the home-page strip.
 * They are the `bestFor` values from trip frontmatter, with Hebrew labels.
 * Server-side helpers (they read trips from disk); the label map itself is
 * plain data and safe to import anywhere.
 */

import {
  getAllTrips,
  getTripGallery,
  type Trip,
  type TripBestFor,
} from "@/lib/trips";

export const TRIP_TYPE_LABELS: Record<TripBestFor, string> = {
  toddlers: "פעוטות",
  "young-kids": "ילדים קטנים",
  "older-kids": "ילדים גדולים",
  teens: "בני נוער",
  nature: "טבע",
  "road-trip": "טיולי דרכים",
  "rainy-days": "ימים גשומים",
  "easy-hikes": "הליכות קלות",
  "stroller-friendly": "מתאים לעגלה",
  "city-break": "חופשת עיר",
  beach: "חופים",
  budget: "חסכוני",
  luxury: "יוקרה",
  "long-flight": "טיסה ארוכה",
  "short-flight": "טיסה קצרה",
};

export const isTripType = (v: unknown): v is TripBestFor =>
  typeof v === "string" && v in TRIP_TYPE_LABELS;

export const tripPhoto = (t: Trip): string | undefined =>
  t.coverImage || t.heroImage || undefined;

export type TripTypeEntry = {
  id: TripBestFor;
  label: string;
  count: number;
  /** A real photo from a trip of this type; unique across types when possible. */
  photo?: string;
};

/** Filename hints so e.g. "beach" gets a beach photo when one exists. */
const HINTS: Partial<Record<TripBestFor, string[]>> = {
  beach: ["beach", "sunset", "ocean", "swan"],
  nature: ["valley", "canyon", "lake", "mountain", "plateau", "road"],
  "road-trip": ["road", "transfagarasan", "viewpoint"],
  "easy-hikes": ["hike", "trail", "path", "steps", "stream"],
  "city-break": ["alley", "street", "castle", "village"],
  toddlers: ["toddler", "playground", "baveno"],
  "young-kids": ["kids", "playground", "family", "bubble"],
  "older-kids": ["hike", "bubble", "cave", "dam"],
  luxury: ["hotel", "view", "sunset"],
  budget: ["pension", "apartment", "stand"],
  "long-flight": ["flight", "airplane", "jfk"],
  "short-flight": ["flight", "airport"],
};

type GalleryEntry = {
  filename?: string;
  src?: string;
  width?: number;
  height?: number;
};

type Candidate = { src: string; name: string; portrait: boolean };

function candidatesOf(t: Trip): Candidate[] {
  const out: Candidate[] = [];
  for (const src of [t.coverImage, t.heroImage]) {
    if (src) out.push({ src, name: src.split("/").pop() ?? "", portrait: false });
  }
  const gallery = (getTripGallery(t.slug) ?? []) as GalleryEntry[];
  for (const g of gallery) {
    if (!g.src) continue;
    out.push({
      src: g.src,
      name: g.filename ?? g.src,
      portrait: (g.height ?? 0) > (g.width ?? 0),
    });
  }
  return out;
}

/** Types that at least one trip has, most-used first, each with its own photo. */
export function getTripTypes(): TripTypeEntry[] {
  const trips = getAllTrips();
  const map = new Map<TripBestFor, { entry: TripTypeEntry; pool: Candidate[] }>();
  for (const t of trips) {
    for (const id of t.bestFor ?? []) {
      if (!isTripType(id)) continue;
      const cur = map.get(id) ?? {
        entry: { id, label: TRIP_TYPE_LABELS[id], count: 0 },
        pool: [] as Candidate[],
      };
      cur.entry.count += 1;
      cur.pool.push(...candidatesOf(t));
      map.set(id, cur);
    }
  }

  const used = new Set<string>();
  const sorted = [...map.values()].sort((a, b) => b.entry.count - a.entry.count);
  // Least-flexible types (fewest candidates) choose first, so none is left bare.
  for (const { entry, pool } of [...sorted].sort(
    (a, b) => a.pool.length - b.pool.length
  )) {
    const hints = HINTS[entry.id] ?? [];
    const score = (c: Candidate) =>
      (hints.some((h) => c.name.toLowerCase().includes(h)) ? 2 : 0) +
      (c.portrait ? 1 : 0);
    const best = pool
      .filter((c) => !used.has(c.src))
      .sort((a, b) => score(b) - score(a))[0];
    const pick = best ?? pool[0];
    if (pick) {
      entry.photo = pick.src;
      used.add(pick.src);
    }
  }
  return sorted.map((s) => s.entry);
}
