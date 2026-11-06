import Link from "next/link";
import { TripCard } from "@/components/ui/TripCard";
import { getAllTrips } from "@/lib/trips";
import { TRIP_TYPE_LABELS, isTripType } from "@/lib/trip-types";

export const metadata = {
  title: "כל הטיולים",
  description: "כל הטיולים המשפחתיים שלנו, ממוינים מהחדש לישן.",
};

export default async function TripsIndex({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await searchParams;
  const activeType = isTripType(type) ? type : null;

  const all = getAllTrips();
  const trips = activeType
    ? all.filter((t) => (t.bestFor ?? []).includes(activeType))
    : all;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="two-voice text-3xl sm:text-4xl">
          {activeType ? (
            <>
              טיולי <span className="script-he">{TRIP_TYPE_LABELS[activeType]}</span>
            </>
          ) : (
            <>
              הטיולים <span className="script-he">שלנו</span>
            </>
          )}
        </h1>
        <p className="mt-4 text-sm tracking-[0.08em] text-ink-muted">
          {trips.length} טיולים, מהחדש לישן.
          {activeType && (
            <>
              {" "}
              <Link href="/trips" className="text-accent hover:underline">
                לכל הטיולים
              </Link>
            </>
          )}
        </p>
      </header>

      {trips.length === 0 ? (
        <p className="text-center text-ink-soft py-12">
          אין עדיין טיולים בקטגוריה הזו.
        </p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((t) => (
            <TripCard key={t.slug} trip={t} />
          ))}
        </div>
      )}
    </div>
  );
}
