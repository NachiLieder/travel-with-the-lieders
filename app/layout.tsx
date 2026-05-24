import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travelwiththelieders.com"),
  title: {
    default: "Travel With The Lieders — טיולים משפחתיים מהעולם",
    template: "%s | Travel With The Lieders",
  },
  description:
    "בלוג טיולים משפחתי אמיתי. סיפורים מהדרך, מסלולים מומלצים, וטיפים שעבדו לנו בפועל — לטיולים עם ילדים בארץ ובעולם.",
  openGraph: {
    title: "Travel With The Lieders",
    description:
      "בלוג טיולים משפחתי אמיתי — סיפורים מהדרך, מסלולים וטיפים לטיולים עם ילדים.",
    type: "website",
    locale: "he_IL",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
