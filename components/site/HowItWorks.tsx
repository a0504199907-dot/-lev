import { MousePointerClick, Upload, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "בוחרים משבצת",
    text: "נכנסים ללוח החי, רואים בדיוק מה פנוי השבוע — ומסמנים את המשבצת והגודל שמתאימים לכם.",
  },
  {
    icon: Upload,
    title: "מעלים את המודעה",
    text: "מעלים גרפיקה או לוגו, ורואים הדמיה חיה של המודעה שלכם על הלוח — לצד שאר המפרסמים, עוד לפני שהתחייבתם.",
  },
  {
    icon: CheckCircle2,
    title: "מאשרים — ותולים",
    text: "אנחנו מאשרים את השריון, מדפיסים את הלוח — וביום ראשון המודעה שלכם כבר תלויה בכל נקודות ההפצה.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-wide text-coral">
                פשוט כמו שזה נשמע
              </p>
              <h2 className="mt-2 font-display text-6xl leading-none text-charcoal sm:text-7xl">
                איך זה עובד?
              </h2>
            </div>
            <p className="max-w-sm pb-1 text-slate-500">
              משלוש דקות מול המסך — לשבוע שלם על הקיר של כל השכונה.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {/* קו מחבר */}
          <div
            aria-hidden
            className="absolute right-[12%] left-[12%] top-10 hidden border-t-2 border-dashed border-slate-200 sm:block"
          />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 130}>
              <div className="relative">
                <div className="flex items-end gap-4">
                  <span className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-charcoal shadow-xl">
                    <Icon className="h-9 w-9 text-coral" />
                  </span>
                  <span className="font-display text-8xl leading-[0.75] text-slate-100">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-charcoal">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
