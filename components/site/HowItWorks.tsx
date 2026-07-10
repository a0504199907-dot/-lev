import { MousePointerClick, Upload, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "בוחרים משבצת",
    text: "מסמנים משבצת פנויה בלוח החי ובוחרים את השבוע המתאים לכם.",
  },
  {
    icon: Upload,
    title: "מעלים את המודעה",
    text: "מעלים גרפיקה או לוגו — ורואים בזמן אמת בדיוק איך המודעה תיראה על הלוח.",
  },
  {
    icon: CheckCircle2,
    title: "מאשרים ותולים",
    text: "אנחנו מאשרים את השריון, מדפיסים — והמודעה שלכם עולה ללוחות בכל האזור.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-charcoal sm:text-4xl">
            איך זה עובד?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            שלושה צעדים פשוטים — והעסק שלכם על השולחן של כולם.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
            >
              <span className="absolute right-6 top-6 text-5xl font-black text-slate-200 transition-colors group-hover:text-coral/20">
                {i + 1}
              </span>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10 transition-colors group-hover:bg-coral group-hover:shadow-lg group-hover:shadow-coral/30">
                <Icon className="h-7 w-7 text-coral transition-colors group-hover:text-white" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
