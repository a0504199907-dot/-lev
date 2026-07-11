import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { BoardSection } from "@/components/site/BoardSection";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "בחירת משבצת בלוח | Business Table",
  description:
    "הלוח החי של Business Table — בחרו משבצת פנויה, העלו את המודעה שלכם וראו הדמיה חיה על הלוח לפני כולם.",
};

export default function BoardPage() {
  return (
    <>
      <Header />
      <main className="bg-charcoal">
        {/* פס פתיחה של העמוד */}
        <div className="border-b border-white/10 bg-charcoal-deep">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right sm:px-6 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-coral"
            >
              <ArrowRight className="h-4 w-4" />
              חזרה לדף הבית
            </Link>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] text-white sm:text-8xl">
              בחירת משבצת <span className="text-coral">בלוח החי</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              כך נראה הלוח הפיזי שנתלה השבוע ברחבי האזור. משבצת פנויה? היא שלכם
              בשלוש דקות.
            </p>
          </div>
        </div>

        <BoardSection />
      </main>
      <Footer />
    </>
  );
}
