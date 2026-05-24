/**
 * Country registry — the single source of truth for which countries we've
 * visited, what to call them in Hebrew, and how they look on the map.
 *
 * Keys are ISO 3166-1 numeric codes as strings (matching the world-atlas
 * TopoJSON dataset). Switch to alpha-2 in trip frontmatter for readability;
 * the lookup helpers below translate between them.
 */

export type Country = {
  /** ISO 3166-1 alpha-2 code, used in trip frontmatter */
  iso2: string;
  /** ISO 3166-1 numeric code (matches world-atlas TopoJSON `id`) */
  isoNum: string;
  /** Hebrew display name */
  heName: string;
  /** English name (for SEO + slugs) */
  enName: string;
  /** URL slug under /countries/ */
  slug: string;
  /** Continent for grouping */
  continent:
    | "Europe"
    | "Asia"
    | "Africa"
    | "North America"
    | "South America"
    | "Oceania";
  /** Brand accent for the country's page header */
  themeColor?: string;
};

/**
 * Visited countries. Add a new entry when a trip in a new country is published.
 */
export const COUNTRIES: Country[] = [
  {
    iso2: "RO",
    isoNum: "642",
    heName: "רומניה",
    enName: "Romania",
    slug: "romania",
    continent: "Europe",
    themeColor: "#7a4f2e",
  },
  {
    iso2: "CZ",
    isoNum: "203",
    heName: "צ'כיה",
    enName: "Czech Republic",
    slug: "czech-republic",
    continent: "Europe",
    themeColor: "#5b7a4e",
  },
  {
    iso2: "PT",
    isoNum: "620",
    heName: "פורטוגל",
    enName: "Portugal",
    slug: "portugal",
    continent: "Europe",
    themeColor: "#c66b4a",
  },
  {
    iso2: "IT",
    isoNum: "380",
    heName: "איטליה",
    enName: "Italy",
    slug: "italy",
    continent: "Europe",
    themeColor: "#4f7da3",
  },
  {
    iso2: "DO",
    isoNum: "214",
    heName: "הרפובליקה הדומיניקנית",
    enName: "Dominican Republic",
    slug: "dominican-republic",
    continent: "North America",
    themeColor: "#e0a93f",
  },
];

const byIso2 = new Map(COUNTRIES.map((c) => [c.iso2, c]));
const byIsoNum = new Map(COUNTRIES.map((c) => [c.isoNum, c]));
const bySlug = new Map(COUNTRIES.map((c) => [c.slug, c]));

export const getCountryByIso2 = (iso2: string) => byIso2.get(iso2);
export const getCountryByIsoNum = (n: string) => byIsoNum.get(n);
export const getCountryBySlug = (slug: string) => bySlug.get(slug);

export const VISITED_ISO_NUMS = new Set(COUNTRIES.map((c) => c.isoNum));
