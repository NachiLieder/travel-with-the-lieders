import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { getCountriesByRegion } from "@/lib/countries";

/**
 * Footer: opaque cream band (it sits over the photo backdrop on inner pages,
 * and small text needs a solid surface), tracked link columns, a script
 * sign-off. Social links are still placeholders.
 */
export function SiteFooter() {
  const regions = getCountriesByRegion();
  const col = "text-[11px] tracking-[0.14em] text-ink-muted mb-4";
  const link =
    "block py-1.5 text-[13px] tracking-[0.04em] text-ink-soft hover:text-accent transition-colors duration-100";

  return (
    <footer className="mt-20 paper-panel border-t border-hair">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-10">
        <p
          dir="ltr"
          className="text-center text-script leading-none text-5xl md:text-6xl mb-12"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Lieders
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={col}>עלינו</h3>
            <p className="text-[13px] leading-6 text-ink-soft font-light max-w-xs">
              בלוג טיולים אמיתי של משפחת לידר: אירית, נחי, היילי ודניאל.
              אוהבים לטייל, לגלות מקומות חדשים ולעזור למשפחות לגלות עולם.
            </p>
          </div>

          <div>
            <h3 className={col}>מפת אתר</h3>
            <ul>
              <li><Link href="/trips" className={link}>כל הטיולים</Link></li>
              <li><Link href="/countries" className={link}>יעדים</Link></li>
              <li><Link href="/tips" className={link}>טיפים לטיול עם ילדים</Link></li>
              <li><Link href="/about" className={link}>קצת עלינו</Link></li>
              <li><Link href="/newsletter" className={link}>ניוזלטר</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={col}>יעדים</h3>
            {regions.map((r) => (
              <div key={r.id} className="mb-3">
                <p className="text-[12px] text-ink-muted">{r.heName}</p>
                <ul>
                  {r.countries.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/countries/${c.slug}`} className={link}>
                        {c.heName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className={col}>עקבו אחרינו</h3>
            <div className="flex items-center gap-4 text-ink-muted">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-accent hover:scale-110 transition"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-accent hover:scale-110 transition"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@example.com"
                aria-label="Email"
                className="hover:text-accent hover:scale-110 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 pt-6 border-t border-hair text-center text-[11px] tracking-[0.12em] text-ink-muted">
          © {new Date().getFullYear()} Travel with the Lieders · כל הזכויות שמורות
        </p>
      </div>
    </footer>
  );
}
