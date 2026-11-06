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
    | "Caribbean"
    | "South America"
    | "Oceania";
  /** Approximate visual centre, used to place the polaroid marker on the world map */
  lat: number;
  lng: number;
  /** Brand accent for the country's page header */
  themeColor?: string;
};

/** Hebrew labels for region groups, in the order they are listed. */
export const REGIONS: { id: Country["continent"]; heName: string }[] = [
  { id: "Africa", heName: "אפריקה" },
  { id: "Asia", heName: "אסיה" },
  { id: "Caribbean", heName: "האיים הקריביים" },
  { id: "Europe", heName: "אירופה" },
  { id: "North America", heName: "צפון אמריקה" },
  { id: "Oceania", heName: "אוקיאניה" },
  { id: "South America", heName: "דרום אמריקה" },
];

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
    lat: 45.9,
    lng: 24.9,
    themeColor: "#2f6f6a",
  },
  {
    iso2: "CZ",
    isoNum: "203",
    heName: "צ'כיה",
    enName: "Czech Republic",
    slug: "czech-republic",
    continent: "Europe",
    lat: 49.8,
    lng: 15.5,
    themeColor: "#3f7a5e",
  },
  {
    iso2: "PT",
    isoNum: "620",
    heName: "פורטוגל",
    enName: "Portugal",
    slug: "portugal",
    continent: "Europe",
    lat: 39.5,
    lng: -8.0,
    themeColor: "#1a7790",
  },
  {
    iso2: "IT",
    isoNum: "380",
    heName: "איטליה",
    enName: "Italy",
    slug: "italy",
    continent: "Europe",
    lat: 42.8,
    lng: 12.5,
    themeColor: "#52669f",
  },
  {
    iso2: "DO",
    isoNum: "214",
    heName: "הרפובליקה הדומיניקנית",
    enName: "Dominican Republic",
    slug: "dominican-republic",
    continent: "Caribbean",
    lat: 18.9,
    lng: -70.2,
    themeColor: "#b8803a",
  },
];

const byIso2 = new Map(COUNTRIES.map((c) => [c.iso2, c]));
const byIsoNum = new Map(COUNTRIES.map((c) => [c.isoNum, c]));
const bySlug = new Map(COUNTRIES.map((c) => [c.slug, c]));

export const getCountryByIso2 = (iso2: string) => byIso2.get(iso2);
export const getCountryByIsoNum = (n: string) => byIsoNum.get(n);
export const getCountryBySlug = (slug: string) => bySlug.get(slug);

export const VISITED_ISO_NUMS = new Set(COUNTRIES.map((c) => c.isoNum));

/** Countries grouped by region, only regions that have at least one country. */
export function getCountriesByRegion() {
  return REGIONS.map((r) => ({
    ...r,
    countries: COUNTRIES.filter((c) => c.continent === r.id),
  })).filter((r) => r.countries.length > 0);
}
