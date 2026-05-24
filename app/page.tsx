import Link from "next/link";
import { ArrowLeft, Globe2, Mountain, Heart, Sparkles, MapPin, Calendar } from "lucide-react";

import { TripCard } from "@/components/ui/TripCard";
import { getAllTrips } from "@/lib/trips";
import { COUNTRIES } from "@/lib/countries";

/**
 * Family photo path. Drop a real photo at `public/family.jpg` (any reasonable
 * aspect ratio works, ~4:5 portrait is ideal) and change FAMILY_PHOTO below
 * to "/family.jpg". The placeholder ships with the repo so the layout always
 * looks complete.
 */
const FAMILY_PHOTO = "/family-placeholder.svg";

export default function HomePage() {
  const trips = getAllTrips();

  return (
    <>
      {/* ABOUT US — replaces the old hero/featured-trip combo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-soft/30 via-bg to-bg pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Family photo */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 sm:-inset-5 rounded-3xl bg-accent/15 -rotate-2" aria-hidden />
                <div
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-line shadow-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${FAMILY_PHOTO})` }}
                  role="img"
                  aria-label="משפחת לידר"
                />
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-ink text-sm font-semibold mb-5">
                <Sparkles className="w-4 h-4" />
                קצת עלינו
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
                אנחנו <span className="text-accent">משפחת לידר</span>
              </h1>
              <div className="space-y-4 text-lg sm:text-xl text-ink-soft leading-relaxed">
                <p>
                  אירית, נחי, היילי ודניאל — ארבעה אנשים, מזוודה אחת גדולה מדי,
                  ועולם שלם של מקומות שעוד לא ראינו.
                </p>
                <p>
                  אנחנו אוהבים לטייל יחד, לגלות מקומות חדשים — קרובים ורחוקים —
                  ולעזור לעוד משפחות לגלות עולם. הבלוג הזה הוא הדרך שלנו לארגן את
                  כל מה שלמדנו על הדרך ולשתף אותו.
                </p>
                <p>
                  אנחנו לא בלוג שיווקי. מה שאנחנו ממליצים זה מה שעשינו באמת,
                  ומה שלא אהבנו — אנחנו אומרים.
                </p>
              </div>

              {/* Stat row */}
              <div className="flex flex-wrap gap-6 mt-7">
                <Stat
                  Icon={MapPin}
                  value={String(COUNTRIES.length)}
                  label="מדינות"
                />
                <Stat
                  Icon={Calendar}
                  value={String(trips.length)}
                  label="טיולים"
                />
                <Stat
                  Icon={Heart}
                  value="2"
                  label="ילדים בדרכים"
                />
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-6 text-accent font-semibold hover:underline"
              >
                קראו עוד עלינו
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP GRID — every trip, clickable */}
      <section className="bg-bg-elev/50 py-16 sm:py-20 border-y border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <header className="mb-10 text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              הטיולים שלנו
            </h2>
            <p className="mt-3 text-ink-soft text-lg max-w-2xl mx-auto">
              לחצו על כל תמונה כדי לקרוא את הסיפור המלא — מסלול, טיפים, ומה
              שעבד בשטח עם הילדים.
            </p>
          </header>

          {trips.length === 0 ? (
            <p className="text-center text-ink-soft py-12">
              עדיין לא פרסמנו טיולים. בקרוב!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TIPS STRIP */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
            טיפים שעובדים במציאות
          </h2>
          <p className="text-ink-soft text-center mb-10 max-w-2xl mx-auto">
            לא Google, לא AI — דברים שלמדנו על הדרך, בעיקר על ידי שגינו ושילמנו את המחיר.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            <TipCard
              Icon={Globe2}
              title="איך לבחור יעד"
              text="לפי גילאי הילדים, אורך הטיסה, וכמה דברים אתם רוצים לעשות בכל יום."
            />
            <TipCard
              Icon={Mountain}
              title="מסלולים עם ילדים"
              text="לתכנן פחות, לא יותר. הזמן הכי טוב בטיול הוא לרוב הזמן שלא תכננו."
            />
            <TipCard
              Icon={Heart}
              title="לארוז חכם"
              text="מה ש'בטח נצטרך' — בדרך כלל לא. מה שלא חשבנו עליו — מציל את היום."
            />
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tips"
              className="inline-flex items-center gap-1 rounded-full bg-ink text-bg px-6 py-3 font-semibold hover:bg-accent transition-colors"
            >
              לכל הטיפים <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-16 sm:py-20 bg-accent text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            לקבל את הטיולים אלינו במייל?
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            פעם בחודש — טיול חדש, טיפים אמיתיים, ושום ספאם. נשבעים.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            action="#"
          >
            <input
              type="email"
              required
              placeholder="המייל שלכם"
              className="flex-1 rounded-full px-5 py-3 text-ink bg-white outline-none focus:ring-2 focus:ring-white"
              dir="ltr"
            />
            <button
              type="submit"
              className="rounded-full bg-ink text-bg px-6 py-3 font-semibold hover:bg-bg hover:text-ink transition-colors"
            >
              הצטרפו
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Stat({
  Icon,
  value,
  label,
}: {
  Icon: typeof Globe2;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid place-items-center w-11 h-11 rounded-full bg-accent-soft text-accent-ink">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-display text-2xl font-bold leading-none">
          {value}
        </div>
        <div className="text-xs uppercase tracking-wider text-ink-muted mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}

function TipCard({
  Icon,
  title,
  text,
}: {
  Icon: typeof Globe2;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-elev p-6 hover:shadow-md transition-shadow">
      <div className="grid place-items-center w-12 h-12 rounded-full bg-accent-soft text-accent-ink mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="text-ink-soft text-[15px] leading-relaxed">{text}</p>
    </div>
  );
}
