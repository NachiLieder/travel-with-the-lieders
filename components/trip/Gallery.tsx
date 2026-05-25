"use client";

import { useState } from "react";
import { RowsPhotoAlbum, type Photo } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import {
  Captions,
  Counter,
  Fullscreen,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { captionFromFilename } from "@/lib/captions";

export type GalleryImage = {
  id: string;
  filename?: string;
  src: string;
  large?: string;
  medium?: string;
  thumb?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
};

/**
 * Editorial photo gallery.
 *
 * Layout: justified rows (Google Photos / Flickr style). Each row shares a
 * uniform target height; each photo's width scales to preserve its native
 * aspect ratio. Mixed portraits + landscapes coexist gracefully.
 *
 * Lightbox: full-screen viewer with zoom, fullscreen, counter, captions
 * (RTL-aware), keyboard nav, and touch swipe on mobile.
 *
 * The image element uses srcSet across our 4 generated widths
 * (320/640/1280/1920) so the browser picks the right one per viewport
 * and device pixel ratio.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  const resolveCaption = (img: GalleryImage): string =>
    (img.caption && img.caption.trim()) ||
    (img.filename ? captionFromFilename(img.filename) : "") ||
    "";

  const resolveAlt = (img: GalleryImage): string =>
    (img.altText && img.altText.trim()) || resolveCaption(img);

  // Photo album entries — drive the justified layout.
  const photos: Photo[] = images.map((img) => ({
    src: img.large ?? img.src,
    width: img.width ?? 1600,
    height: img.height ?? 1200,
    alt: resolveAlt(img),
    title: resolveCaption(img),
    srcSet: [
      img.thumb && { src: img.thumb, width: 320, height: 0 },
      img.medium && { src: img.medium, width: 640, height: 0 },
      img.large && { src: img.large, width: 1280, height: 0 },
      { src: img.src, width: img.width ?? 1920, height: img.height ?? 1280 },
    ].filter(Boolean) as { src: string; width: number; height: number }[],
  }));

  // Lightbox slides — full-resolution.
  const slides = images.map((img) => ({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: resolveAlt(img),
    title: resolveCaption(img),
    description: resolveCaption(img),
  }));

  return (
    <>
      {/* Full-bleed editorial frame */}
      <section
        className="my-12 sm:my-16"
        aria-label="גלריית תמונות מהטיול"
        dir="ltr"
      >
        <RowsPhotoAlbum
          photos={photos}
          spacing={6}
          targetRowHeight={(width) =>
            width < 500 ? 180 : width < 900 ? 240 : 320
          }
          rowConstraints={{ singleRowMaxHeight: 460 }}
          onClick={({ index }) => setOpenIndex(index)}
          componentsProps={{
            image: {
              loading: "lazy",
              className:
                "rounded-lg sm:rounded-xl object-cover transition-transform duration-500 will-change-transform hover:scale-[1.015]",
              style: { cursor: "zoom-in" },
            },
          }}
        />
      </section>

      <Lightbox
        open={openIndex >= 0}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter, Fullscreen, Zoom]}
        captions={{
          descriptionTextAlign: "end",
          descriptionMaxLines: 3,
          showToggle: true,
        }}
        counter={{
          container: { style: { top: 0, bottom: "unset" } },
        }}
        carousel={{ finite: false, padding: "16px" }}
        animation={{ fade: 280, swipe: 400 }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleClickMaxStops: 2,
        }}
        styles={{
          root: {
            "--yarl__color_backdrop": "rgba(10, 8, 6, 0.94)",
            "--yarl__slide_captions_container_background":
              "rgba(0, 0, 0, 0.55)",
            "--yarl__slide_title_font_family":
              "var(--font-display), Georgia, serif",
            "--yarl__slide_title_font_weight": "600",
          },
        }}
      />
    </>
  );
}
