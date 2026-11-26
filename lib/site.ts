/**
 * Site-wide constants.
 *
 * SITE_URL resolves, in order, to:
 *  1. NEXT_PUBLIC_SITE_URL, if set explicitly;
 *  2. the project's production domain on Vercel (VERCEL_PROJECT_PRODUCTION_URL),
 *     which switches to the custom domain automatically once one is connected;
 *  3. localhost for local development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const INSTAGRAM_URL = "https://www.instagram.com/iritlieder";

/** Shown when a page has no photo of its own (home page hero). */
export const DEFAULT_SHARE_IMAGE =
  "/trips/dominican-republic-2024/gallery/13-cayo-levantado-beach.jpg";
