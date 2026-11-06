import { getCountriesByRegion, getCountryByIso2 } from "@/lib/countries";
import { getAllTrips } from "@/lib/trips";
import { getTripTypes } from "@/lib/trip-types";
import { HeaderShell } from "@/components/layout/HeaderShell";

/** Server wrapper: gathers the data the client header needs and passes plain props. */
export function SiteHeader() {
  const regions = getCountriesByRegion().map((r) => ({
    id: r.id,
    heName: r.heName,
    countries: r.countries.map((c) => ({ slug: c.slug, heName: c.heName })),
  }));
  const types = getTripTypes().map((t) => ({ id: t.id, label: t.label }));
  const searchIndex = getAllTrips().map((t) => ({
    slug: t.slug,
    title: t.title,
    country: getCountryByIso2(t.country)?.heName ?? t.country,
    excerpt: t.excerpt ?? "",
  }));

  return (
    <HeaderShell regions={regions} types={types} searchIndex={searchIndex} />
  );
}
