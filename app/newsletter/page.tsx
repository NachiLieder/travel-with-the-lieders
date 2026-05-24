export const metadata = {
  title: "ניוזלטר",
  description: "הירשמו לניוזלטר שלנו.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 text-center">
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
        קבלו את הטיולים אלינו במייל
      </h1>
      <p className="text-lg text-ink-soft mb-8">
        פעם בחודש. טיול חדש, טיפים אמיתיים, ואפס ספאם.
      </p>
      <form action="#" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder="המייל שלכם"
          dir="ltr"
          className="flex-1 rounded-full bg-bg-elev border border-line px-5 py-3 outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-accent text-white px-6 py-3 font-semibold hover:bg-accent-ink transition-colors"
        >
          הצטרפו
        </button>
      </form>
    </div>
  );
}
