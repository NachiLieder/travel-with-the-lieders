import { TripCard } from "@/components/ui/TripCard";
import { getAllTrips } from "@/lib/trips";

export const metadata = {
  title: "כל הטיולים",
  description: "כל הטיולים המשפחתיים שלנו, ממוינים מהחדש לישן.",
};

export default function TripsIndex() {
  const trips = getAllTrips();
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">
          הטיולים שלנו
        </h1>
        <p className="mt-3 text-lg text-ink-soft max-w-2xl">
          {trips.length} טיולים, מהחדש לישן. לחצו על אחד כדי להעמיק.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => (
          <TripCard key={t.slug} trip={t} />
        ))}
      </div>
    </div>
  );
}
