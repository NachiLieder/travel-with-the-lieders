/**
 * Build-time world map.
 *
 * Projects the Natural Earth 110m land (world-atlas) into one SVG path and
 * works out where each visited country's polaroid marker goes. Runs only on
 * the server (called from a Server Component), so d3-geo and the TopoJSON
 * never reach the client bundle.
 */

import fs from "node:fs";
import path from "node:path";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

import type { Country } from "@/lib/countries";

export const MAP_W = 810;
export const MAP_H = 400;

/**
 * Where a polaroid sits relative to the country's true position, in map
 * units. Europe is crowded (four countries within ~20 map units), so the
 * photos fan out and a thin leader line points back to the real spot.
 * Unlisted countries default to straight above.
 */
const MARKER_OFFSETS: Record<string, [number, number]> = {
  PT: [-92, -34],
  CZ: [-14, -82],
  RO: [86, -50],
  IT: [-30, 62],
  DO: [-32, 58],
};

export type MapMarker = {
  iso2: string;
  /** true position of the country (map units) */
  x: number;
  y: number;
  /** polaroid centre (map units) */
  mx: number;
  my: number;
};

let cache: { d: string; markers: Map<string, MapMarker> } | null = null;

function build(countries: Country[]) {
  const file = path.join(
    process.cwd(),
    "node_modules",
    "world-atlas",
    "countries-110m.json"
  );
  const topo = JSON.parse(fs.readFileSync(file, "utf-8")) as Topology;
  const fc = feature(
    topo,
    topo.objects.countries as GeometryCollection
  ) as FeatureCollection<Geometry>;

  // Drop Antarctica (id 010): it only wastes the bottom third of the frame.
  const land: FeatureCollection<Geometry> = {
    type: "FeatureCollection",
    features: fc.features.filter((f) => String(f.id) !== "010"),
  };

  const projection = geoNaturalEarth1().fitExtent(
    [
      [6, 6],
      [MAP_W - 6, MAP_H - 6],
    ],
    land
  );
  const d = geoPath(projection)(land) ?? "";

  const markers = new Map<string, MapMarker>();
  for (const c of countries) {
    const p = projection([c.lng, c.lat]);
    if (!p) continue;
    const [dx, dy] = MARKER_OFFSETS[c.iso2] ?? [0, -60];
    markers.set(c.iso2, {
      iso2: c.iso2,
      x: p[0],
      y: p[1],
      mx: p[0] + dx,
      my: p[1] + dy,
    });
  }
  return { d, markers };
}

export function getWorldMap(countries: Country[]) {
  // The land path never changes; markers depend on the country list, which is
  // static at build time too, so one cache is enough per process.
  cache ??= build(countries);
  return { w: MAP_W, h: MAP_H, d: cache.d, markers: cache.markers };
}
