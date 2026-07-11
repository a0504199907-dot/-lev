import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniBoard } from "./MiniBoard";

const STATS = [
  { value: "12,000+", label: "חשיפות שבועיות" },
  { value: "40+", label: "בניינים ומרכזים" },
  { value: "יום ראשון", label: "לוח חדש נתלה" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep">
      {/* רשת לוח עדינה + הילת קורל */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-coral/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-coral/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pb-32 lg:pt-24">
        {/* טקסט — פותח מימין */}
        <div className="text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-1.5 text-sm font-bold text-coral-300 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            לוח העסקים הפיזי של האזור
          </span>

          <h1 className="mt-6 font-display text-[4rem] leading-[0.92] text-white animate-fade-up sm:text-[5.5rem] lg:text-[6.75rem]">
            החשיפה הפיזית
            <br />
            <span className="text-coral">הכי חזקה</span> לעסק
            <br />
            שלך באזור.
          </h1>

          <h2 className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-slate-300 animate-fade-up sm:text-xl">
            שולחן עסקים אחד שמגיע ישירות לעיניים של אלפי משפחות וקונים
            פוטנציאליים מדי שבוע — בבניינים ובמרכזים הכי חמים באזור.
          </h2>

          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up">
            <Link href="/board">
              <Button size="lg" className="group text-lg">
                שריין מקום בלוח הקרוב
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>
            <a
              href="#how"
              className="text-sm font-semibold text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              איך זה עובד?
            </a>
          </div>

          <dl className="mt-14 flex max-w-lg items-stretch justify-between gap-4 border-t border-white/10 pt-6 animate-fade-up">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <dd className="font-display text-4xl leading-none text-white sm:text-5xl">
                  {value}
                </dd>
                <dt className="mt-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* הלוח המיני החי */}
        <div className="relative animate-fade-in lg:pl-4">
          <MiniBoard />
          <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-coral" />
            נתלה פיזית בלובי הבניינים, במכולות ובמרכזים המסחריים
          </p>
        </div>
      </div>
    </section>
  );
}
