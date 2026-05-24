import Link from "next/link";
import { Compass } from "lucide-react";

const NAV = [
  { href: "/", label: "בית" },
  { href: "/trips", label: "טיולים" },
  { href: "/countries", label: "מדינות" },
  { href: "/tips", label: "טיפים" },
  { href: "/about", label: "עלינו" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-line">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-8 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="עמוד הבית"
        >
          <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-white">
            <Compass className="w-5 h-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Travel with the Lieders
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-[15px] font-medium text-ink-soft">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/newsletter"
          className="hidden sm:inline-flex items-center rounded-full bg-ink text-bg px-4 py-2 text-sm font-semibold hover:bg-accent transition-colors"
        >
          הצטרפו לניוזלטר
        </Link>
      </nav>
    </header>
  );
}
