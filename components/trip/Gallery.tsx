"use client";

import { RowsPhotoAlbum, type Photo as AlbumPhoto } from "react-photo-album";
import "react-photo-album/rows.css";

import { captionFromFilename } from "@/lib/captions";
import { useTripPhotosOptional, type TripPhoto } from "./useTripPhotosOptional";

export type GalleryImage = TripPhoto;

/**
 * Editorial photo gallery — justified rows layout. Photos preserve their
 * native aspect ratio inside uniform-height rows (Google Photos / Flickr feel).
 *
 * Clicks dispatch to the trip-wide shared lightbox from <TripPhotosProvider>.
 * If for any reason there's no provider in scope, the component falls back to
 * a no-op (won't crash).
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const ctx = useTripPhotosOptional();

  if (!images || images.length === 0) return null;

  const resolveCaption = (img: GalleryImage): string =>
    (img.caption && img.caption.trim()) ||
    (img.filename ? captionFromFilename(img.filename) : "") ||
    "";

  const photos: AlbumPhoto[] = images.map((img) => ({
    src: img.large ?? img.src,
    width: img.width ?? 1600,
    height: img.height ?? 1200,
    alt: img.altText ?? resolveCaption(img),
    title: resolveCaption(img),
    srcSet: [
      img.thumb && { src: img.thumb, width: 320, height: 0 },
      img.medium && { src: img.medium, width: 640, height: 0 },
      img.large && { src: img.large, width: 1280, height: 0 },
      { src: img.src, width: img.width ?? 1920, height: img.height ?? 1280 },
    ].filter(Boolean) as { src: string; width: number; height: number }[],
  }));

  return (
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
        onClick={({ index }) => ctx?.open(index)}
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
  );
}
