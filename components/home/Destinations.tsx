import { getCountriesByRegion } from "@/lib/countries";
import { getAllTrips } from "@/lib/trips";
import { tripPhoto } from "@/lib/trip-types";
import { getWorldMap } from "@/lib/world-map";
import { SectionTitle } from "@/components/home/SectionTitle";
import {
  DestinationsExplorer,
  type ExplorerRegion,
} from "@/components/home/DestinationsExplorer";

/**
 * "Explore by destination" (Blonde Abroad, skill section 0.8): a numbered
 * accordion, a dropdown, and a paper world map with a polaroid per
 * country, all kept in sync. This server wrapper projects the map and
 * resolves photos at build time; the client part only handles hover/focus.
 */
export function Destinations() {
  const groups = getCountriesByRegion();
  const trips = getAllTrips();
  const all = groups.flatMap((g) => g.countries);
  const map = getWorldMap(all);

  let n = 0;
  const regions: ExplorerRegion[] = groups.map((g) => ({
    id: g.id,
    heName: g.heName,
    countries: g.countries.map((c) => {
      const own = trips.filter((t) => t.country === c.iso2);
      const marker = map.markers.get(c.iso2);
      n += 1;
      return {
        iso2: c.iso2,
        slug: c.slug,
        heName: c.heName,
        num: n,
        themeColor: c.themeColor ?? "#097785",
        tripCount: own.length,
        photo: own.map(tripPhoto).find(Boolean),
        marker: marker
          ? {
              x: marker.x,
              y: marker.y,
              mx: marker.mx,
              my: marker.my,
            }
          : null,
      };
    }),
  }));

  return (
    <section
      aria-labelledby="dest-title"
      className="bg-bg-elev py-16 md:py-20 stitch-edge"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle script="חקרו" id="dest-title" className="mb-10 md:mb-12">
          לפי יעד
        </SectionTitle>
        <DestinationsExplorer
          regions={regions}
          mapW={map.w}
          mapH={map.h}
          landPath={map.d}
        />
      </div>
    </section>
  );
}
