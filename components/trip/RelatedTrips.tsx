import Link from "next/link";
import type { Trip } from "@/lib/trips";
import { getCountryByIso2 } from "@/lib/countries";

export function RelatedTrips({ trips }: { trips: Trip[] }) {
  if (!trips.length) return null;
  return (
    <section className="mt-16 pt-12 border-t border-line">
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        טיולים שאולי יעניינו אתכם
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => {
          const country = getCountryByIso2(t.country);
          return (
            <Link
              key={t.slug}
              href={`/trips/${t.slug}`}
              className="group block rounded-2xl border border-line bg-bg-elev overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div
                className="aspect-[4/3] bg-line bg-cover bg-center"
                style={{
                  backgroundImage: t.coverImage
                    ? `url(${t.coverImage})`
                    : `linear-gradient(135deg, ${country?.themeColor ?? "#c66b4a"}44, ${country?.themeColor ?? "#c66b4a"}99)`,
                }}
              />
              <div className="p-4">
                <div className="text-xs uppercase tracking-wider text-ink-muted">
                  {country?.heName ?? t.country} · {t.year}
                </div>
                <h3 className="font-display text-lg font-bold mt-1 group-hover:text-accent transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2">
                  {t.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
