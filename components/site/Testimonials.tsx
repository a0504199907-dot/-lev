import { Reveal } from "./Reveal";

const QUOTES = [
  {
    quote:
      "בשבוע הראשון על הלוח קיבלתי יותר טלפונים מאשר בחודש של פרסום בפייסבוק. אנשים פשוט רואים אותך כל יום במעלית.",
    name: "יוסי",
    business: "מוסך יוסי",
    initial: "י",
    color: "bg-cyan-700",
  },
  {
    quote:
      "לקחתי משבצת פרימיום לחג — המכירות קפצו ב-40%. עכשיו אני קבוע על הלוח, זה הפך לחלק מהעסק.",
    name: "אבי",
    business: "פיצה האחים",
    initial: "א",
    color: "bg-coral-700",
  },
  {
    quote:
      "הכי אהבתי שראיתי בדיוק איך המודעה תיראה עוד לפני ששילמתי. שלוש דקות מהטלפון וסגרתי משבצת.",
    name: "דנה",
    business: "מספרת שיק",
    initial: "ד",
    color: "bg-violet-700",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-right">
            <p className="text-sm font-bold tracking-wide text-coral">
              עסקים שכבר על השולחן
            </p>
            <h2 className="mt-2 font-display text-6xl leading-none text-charcoal sm:text-7xl">
              השכונה כבר מדברת.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 130}
              className={i === 1 ? "md:translate-y-8" : ""}
            >
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-coral/30 hover:shadow-xl hover:shadow-coral/5">
                <span
                  aria-hidden
                  className="font-display text-7xl leading-[0.6] text-coral"
                >
                  ”
                </span>
                <blockquote className="mt-4 flex-1 leading-relaxed text-slate-600">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-extrabold text-white ${q.color}`}
                  >
                    {q.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-charcoal">
                      {q.name}
                    </span>
                    <span className="block text-xs text-slate-500">{q.business}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
