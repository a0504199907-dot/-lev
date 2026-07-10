import {
  Coffee,
  Croissant,
  Dumbbell,
  Flower2,
  Hammer,
  Pizza,
  Scissors,
  ShoppingBasket,
  Sparkles,
  Wrench,
} from "lucide-react";

const CLIENTS = [
  { icon: Pizza, name: "פיצה האחים" },
  { icon: Wrench, name: "מוסך יוסי" },
  { icon: Scissors, name: "מספרת שיק" },
  { icon: Coffee, name: "קפה של בוקר" },
  { icon: Hammer, name: "נגריית עץ טוב" },
  { icon: Flower2, name: "פרחי השכונה" },
  { icon: Dumbbell, name: "סטודיו פיט" },
  { icon: ShoppingBasket, name: "מכולת הפינה" },
  { icon: Croissant, name: "מאפיית סבתא" },
  { icon: Sparkles, name: "ניקיון פלוס" },
];

export function ClientsMarquee() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <p className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
        העסקים שכבר על השולחן — מדי שבוע
      </p>
      <div className="relative overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="marquee-track" style={{ transform: "translateX(-50%)" }}>
          {doubled.map(({ icon: Icon, name }, i) => (
            <span
              key={`${name}-${i}`}
              dir="rtl"
              className="mx-4 flex shrink-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 text-sm font-bold text-slate-600 transition-colors hover:border-coral/40 hover:text-charcoal"
            >
              <Icon className="h-5 w-5 text-coral" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
