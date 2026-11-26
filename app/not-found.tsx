import Link from "next/link";

export const metadata = {
  title: "העמוד לא נמצא",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24 text-center">
      <p
        dir="ltr"
        className="text-script leading-none text-6xl mb-6"
        style={{ fontFamily: "var(--font-script)" }}
      >
        404
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
        נראה שהלכנו לאיבוד
      </h1>
      <p className="text-lg text-ink-soft mb-10">
        העמוד שחיפשתם לא קיים או שעבר למקום אחר. אולי אחד מאלה?
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/trips" className="btn-flat">
          לכל הטיולים
        </Link>
        <Link href="/" className="btn-flat btn-flat-outline">
          לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
