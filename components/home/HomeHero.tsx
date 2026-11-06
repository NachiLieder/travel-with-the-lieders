import Image from "next/image";
import Link from "next/link";

/**
 * Home hero — a layered collage, not text-on-photo (Blonde Abroad, skill
 * section 0.4), built in real HTML so the Hebrew stays crisp and editable.
 *
 *   [ large landscape photo ] [ polaroid ] [ paper panel with text ]
 *
 * DOM order is photo → polaroid → text, so in RTL the photo sits at the
 * start (right) and the text panel at the end (left): a true mirror of the
 * reference. Below `md` it stacks: photo, then the panel.
 */

const BIG_PHOTO = {
  src: "/trips/dominican-republic-2024/gallery/04-jarabacoa-mountain-valley-viewpoint.jpg",
  alt: "נוף עמק הרים בג'רבאקואה, הרפובליקה הדומיניקנית",
};
const POLAROID = {
  src: "/trips/romania-10-days-2024/gallery/11-day3-bran-castle.jpg",
  alt: "טירת בראן ברומניה",
};

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative grid md:grid-cols-[1.15fr_0.85fr_1.2fr] md:min-h-[460px] bg-paper-cool"
    >
      {/* Large photo */}
      <div className="relative h-64 md:h-auto">
        <Image
          src={BIG_PHOTO.src}
          alt={BIG_PHOTO.alt}
          fill
          priority
          sizes="(min-width: 768px) 35vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Polaroid (desktop only; on mobile the photo above carries the hero) */}
      <div className="hidden md:grid place-items-center paper-panel px-6 py-10 relative z-10">
        <figure className="bg-white p-3 pb-10 shadow-[0_2px_13px_rgb(0_0_0/0.12)] -rotate-2 w-full max-w-[260px]">
          <div className="relative aspect-[3/4] ring-1 ring-hair ring-offset-4 ring-offset-white">
            <Image
              src={POLAROID.src}
              alt={POLAROID.alt}
              fill
              sizes="260px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-5 text-center text-[11px] tracking-[0.2em] text-ink-muted">
            רומניה · 2023
          </figcaption>
        </figure>
      </div>

      {/* Text panel */}
      <div className="paper-panel relative flex flex-col items-center justify-center text-center px-8 py-12 md:py-14 overflow-hidden">
        <Leaves />
        <div className="relative max-w-sm">
          <p className="text-[11px] tracking-[0.3em] text-ink-muted mb-2">
            ביקור ראשון באתר?
          </p>
          <h1
            id="hero-title"
            className="two-voice text-ink-soft"
            style={{ fontSize: "clamp(2.4rem, 4.4vw, 3.4rem)", letterSpacing: 0 }}
          >
            <span className="script-he" style={{ fontSize: "1.35em" }}>
              ברוכים הבאים
            </span>
          </h1>
          <p
            dir="ltr"
            className="mt-3 font-display font-light uppercase text-sm tracking-[0.35em] text-ink-soft"
          >
            Travel · with · the · Lieders
          </p>
          <p className="mt-1 text-xs italic text-ink-muted">
            שם־עצם · משפחה אחת, הרבה מזוודות
          </p>
          <p className="mt-6 text-[15px] leading-[1.9] text-ink-soft font-light">
            בלוג טיולים משפחתי אמיתי: מסלולים, סיפורים וטיפים מארבעה אנשים
            שמטיילים ביחד, עם ילדים, בכל העולם.
          </p>
          <Link href="/about" className="btn-flat mt-7 min-w-[200px]">
            התחילו כאן
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Our own faint botanical line-art, tinted turquoise (decorative). */
function Leaves() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -bottom-6 -end-6 w-44 h-44 text-accent-tint opacity-50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M20 190 C60 140 90 110 150 20" />
      <path d="M45 150 C25 140 15 120 18 100 C40 105 55 125 45 150Z" />
      <path d="M70 118 C50 105 45 85 52 66 C72 75 82 96 70 118Z" />
      <path d="M96 88 C80 70 82 50 94 36 C110 48 112 70 96 88Z" />
      <path d="M62 160 C85 158 105 146 112 126 C90 124 68 138 62 160Z" />
      <path d="M92 128 C112 124 130 110 134 92 C114 92 96 106 92 128Z" />
    </svg>
  );
}
