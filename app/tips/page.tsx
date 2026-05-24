export const metadata = {
  title: "טיפים לטיולים עם ילדים",
  description: "טיפים פרקטיים מהשטח לתכנון, אריזה, תקציב, וטיולים עם ילדים.",
};

export default function TipsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
        טיפים שעובדים בשטח
      </h1>
      <p className="text-lg text-ink-soft">
        בקרוב — אוסף הטיפים שלנו לתכנון, אריזה, תקציב וניהול ציפיות בטיולים עם ילדים.
      </p>
    </div>
  );
}
