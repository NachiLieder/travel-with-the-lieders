"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

/**
 * Accordion + select + world map, synced (skill section 0.8).
 *
 * Only `active` (a country iso2) and `open` (a region id) live in state.
 * Hovering or focusing a list row lifts its polaroid on the map, and the
 * other way round. The map is geography, so it is NOT mirrored in RTL: the
 * polaroids are positioned with physical `left`/`top` on purpose.
 */

export type ExplorerCountry = {
  iso2: string;
  slug: string;
  heName: string;
  num: number;
  themeColor: string;
  tripCount: number;
  photo?: string;
  marker: { x: number; y: number; mx: number; my: number } | null;
};
export type ExplorerRegion = {
  id: string;
  heName: string;
  countries: ExplorerCountry[];
};

export function DestinationsExplorer({
  regions,
  mapW,
  mapH,
  landPath,
}: {
  regions: ExplorerRegion[];
  mapW: number;
  mapH: number;
  landPath: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const all = regions.flatMap((r) => r.countries);

  const on = (iso: string) => ({
    onMouseEnter: () => setActive(iso),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(iso),
    onBlur: () => setActive(null),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
      {/* ACCORDION (start side) */}
      <div className="bg-white border-[10px] border-white p-4 ring-1 ring-hair">
        <p className="text-[11px] tracking-[0.1em] text-ink-muted mb-3">
          לחצו להרחבה
        </p>
        <ul>
          {regions.map((r) => {
            const isOpen = open === r.id;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`reg-${r.id}`}
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className={`w-full flex items-center gap-3 py-2.5 text-start text-[13px] tracking-[0.06em] transition-colors duration-100 ${
                    isOpen ? "text-accent" : "text-ink-soft hover:text-accent"
                  }`}
                >
                  {/* diamond with +/- */}
                  <span
                    aria-hidden
                    className="grid place-items-center w-[22px] h-[22px] rotate-45 bg-accent-tint/50 text-accent-ink"
                  >
                    <span className="-rotate-45">
                      {isOpen ? (
                        <Minus className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </span>
                  </span>
                  <span className="flex-1">{r.heName}</span>
                  <span className="text-[11px] text-ink-muted" dir="ltr">
                    {r.countries.length}
                  </span>
                </button>
                <ul
                  id={`reg-${r.id}`}
                  hidden={!isOpen}
                  className="ps-[34px] pb-2"
                >
                  {r.countries.map((c) => (
                    <li key={c.iso2}>
                      <Link
                        href={`/countries/${c.slug}`}
                        {...on(c.iso2)}
                        className={`flex items-center gap-2 py-1.5 text-[13px] tracking-[0.04em] transition-colors duration-100 ${
                          active === c.iso2
                            ? "text-accent"
                            : "text-ink-soft hover:text-accent"
                        }`}
                      >
                        <span
                          className={`grid place-items-center w-[18px] h-[18px] rounded-full text-[10px] transition-colors duration-100 ${
                            active === c.iso2
                              ? "bg-accent text-white"
                              : "bg-accent-tint/50 text-accent-ink"
                          }`}
                          dir="ltr"
                        >
                          {c.num}
                        </span>
                        {c.heName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <Link
          href="/countries"
          className="mt-2 block border-t border-hair pt-3 text-[12px] tracking-[0.08em] text-accent hover:text-accent-hover transition-colors"
        >
          לכל היעדים
        </Link>
      </div>

      {/* SELECT + MAP */}
      <div className="min-w-0">
        <label className="relative block max-w-[394px] mb-5">
          <span className="sr-only">בחירת יעד</span>
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) router.push(`/countries/${e.target.value}`);
            }}
            className="w-full h-[45px] appearance-none bg-white border border-[#ddd] ps-[10px] pe-9 text-sm text-ink-soft outline-none focus:border-accent"
          >
            <option value="" disabled>
              לפי יעד
            </option>
            {all.map((c) => (
              <option key={c.iso2} value={c.slug}>
                {c.heName}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
          />
        </label>

        <div className="overflow-x-auto [scrollbar-width:thin]">
          <div
            className="relative min-w-[640px]"
            style={{ aspectRatio: `${mapW} / ${mapH}` }}
            dir="ltr"
          >
            <svg
              viewBox={`0 0 ${mapW} ${mapH}`}
              className="absolute inset-0 w-full h-full"
              role="presentation"
              aria-hidden
            >
              <path
                d={landPath}
                fill="var(--color-paper)"
                stroke="var(--color-paper)"
                strokeWidth="0.6"
              />
              {/* leader lines + true-position dots */}
              {all.map(
                (c) =>
                  c.marker && (
                    <g key={c.iso2}>
                      <line
                        x1={c.marker.x}
                        y1={c.marker.y}
                        x2={c.marker.mx}
                        y2={c.marker.my}
                        stroke="var(--color-accent-tint)"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                      <circle
                        cx={c.marker.x}
                        cy={c.marker.y}
                        r={active === c.iso2 ? 4 : 2.6}
                        fill="var(--color-accent)"
                        style={{ transition: "r 300ms" }}
                      />
                    </g>
                  )
              )}
            </svg>

            {all.map(
              (c) =>
                c.marker && (
                  <Link
                    key={c.iso2}
                    href={`/countries/${c.slug}`}
                    aria-label={`${c.heName}, ${c.tripCount} טיולים`}
                    {...on(c.iso2)}
                    className="group absolute w-[10.4%] min-w-[66px] -translate-x-1/2 -translate-y-1/2 outline-offset-4"
                    style={{
                      left: `${(c.marker.mx / mapW) * 100}%`,
                      top: `${(c.marker.my / mapH) * 100}%`,
                    }}
                  >
                    <span
                      className={`block bg-white p-1 pb-4 shadow-[0_1px_6px_rgb(0_0_0/0.15)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active === c.iso2
                          ? "-translate-y-1 -rotate-1 shadow-[0_10px_24px_-8px_rgb(14_154_167/0.4)]"
                          : ""
                      } group-hover:-translate-y-1 group-hover:-rotate-1`}
                    >
                      <span className="relative block aspect-square ring-1 ring-hair">
                        {c.photo ? (
                          <Image
                            src={c.photo}
                            alt=""
                            fill
                            sizes="90px"
                            className="object-cover"
                          />
                        ) : (
                          <span
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${c.themeColor}66, ${c.themeColor}cc)`,
                            }}
                          />
                        )}
                      </span>
                      <span
                        className="absolute inset-x-0 bottom-0.5 text-center text-[8.5px] tracking-[0.08em] text-ink-soft leading-4"
                        dir="rtl"
                      >
                        {c.heName}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`absolute -top-2 -start-2 grid place-items-center w-[22px] h-[22px] rounded-full text-[11px] transition-colors duration-100 ${
                        active === c.iso2
                          ? "bg-accent text-white"
                          : "bg-accent-tint text-accent-ink"
                      }`}
                    >
                      {c.num}
                    </span>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
