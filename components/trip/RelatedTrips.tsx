import type { Trip } from "@/lib/trips";
import { TripCard } from "@/components/ui/TripCard";

export function RelatedTrips({ trips }: { trips: Trip[] }) {
  if (!trips.length) return null;
  return (
    <section className="mt-16 pt-12 border-t border-line">
      <h2 className="two-voice text-2xl sm:text-3xl mb-8 text-center">
        טיולים שאולי יעניינו אתכם
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => (
          <TripCard key={t.slug} trip={t} />
        ))}
      </div>
    </section>
  );
}
