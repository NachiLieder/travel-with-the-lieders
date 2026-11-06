import type { ReactNode } from "react";

/**
 * Two-voice section heading (Blonde Abroad "featured FROM THE BLOG"):
 * a larger script word beside a thin, lightly tracked serif phrase.
 * Hebrew script via Playpen Sans Hebrew; pass `latin` for an English
 * script word (Allura) instead.
 */
export function SectionTitle({
  script,
  children,
  latin = false,
  level = 2,
  className = "",
  id,
}: {
  script: string;
  children: ReactNode;
  latin?: boolean;
  level?: 1 | 2;
  className?: string;
  id?: string;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag
      id={id}
      className={`two-voice text-center text-xl sm:text-2xl md:text-[1.7rem] ${className}`}
    >
      <span className={latin ? "script" : "script-he"} dir={latin ? "ltr" : undefined}>
        {script}
      </span>{" "}
      {children}
    </Tag>
  );
}
