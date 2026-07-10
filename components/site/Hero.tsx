import { ArrowDown, Building2, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { icon: Eye, value: "12,000+", label: "חשיפות שבועיות" },
  { icon: Building2, value: "40+", label: "בניינים ומרכזים" },
  { icon: Users, value: "אלפי", label: "משפחות באזור" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep">
      {/* רקע דקורטיבי — רשת משבצות עדינה */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-coral/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-1.5 text-sm font-semibold text-coral-300 animate-fade-up">
          הלוח הפיזי שכל השכונה רואה
        </span>

        <h1 className="text-4xl font-extrabold leading-tight text-white animate-fade-up sm:text-5xl lg:text-6xl">
          החשיפה הפיזית{" "}
          <span className="text-coral">הכי חזקה</span>
          <br />
          לעסק שלך באזור.
        </h1>

        <h2 className="mx-auto mt-6 max-w-2xl text-lg font-normal leading-relaxed text-slate-300 animate-fade-up sm:text-xl">
          שולחן עסקים אחד שמגיע ישירות לעיניים של אלפי משפחות וקונים
          פוטנציאליים מדי שבוע — בבניינים ובמרכזים הכי חמים באזור.
        </h2>

        <div className="mt-10 animate-fade-up">
          <a href="#board">
            <Button size="lg" className="group">
              שריין מקום בלוח הקרוב
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 animate-fade-up">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <Icon className="mx-auto mb-2 h-5 w-5 text-coral" />
              <dd className="text-xl font-extrabold text-white sm:text-2xl">
                {value}
              </dd>
              <dt className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
