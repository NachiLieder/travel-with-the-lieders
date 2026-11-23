import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionTitle } from "@/components/home/SectionTitle";

/**
 * About, as a postcard (Blonde Abroad, skill section 0.7):
 * parchment panel · framed photo · dashed divider · stamp + postmark ·
 * centred message · flat button. Beside it, a narrow list of tips with
 * arrow rows (their "travel FOR FREE" column).
 *
 * Everything is real markup and our own SVG; the stamp is original art.
 * DOM order is photo → divider → message, so RTL mirrors the layout.
 */

/** Drop a real photo at public/family.jpg and point this at it. */
const FAMILY_PHOTO = "/family-placeholder.svg";

const TIPS = [
  {
    title: "איך לבחור יעד",
    text: "לפי גילאי הילדים, אורך הטיסה, וכמה דברים רוצים לעשות בכל יום.",
  },
  {
    title: "מסלולים עם ילדים",
    text: "לתכנן פחות, לא יותר. הזמן הכי טוב הוא לרוב הזמן שלא תכננו.",
  },
  {
    title: "לארוז חכם",
    text: "מה ש'בטח נצטרך' בדרך כלל לא. מה שלא חשבנו עליו מציל את היום.",
  },
];

export function PostcardAbout({
  countries,
  trips,
}: {
  countries: number;
  trips: number;
}) {
  return (
    <section className="bg-bg py-16 md:py-20" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* POSTCARD */}
        <div className="paper-panel relative ring-1 ring-hair p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-0">
          {/* Photo */}
          <div className="sm:pe-8 shrink-0">
            <div className="bg-white p-2.5 shadow-[0_2px_13px_rgb(0_0_0/0.1)] w-[250px] sm:w-[280px]">
              <div
                role="img"
                aria-label="משפחת לידר"
                className="aspect-[280/365] bg-cover bg-center ring-1 ring-hair ring-offset-4 ring-offset-white"
                style={{ backgroundImage: `url(${FAMILY_PHOTO})` }}
              />
            </div>
          </div>

          {/* Dashed postcard divider */}
          <div
            aria-hidden
            className="hidden sm:block self-stretch border-s-2 border-dashed border-accent-tint/70"
          />
          <div aria-hidden className="sm:hidden w-full border-t-2 border-dashed border-accent-tint/70" />

          {/* Message */}
          <div className="relative sm:ps-8 flex-1 text-center">
            <Stamp />
            <h2 id="about-title" className="two-voice text-lg mt-20 sm:mt-24 mb-4">
              על <span className="script-he">משפחת לידר</span>
            </h2>
            <p className="mx-auto max-w-[300px] text-[14px] leading-6 text-ink-soft font-light">
              אירית, נחי, היילי ודניאל: ארבעה אנשים, מזוודה אחת גדולה מדי,
              ועולם שלם של מקומות שעוד לא ראינו. מה שאנחנו ממליצים עליו זה מה
              שעשינו באמת, ומה שלא אהבנו, אנחנו אומרים.
            </p>

            <p className="mt-5 text-xs tracking-[0.12em] text-ink-muted">
              <bdi>{countries}</bdi> מדינות · <bdi>{trips}</bdi> טיולים ·{" "}
              <bdi>2</bdi> ילדים בדרכים
            </p>

            <Link href="/about" className="btn-flat mt-6 w-[200px]">
              לסיפור המלא
            </Link>
          </div>
        </div>

        {/* TIPS */}
        <aside aria-labelledby="tips-title" className="paper-mat">
          <SectionTitle script="טיפים" id="tips-title" className="mt-4 text-lg">
            שעובדים בדרך
          </SectionTitle>
          <ul className="mt-5 px-3 pb-4">
            {TIPS.map((t) => (
              <li key={t.title} className="border-b border-hair last:border-0">
                <Link
                  href="/tips"
                  className="group flex items-start gap-3 py-3.5"
                >
                  <span className="flex-1">
                    <span className="block text-[14px] text-accent group-hover:text-accent-hover transition-colors duration-100">
                      {t.title}
                    </span>
                    <span className="block mt-1 text-[13px] leading-5 text-ink-soft font-light">
                      {t.text}
                    </span>
                  </span>
                  <ArrowLeft
                    className="w-4 h-4 mt-1 text-accent-tint group-hover:text-accent group-hover:-translate-x-1 transition duration-300"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/** Original "air mail" stamp + postmark, decorative. */
function Stamp() {
  return (
    <div aria-hidden className="absolute top-0 end-0 flex items-start gap-1">
      <svg viewBox="0 0 175 105" className="w-[120px] h-[72px] text-accent-tint" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* postmark waves */}
        <circle cx="48" cy="52" r="34" />
        <circle cx="48" cy="52" r="27" />
        <text x="48" y="48" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none" letterSpacing="2">
          LIEDERS
        </text>
        <text x="48" y="62" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" letterSpacing="2">
          {new Date().getFullYear()}
        </text>
        <path d="M90 36 q10 -8 20 0 t20 0 t20 0" />
        <path d="M90 52 q10 -8 20 0 t20 0 t20 0" />
        <path d="M90 68 q10 -8 20 0 t20 0 t20 0" />
      </svg>
      <svg viewBox="0 0 80 80" className="w-[64px] h-[64px] text-accent" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="6" width="68" height="68" strokeDasharray="2 3" />
        <rect x="13" y="13" width="54" height="54" />
        <path d="M20 46 L54 30 L60 33 L38 44 L34 56 L30 56 L31 46 Z" fill="currentColor" fillOpacity="0.15" />
        <text x="40" y="62" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none">
          דואר אוויר
        </text>
      </svg>
    </div>
  );
}
