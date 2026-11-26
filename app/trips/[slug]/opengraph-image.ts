import { getAllTrips, getTripBySlug } from "@/lib/trips";
import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";

export const alt = "Travel With The Lieders";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  return renderShareImage(trip?.heroImage || trip?.coverImage || undefined);
}
