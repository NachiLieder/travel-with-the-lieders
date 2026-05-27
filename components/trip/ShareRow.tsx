"use client";

import { useEffect, useState } from "react";
import { Share2, Mail } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

type Props = {
  title: string;
  slug: string;
};

const PROD_BASE = "https://travelwiththelieders.com";

/**
 * Share buttons. Reading `window.location.origin` directly in render would
 * cause a server/client hydration mismatch (server uses the prod URL,
 * client uses localhost in dev). We render with the prod URL on the server
 * AND on the client's initial render, then swap to `window.location.origin`
 * after mount via useEffect — same value at hydration time, no mismatch.
 */
export function ShareRow({ title, slug }: Props) {
  const fallback = `${PROD_BASE}/trips/${slug}`;
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/trips/${slug}`);
    }
  }, [slug]);

  const encoded = encodeURIComponent(`${title} — ${url}`);

  return (
    <section className="my-12 rounded-2xl bg-accent-soft/50 p-6 text-center">
      <h3 className="font-display text-xl font-bold mb-3">
        אהבתם? שתפו עם המשפחה
      </h3>
      <p className="text-ink-soft text-sm mb-4">
        אם הפוסט עזר לכם — תעבירו לחבר/ה שמתכננים טיול דומה. זה לוקח שנייה ועוזר לנו המון.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <a
          href={`https://wa.me/?text=${encoded}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          <FacebookIcon className="w-4 h-4" />
          Facebook
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encoded}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          <Mail className="w-4 h-4" />
          מייל
        </a>
        <button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({ title, url }).catch(() => {});
            } else if (
              typeof navigator !== "undefined" &&
              navigator.clipboard
            ) {
              navigator.clipboard.writeText(url);
            }
          }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
        >
          <Share2 className="w-4 h-4" />
          העתק קישור
        </button>
      </div>
    </section>
  );
}
