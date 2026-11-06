"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * "Bucket list" strip (Blonde Abroad, skill section 0.6): portrait photo
 * tiles with a cream label chip pinned bottom-centre, boxed arrows, wrap
 * around, no dots, no autoplay. A plain overflow strip (free touch swipe);
 * the only client code is the two arrow buttons. No CSS scroll-snap: it
 * mis-resolves positions in RTL scroll containers.
 *
 * RTL: the strip starts at the right edge. "Next" moves toward the left.
 */

export type TypeTile = { id: string; label: string; photo: string };

export function TripTypeCarousel({ tiles }: { tiles: TypeTile[] }) {
  const ref = useRef<HTMLUListElement>(null);

  function go(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const sign = rtl ? -1 : 1; // scrollLeft is negative in RTL
    const tile = el.querySelector("li")?.getBoundingClientRect().width ?? 320;
    const step = tile + 8;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    // wrap-around
    if (dir === 1 && pos >= max - 4) {
      el.scrollTo({ left: 0, behavior });
      return;
    }
    if (dir === -1 && pos <= 4) {
      el.scrollTo({ left: sign * max, behavior });
      return;
    }
    el.scrollBy({ left: sign * dir * step, behavior });
  }

  const arrow =
    "absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center w-[30px] h-[75px] bg-white/75 text-ink-soft opacity-80 hover:opacity-100 hover:bg-white transition-[opacity,background-color] duration-100";

  return (
    <div className="relative">
      <ul
        ref={ref}
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-[7%]"
        aria-label="סוגי טיולים"
      >
        {tiles.map((t) => (
          <li
            key={t.id}
            className="shrink-0 basis-[78%] sm:basis-[44%] md:basis-[30%] lg:basis-[26%]"
          >
            <Link
              href={`/trips?type=${t.id}`}
              className="group relative block aspect-[320/419] overflow-hidden bg-line"
            >
              <Image
                src={t.photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 768px) 30vw, 78vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-6 inset-x-0 mx-auto w-fit max-w-[88%] bg-cream px-8 py-2 text-[12px] tracking-[0.08em] text-ink-soft group-hover:text-accent transition-colors duration-100 text-center">
                {t.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* RTL: "previous" sits at the start (right), "next" at the end (left). */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="הקודם"
        className={`${arrow} start-0`}
      >
        <ChevronRight className="w-5 h-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="הבא"
        className={`${arrow} end-0`}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden />
      </button>
    </div>
  );
}
