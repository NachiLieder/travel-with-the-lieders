import Image from "next/image";
import Link from "next/link";

/**
 * Home hero: a full-width Dominican Republic photo across the top, with a
 * paper welcome panel overlapping its lower edge (skill section 0.4, adapted:
 * the photo sits on top instead of beside the text, so it gets the full
 * width and the text never competes with it).
 *
 * The panel is real HTML, so the Hebrew stays crisp and editable.
 */

const PHOTO = {
  src: "/trips/dominican-republic-2024/gallery/13-cayo-levantado-beach.jpg",
  alt: "חוף קאיו לבנטדו, הרפובליקה הדומיניקנית",
};

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-bg">
      {/* Photo */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[480px]">
        <Image
          src={PHOTO.src}
          alt={PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%]"
        />
      </div>

      {/* Welcome panel, overlapping the photo's bottom edge */}
      <div className="relative mx-auto max-w-2xl px-5 sm:px-8 -mt-16 sm:-mt-20 pb-14 sm:pb-16">
        <div className="paper-panel ring-1 ring-hair relative overflow-hidden text-center px-6 sm:px-12 py-10 sm:py-12 shadow-[0_2px_13px_rgb(0_0_0/0.08)]">
          <Leaves />
          <div className="relative">
            <p className="text-[11px] tracking-[0.3em] text-ink-muted mb-2">
              ביקור ראשון באתר?
            </p>
            <h1
              id="hero-title"
              className="two-voice"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", letterSpacing: 0 }}
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
            <p className="mt-6 mx-auto max-w-md text-[15px] leading-[1.9] text-ink-soft font-light">
              בלוג טיולים משפחתי אמיתי: מסלולים, סיפורים וטיפים מארבעה אנשים
              שמטיילים ביחד, עם ילדים, בכל העולם.
            </p>
            <Link href="/about" className="btn-flat mt-7 min-w-[200px]">
              התחילו כאן
            </Link>
          </div>
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
