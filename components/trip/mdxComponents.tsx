import { Sparkles, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { Gallery } from "./Gallery";
import { DayCard } from "./DayCard";

/** Callout for "what worked with kids". */
export function KidsWorked({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-2xl border border-leaf/30 bg-leaf/10 p-5">
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
    <aside className="my-6 rounded-2xl border border-sun/40 bg-sun/10 p-5">
      <div
        className="flex items-center gap-2 mb-2 font-bold"
        style={{ color: "var(--color-sun)" }}
      >
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
    <aside className="my-4 rounded-xl border-r-4 border-accent bg-accent-soft/40 px-4 py-3">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 mt-0.5 text-accent shrink-0" />
        <div className="text-ink-soft text-[15px] leading-relaxed [&>p]:mb-1 last:[&>p]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}

/**
 * The full set of components mapped into the MDX renderer.
 * Tight margins, narrow-text rules, and proper table styling.
 */
export const mdxComponents = {
  KidsWorked,
  KidsHard,
  TipBox,
  DayCard,
  Gallery,
  // Headings
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display text-2xl sm:text-3xl font-bold mt-10 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display text-xl sm:text-2xl font-bold mt-6 mb-2"
      {...props}
    />
  ),
  // Paragraph / list
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[17px] leading-[1.8] text-ink-soft mb-3" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pr-5 marker:text-accent space-y-1 mb-3 text-ink-soft text-[17px]"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pr-5 marker:text-accent space-y-1 mb-3 text-ink-soft text-[17px]"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-r-4 border-accent pr-4 my-4 text-ink-soft italic text-lg"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent underline underline-offset-2 hover:no-underline"
      {...props}
    />
  ),
  // Tables — modern, bordered, total row highlights via `<strong>`
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-line bg-bg-elev shadow-sm">
      <table
        className="w-full border-collapse text-[15px] sm:text-base text-ink-soft"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-accent-soft/40 text-ink font-semibold text-right"
      {...props}
    />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className="divide-y divide-line [&>tr:has(strong)]:bg-accent-soft/30 [&>tr:has(strong)]:text-ink [&>tr:has(strong)]:font-semibold"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-bg/60 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-3 sm:px-4 py-2.5 text-right" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-3 sm:px-4 py-2.5" {...props} />
  ),
};
