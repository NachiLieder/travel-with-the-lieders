export const metadata = {
  title: "עלינו",
  description: "אנחנו משפחת לידר. מי אנחנו ולמה אנחנו כותבים את הבלוג הזה.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16 prose-stronger">
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
        אנחנו משפחת לידר
      </h1>
      <p className="text-lg text-ink-soft leading-relaxed mb-4">
        אירית, נחי, היילי ודניאל. אנחנו אוהבים לטייל, לגלות מקומות חדשים — קרובים ורחוקים —
        ולעזור לעוד משפחות לגלות עולם. הבלוג הזה הוא דרך לארגן את כל מה שלמדנו
        ולשתף אותו עם משפחות אחרות שמתכננות טיולים.
      </p>
      <p className="text-lg text-ink-soft leading-relaxed">
        אנחנו לא בלוג שיווקי — מה שאנחנו ממליצים זה מה שעשינו, ומה שלא אהבנו —
        אנחנו אומרים. נתראה בדרכים.
      </p>
    </div>
  );
}
