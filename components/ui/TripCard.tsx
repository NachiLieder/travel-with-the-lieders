import Link from "next/link";
import type { Trip } from "@/lib/trips";
import { getCountryByIso2 } from "@/lib/countries";

export function TripCard({
  trip,
  size = "md",
}: {
  trip: Trip;
  size?: "md" | "lg";
}) {
  const country = getCountryByIso2(trip.country);
  const aspect = size === "lg" ? "aspect-[3/4]" : "aspect-[4/5]";

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group block rounded-2xl overflow-hidden border border-line bg-bg-elev hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className={`${aspect} bg-line bg-cover bg-center relative overflow-hidden`}
        style={{
          backgroundImage: trip.coverImage
            ? `url(${trip.coverImage})`
            : trip.heroImage
            ? `url(${trip.heroImage})`
            : `linear-gradient(135deg, ${country?.themeColor ?? "#c66b4a"}66, ${country?.themeColor ?? "#c66b4a"}dd)`,
        }}
      >
        {/* Subtle zoom on hover */}
        <div className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700"
             style={{
               backgroundImage: trip.coverImage
                 ? `url(${trip.coverImage})`
                 : trip.heroImage
                 ? `url(${trip.heroImage})`
                 : undefined,
             }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-ink text-xs font-bold px-3 py-1.5 rounded-full">
          {country?.heName ?? trip.country}
        </div>
        <div className="absolute bottom-5 right-5 left-5 text-white">
          <div className="text-xs uppercase tracking-wider opacity-90 font-medium">
            {trip.year} · {trip.durationDays} ימים · גילאי {trip.kidsAges.join(", ")}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 leading-tight group-hover:text-accent-soft transition-colors">
            {trip.title}
          </h3>
          <p className="mt-2 text-sm text-white/85 line-clamp-2 leading-relaxed">
            {trip.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
