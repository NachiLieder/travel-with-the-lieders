/**
 * Filename → caption / alt-text derivation.
 *
 * Convention for photo filenames in `content/trips/<slug>/photos/`:
 *   NN-descriptive-subject.jpg
 *
 * Examples:
 *   01-hero.jpg                    → "Hero"
 *   04-peles-castle-exterior.jpg   → "Peles Castle Exterior"
 *   12-day3-bran-castle.jpg        → "Day 3 — Bran Castle"
 *   wix-07.jpg                     → "" (no semantic content, returns empty)
 *
 * The gallery.json `caption` field always wins; this only provides a default
 * when the user hasn't supplied one.
 */

const STOPWORDS = new Set([
  "img", "photo", "image", "dsc", "pic", "raw", "wix",
]);

const DAY_RE = /^day(\d+)$/i;

/**
 * Derive a human-friendly caption from a filename stem.
 * Returns "" if the stem looks like pure-noise (e.g. `wix-07`, `DSC_1234`,
 * `IMG_5921`) — the caller can decide whether to fall back to an empty string
 * or leave it blank for the editor.
 */
export function captionFromFilename(filename: string): string {
  if (!filename) return "";
  // Strip extension
  let stem = filename.replace(/\.[a-z0-9]+$/i, "");
  // Strip leading sequence prefix: "04-", "001-", etc.
  stem = stem.replace(/^\d+[-_]/, "");
  if (!stem) return "";

  // Split into tokens
  const tokens = stem.split(/[-_\s]+/).filter(Boolean);
  if (tokens.length === 0) return "";

  // Filter out pure-noise tokens; if everything is noise, give up
  const cleaned = tokens.filter((t) => !STOPWORDS.has(t.toLowerCase()));
  if (cleaned.length === 0) return "";
  // If after cleaning we only have digits / single chars, give up
  const meaningful = cleaned.filter(
    (t) => !/^\d+$/.test(t) && t.length > 1
  );
  if (meaningful.length === 0) return "";

  // Day-N expansion: "day3" → "Day 3 —"
  const out: string[] = [];
  let prefix = "";
  for (const t of cleaned) {
    const dayMatch = t.match(DAY_RE);
    if (dayMatch) {
      prefix = `Day ${dayMatch[1]} — `;
      continue;
    }
    out.push(titleCaseToken(t));
  }
  return prefix + out.join(" ");
}

function titleCaseToken(t: string): string {
  if (!t) return t;
  // Keep all-caps acronyms (≤3 chars) as-is
  if (/^[A-Z]{1,3}$/.test(t)) return t;
  return t[0].toUpperCase() + t.slice(1).toLowerCase();
}

/**
 * Default alt text for accessibility/SEO.
 * Same derivation as caption — alt text and caption are usually equivalent
 * for photo galleries.
 */
export function altTextFromFilename(filename: string): string {
  return captionFromFilename(filename);
}
