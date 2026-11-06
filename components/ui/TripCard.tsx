import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Trip } from "@/lib/trips";
import { getCountryByIso2 } from "@/lib/countries";
import { tripPhoto } from "@/lib/trip-types";

/**
 * Matted-print trip card (The Blonde Abroad "feat-box", see the
 * travel-blog-inspiration skill, section 0.5):
 *   paper grain mat · 5px border · 1px hairline ring · near-square photo ·
 *   2-line light serif title · white hairline · small tracked link.
 * Calm by design: the photo eases to 1.03 and the link shifts colour.
 */
export function TripCard({
  trip,
  priority = false,
}: {
  trip: Trip;
  priority?: boolean;
  /** @deprecated kept so older call sites keep compiling; the layout is fixed now */
  size?: "md" | "lg";
}) {
  const country = getCountryByIso2(trip.country);
  const photo = tripPhoto(trip);
  const theme = country?.themeColor ?? "#097785";

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col w-full paper-mat text-center pb-5"
    >
      {/* Photo — 280:260 */}
      <div className="zoom-frame relative mx-4 mt-5 aspect-[14/13] bg-line">
        {photo ? (
          <Image
            src={photo}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          // No photos for this trip yet: a quiet colour field, never a broken image.
          <div
            className="absolute inset-0 grid place-items-center"
            style={{
              background: `linear-gradient(135deg, ${theme}55, ${theme}cc)`,
            }}
          >
            <span className="font-display font-light text-white text-2xl tracking-[0.12em]">
              {country?.heName ?? trip.country}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-7 flex-1 flex flex-col">
        <p className="text-[11px] tracking-[0.1em] text-ink-muted leading-5">
          <span className="block">{country?.heName ?? trip.country}</span>
          <span className="block">
            <bdi>{trip.year}</bdi> · {trip.durationDays} ימים · גילאי{" "}
            <bdi>{trip.kidsAges.join(", ")}</bdi>
          </span>
        </p>
        <h3 className="mt-2 pb-3 font-display font-light text-lg leading-relaxed tracking-[0.02em] text-ink-soft text-balance line-clamp-2 border-b border-white">
          {trip.title}
        </h3>
        <span className="mt-auto pt-3 inline-flex items-center justify-center gap-1.5 text-xs tracking-[0.1em] text-accent group-hover:text-accent-hover transition-colors duration-100">
          לקריאה
          {/* Forward in Hebrew points left. */}
          <ArrowLeft
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
