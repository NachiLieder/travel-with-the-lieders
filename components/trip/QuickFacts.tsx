import { Calendar, Users, Clock, Plane, Car, Train } from "lucide-react";
import type { Trip } from "@/lib/trips";

const SEASON_HE: Record<string, string> = {
  spring: "אביב",
  summer: "קיץ",
  autumn: "סתיו",
  winter: "חורף",
};

const TRANSPORT_HE: Record<string, { label: string; Icon: typeof Plane }> = {
  flight: { label: "טיסה", Icon: Plane },
  "rental-car": { label: "רכב שכור", Icon: Car },
  train: { label: "רכבת", Icon: Train },
  bus: { label: "אוטובוס", Icon: Car },
  cruise: { label: "שייט", Icon: Plane },
};

export function QuickFacts({ trip }: { trip: Trip }) {
  return (
    <section className="border-b border-line bg-bg-elev/60">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <Fact
          Icon={Calendar}
          label="תקופה"
          value={`${trip.season ? SEASON_HE[trip.season] + " " : ""}${trip.year}`}
        />
        <Fact
          Icon={Clock}
          label="משך"
          value={`${trip.durationDays} ימים`}
        />
        <Fact
          Icon={Users}
          label="גילאי הילדים"
          value={trip.kidsAges.join(", ")}
        />
        <Fact
          Icon={Plane}
          label="תחבורה"
          value={trip.transport
            .map((t) => TRANSPORT_HE[t]?.label ?? t)
            .join(" + ")}
        />
      </div>
    </section>
  );
}

function Fact({
  Icon,
  label,
  value,
}: {
  Icon: typeof Plane;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid place-items-center w-10 h-10 rounded-full bg-accent-soft text-accent-ink">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-muted">
          {label}
        </div>
        <div className="font-semibold text-ink">{value}</div>
      </div>
    </div>
  );
}
