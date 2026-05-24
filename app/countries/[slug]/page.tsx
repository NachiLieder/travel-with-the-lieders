import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { COUNTRIES, getCountryBySlug } from "@/lib/countries";
import { getTripsByCountry } from "@/lib/trips";
import { TripCard } from "@/components/ui/TripCard";

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: "מדינה לא נמצאה" };
  return {
    title: `טיולים משפחתיים ב${country.heName}`,
    description: `כל הטיולים, המסלולים והטיפים שלנו לטיולים משפחתיים ב${country.heName}.`,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const trips = getTripsByCountry(country.iso2);
  const themeColor = country.themeColor ?? "#c66b4a";

  return (
    <>
      <section
        className="relative py-16 sm:py-24 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)`,
        }}
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10">
          <nav className="text-sm text-white/80 mb-3" aria-label="breadcrumb">
            <a href="/" className="hover:text-white">בית</a>
            {" / "}
            <a href="/countries" className="hover:text-white">מדינות</a>
            {" / "}
            <span className="text-white">{country.heName}</span>
          </nav>
          <h1 className="font-display text-5xl sm:text-7xl font-bold mb-3">
            {country.heName}
          </h1>
          <p className="text-xl text-white/85 mb-2">{country.enName}</p>
          <p className="text-lg text-white/85">
            {trips.length} {trips.length === 1 ? "טיול" : "טיולים"} ·{" "}
            {country.continent}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
        {trips.length === 0 ? (
          <p className="text-ink-soft text-center">
            עדיין לא הוספנו כאן טיולים. בקרוב!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
