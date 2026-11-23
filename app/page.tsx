import Link from "next/link";

import { HomeHero } from "@/components/home/HomeHero";
import { SectionTitle } from "@/components/home/SectionTitle";
import { TripTypeCarousel } from "@/components/home/TripTypeCarousel";
import { PostcardAbout } from "@/components/home/PostcardAbout";
import { Destinations } from "@/components/home/Destinations";
import { TripCard } from "@/components/ui/TripCard";
import { Reveal } from "@/components/ui/Reveal";
import { getAllTrips } from "@/lib/trips";
import { COUNTRIES } from "@/lib/countries";
import { getTripTypes } from "@/lib/trip-types";

/**
 * Home page, built on The Blonde Abroad's section order
 * (see .claude/skills/travel-blog-inspiration, section 0):
 *   hero → destinations map → featured trips → trip types →
 *   postcard about → newsletter
 * Bands alternate cream / white; separation is tint and a stitched edge,
 * not rules.
 */
export default function HomePage() {
  const trips = getAllTrips();
  const tiles = getTripTypes()
    .filter((t) => t.photo)
    .map((t) => ({ id: t.id, label: t.label, photo: t.photo as string }));

  return (
    <>
      <HomeHero />

      <Destinations />

      {/* FEATURED TRIPS */}
      <section
        aria-labelledby="featured-title"
        className="bg-cream pt-14 pb-16 md:pb-20 stitch-edge"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionTitle script="מומלצים" id="featured-title" className="mb-8">
            מהבלוג
          </SectionTitle>

          {trips.length === 0 ? (
            <p className="text-center text-ink-soft py-12">
              עדיין לא פרסמנו טיולים. בקרוב!
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {trips.map((t, i) => (
                <Reveal
                  key={t.slug}
                  delay={Math.min(i, 5) * 70}
                  className="flex basis-full sm:basis-[calc(50%-4px)] lg:basis-[calc(33.333%-6px)]"
                >
                  <TripCard trip={t} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/trips" className="btn-flat btn-flat-outline w-[200px]">
              לכל הטיולים
            </Link>
          </div>
        </div>
      </section>

      {/* TRIP TYPES */}
      {tiles.length > 0 && (
        <section
          aria-labelledby="types-title"
          className="bg-bg-elev pt-16 pb-16 md:pb-20"
        >
          <SectionTitle
            script="סוגי"
            id="types-title"
            className="mb-10 md:mb-14 px-5"
          >
            טיולים
          </SectionTitle>
          <TripTypeCarousel tiles={tiles} />
        </section>
      )}

      <PostcardAbout countries={COUNTRIES.length} trips={trips.length} />

      {/* NEWSLETTER */}
      <section
        aria-labelledby="news-title"
        className="bg-cream py-16 md:py-20"
      >
        <div className="mx-auto max-w-xl px-5 sm:px-8 text-center">
          <SectionTitle script="ניוזלטר" id="news-title" className="mb-4">
            פעם בחודש
          </SectionTitle>
          <p className="text-[15px] leading-7 text-ink-soft font-light mb-7">
            טיול חדש, טיפים אמיתיים, ושום ספאם. נשבעים.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 justify-center"
            action="#"
          >
            <label className="sr-only" htmlFor="home-news-email">
              המייל שלכם
            </label>
            <input
              id="home-news-email"
              type="email"
              required
              dir="ltr"
              placeholder="המייל שלכם"
              className="h-[45px] flex-1 max-w-sm bg-white border border-[#ddd] px-4 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-accent"
            />
            <button type="submit" className="btn-flat h-[45px]">
              הצטרפו
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
