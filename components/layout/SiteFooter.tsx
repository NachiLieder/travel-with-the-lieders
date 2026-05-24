import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-bg-elev/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold mb-2">
            Travel with the Lieders
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            בלוג טיולים אמיתי של משפחת לידר — אירית, נחי, היילי ודניאל.
            אוהבים לטייל, לגלות מקומות חדשים ולעזור למשפחות לגלות עולם.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-muted mb-3">
            מפת אתר
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/trips" className="hover:text-accent">כל הטיולים</Link></li>
            <li><Link href="/countries" className="hover:text-accent">מדינות</Link></li>
            <li><Link href="/tips" className="hover:text-accent">טיפים לטיול עם ילדים</Link></li>
            <li><Link href="/about" className="hover:text-accent">קצת עלינו</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-muted mb-3">
            עקבו אחרינו
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              className="grid place-items-center w-10 h-10 rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              className="grid place-items-center w-10 h-10 rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="grid place-items-center w-10 h-10 rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            © {new Date().getFullYear()} Travel with the Lieders. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
