import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

import { DEFAULT_SHARE_IMAGE } from "@/lib/site";

/** Link-preview size used by WhatsApp, Facebook and others. */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * Crops a photo from /public to a 1200x630 JPEG for link previews.
 * Kept well under 300 KB so WhatsApp reliably shows it.
 * Falls back to the default share photo when the path is missing.
 */
export async function renderShareImage(publicPath?: string): Promise<Response> {
  const candidate = publicPath ? join(process.cwd(), "public", publicPath) : "";
  const file =
    candidate && existsSync(candidate)
      ? candidate
      : join(process.cwd(), "public", DEFAULT_SHARE_IMAGE);

  const jpeg = await sharp(await readFile(file))
    .rotate()
    .resize(SHARE_IMAGE_SIZE.width, SHARE_IMAGE_SIZE.height, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
