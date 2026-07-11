"use client";

/**
 * הדמיה חיה ומוקטנת של הלוח הפיזי — לב ה-Hero.
 * המשבצות "נתלות" אחת אחרי השנייה, וחלקן מתמלאות במודעות צבעוניות.
 */

interface MiniSlot {
  span: string;
  delay: number;
  ad?: { name: string; bg: string };
  highlight?: boolean;
}

const SLOTS: MiniSlot[] = [
  { span: "col-span-2 row-span-2", delay: 100, ad: { name: "פיצה האחים", bg: "linear-gradient(135deg,#F04314,#C6350D)" } },
  { span: "col-span-2 row-span-1", delay: 220, ad: { name: "מוסך יוסי", bg: "linear-gradient(135deg,#0E7490,#155E75)" } },
  { span: "col-span-1 row-span-1", delay: 320 },
  { span: "col-span-1 row-span-1", delay: 400, ad: { name: "פרחים", bg: "linear-gradient(135deg,#BE185D,#9D174D)" } },
  { span: "col-span-2 row-span-1", delay: 500, highlight: true },
  { span: "col-span-1 row-span-1", delay: 580, ad: { name: "מספרה", bg: "linear-gradient(135deg,#7C3AED,#5B21B6)" } },
  { span: "col-span-1 row-span-1", delay: 660 },
  { span: "col-span-2 row-span-1", delay: 740, ad: { name: "נגריית עץ טוב", bg: "linear-gradient(135deg,#B45309,#92400E)" } },
  { span: "col-span-1 row-span-1", delay: 820, ad: { name: "חומוס", bg: "linear-gradient(135deg,#15803D,#166534)" } },
  { span: "col-span-1 row-span-1", delay: 900 },
  { span: "col-span-1 row-span-1", delay: 980, ad: { name: "קפה", bg: "linear-gradient(135deg,#334155,#1E293B)" } },
  { span: "col-span-1 row-span-1", delay: 1060 },
];

export function MiniBoard() {
  return (
    <div
      className="relative mx-auto w-full max-w-md animate-float-y"
      style={{ perspective: "1200px" }}
    >
      {/* תגיות מרחפות */}
      <div className="absolute -top-5 -left-3 z-20 rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-charcoal shadow-2xl sm:-left-8">
        +12,000 חשיפות בשבוע 👀
      </div>
      <div className="absolute -bottom-5 -right-2 z-20 rounded-2xl bg-coral px-4 py-2.5 text-xs font-bold text-white shadow-2xl shadow-coral/40 sm:-right-6">
        הלוח מתחלף כל יום ראשון
      </div>

      <div
        className="rounded-[1.75rem] border border-white/15 bg-charcoal-deep/80 p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur"
        style={{ transform: "rotateY(-10deg) rotateX(5deg)" }}
      >
        {/* "ברגים" של לוח פיזי */}
        <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-white/25" />

        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-display text-2xl leading-none text-white">
            הלוח של השבוע
          </span>
          <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
            ● חי עכשיו
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5" style={{ gridAutoRows: "3.4rem" }}>
          {SLOTS.map((slot, i) => (
            <div
              key={i}
              className={`${slot.span} animate-slot-pop relative overflow-hidden rounded-lg`}
              style={{ animationDelay: `${slot.delay}ms` }}
            >
              {slot.ad ? (
                <div
                  className="flex h-full w-full items-end p-1.5"
                  style={{ background: slot.ad.bg }}
                >
                  <span className="text-[10px] font-bold leading-tight text-white/95">
                    {slot.ad.name}
                  </span>
                </div>
              ) : slot.highlight ? (
                <div className="slot-selected flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-coral bg-coral/15">
                  <span className="text-[11px] font-extrabold text-coral">
                    המשבצת שלך?
                  </span>
                  <span className="text-[9px] font-semibold text-coral-200">
                    פנויה עכשיו
                  </span>
                </div>
              ) : (
                <div className="h-full w-full rounded-lg border-2 border-dashed border-white/15 bg-white/[0.04]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
