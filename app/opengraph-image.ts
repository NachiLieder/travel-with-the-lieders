import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";

export const alt = "Travel With The Lieders — טיולים משפחתיים מהעולם";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/jpeg";

export default function Image() {
  return renderShareImage();
}
