import type { Trip } from "@/lib/trips";

const BEST_FOR_LABELS: Record<string, string> = {
  toddlers: "פעוטות",
  "young-kids": "גילאי 4-7",
  "older-kids": "גילאי 8-12",
  teens: "מתבגרים",
  nature: "טבע",
  "road-trip": "טיול שטח / רכב",
  "rainy-days": "ימים גשומים",
  "easy-hikes": "מסלולים קלים",
  "stroller-friendly": "ידידותי לעגלות",
  "city-break": "ערים",
  beach: "ים וחוף",
  budget: "תקציב חסכוני",
  luxury: "פינוק",
  "long-flight": "טיסה ארוכה",
  "short-flight": "טיסה קצרה",
};

export function TripHero({ trip }: { trip: Trip }) {
  const heroBg = trip.heroImage ?? `/placeholder-hero.svg`;

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <div
        className="absolute inset-0 ken-burns bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 pb-12 sm:pb-16 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {trip.bestFor.map((b) => (
              <span
                key={b}
                className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
              >
                {BEST_FOR_LABELS[b] ?? b}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            {trip.title}
          </h1>
          {trip.region && (
            <p className="mt-3 text-lg sm:text-xl text-white/85">
              {trip.region}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
