import type { MetadataRoute } from "next";

import { getAllTrips } from "@/lib/trips";
import { COUNTRIES } from "@/lib/countries";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const trips = getAllTrips();
  const latest = trips
    .map((t) => t.updatedAt ?? t.publishedAt)
    .sort()
    .at(-1);

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: latest, priority: 1 },
    { url: `${SITE_URL}/trips`, lastModified: latest, priority: 0.9 },
    { url: `${SITE_URL}/countries`, lastModified: latest, priority: 0.7 },
    { url: `${SITE_URL}/about`, priority: 0.5 },
  ];

  const tripPages: MetadataRoute.Sitemap = trips.map((t) => ({
    url: `${SITE_URL}/trips/${t.slug}`,
    lastModified: t.updatedAt ?? t.publishedAt,
    priority: 0.8,
  }));

  const countryPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
    url: `${SITE_URL}/countries/${c.slug}`,
    priority: 0.6,
  }));

  return [...pages, ...tripPages, ...countryPages];
}
