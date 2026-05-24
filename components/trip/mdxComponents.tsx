import { Sparkles, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { Gallery } from "./Gallery";

/** Callout used inside MDX for "what worked with kids". */
export function KidsWorked({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-leaf/30 bg-leaf/10 p-5">
      <div className="flex items-center gap-2 mb-2 text-leaf font-bold">
        <Sparkles className="w-5 h-5" />
        <span>מה עבד עם הילדים</span>
      </div>
      <div className="text-ink-soft leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0">
        {children}
      </div>
    </aside>
  );
}

/** Callout for "what was hard or surprising". */
export function KidsHard({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-sun/40 bg-sun/10 p-5">
      <div className="flex items-center gap-2 mb-2 text-sun font-bold" style={{ color: "var(--color-sun)" }}>
        <AlertTriangle className="w-5 h-5" />
        <span>מה היה קשה או הפתיע</span>
      </div>
      <div className="text-ink-soft leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0">
        {children}
      </div>
    </aside>
  );
}

/** Practical tip box. */
export function TipBox({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-xl border-r-4 border-accent bg-accent-soft/40 px-4 py-3">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 mt-0.5 text-accent shrink-0" />
        <div className="text-ink-soft text-[15px] leading-relaxed [&>p]:mb-1 last:[&>p]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}

/** One day card, used inside the itinerary section. */
export function DayCard({
  day,
  title,
  children,
}: {
  day: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-line bg-bg-elev p-5 hover:shadow-md transition-shadow">
      <header className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-3xl font-bold text-accent">
          {day}
        </span>
        <span className="text-xs uppercase tracking-wider text-ink-muted">
          יום {day}
        </span>
        <h3 className="font-display text-lg font-bold flex-1">{title}</h3>
      </header>
      <div className="text-ink-soft leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0">
        {children}
      </div>
    </article>
  );
}

/** The full set of components mapped into the MDX renderer. */
export const mdxComponents = {
  KidsWorked,
  KidsHard,
  TipBox,
  DayCard,
  Gallery,
  // Style the markdown primitives Hebrew-friendly
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-2xl sm:text-3xl font-bold mt-12 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-xl sm:text-2xl font-bold mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[17px] leading-[1.9] text-ink-soft mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pr-5 marker:text-accent space-y-1 mb-4 text-ink-soft text-[17px]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pr-5 marker:text-accent space-y-1 mb-4 text-ink-soft text-[17px]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-r-4 border-accent pr-4 my-6 text-ink-soft italic text-lg" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent underline underline-offset-2 hover:no-underline" {...props} />
  ),
};
