import Link from "next/link";
import { COUNTRIES } from "@/lib/countries";
import { getTripsByCountry } from "@/lib/trips";

export const metadata = {
  title: "מדינות שביקרנו בהן",
  description: "כל המדינות שטיילנו בהן עם הילדים — סיפורים, מסלולים וטיפים.",
};

export default function CountriesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">
          המדינות שלנו
        </h1>
        <p className="mt-3 text-lg text-ink-soft max-w-2xl">
          לחצו על מדינה כדי לראות את הטיולים שלנו שם.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {COUNTRIES.map((c) => {
          const tripCount = getTripsByCountry(c.iso2).length;
          return (
            <Link
              key={c.iso2}
              href={`/countries/${c.slug}`}
              className="group block aspect-[4/5] rounded-2xl overflow-hidden relative shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              style={{
                background: `linear-gradient(180deg, ${c.themeColor}66, ${c.themeColor})`,
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <div className="font-display text-2xl font-bold leading-tight">
                  {c.heName}
                </div>
                <div className="text-xs uppercase tracking-wider opacity-85 mt-1">
                  {c.enName} · {tripCount} {tripCount === 1 ? "טיול" : "טיולים"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
