import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const PACKAGES = [
  {
    name: "סטנדרט",
    size: "1×1",
    price: 140,
    desc: "נוכחות שבועית חכמה במחיר של ארוחת צהריים ביום.",
    features: ["משבצת 1×1 בלוח", "שבוע פרסום מלא", "בכל נקודות ההפצה"],
    grid: [["a"]],
    featured: false,
  },
  {
    name: "רוחבית בולטת",
    size: "2×1",
    price: 260,
    desc: "רוחב כפול שתופס את העין — הבחירה של רוב העסקים.",
    features: ["משבצת רחבה 2×1", "בולטות כפולה בלוח", "עדיפות במיקום", "שבוע פרסום מלא"],
    grid: [["a", "a"]],
    featured: true,
  },
  {
    name: "פרימיום ענק",
    size: "2×2",
    price: 480,
    desc: "המודעה הכי גדולה על הלוח. אי אפשר לפספס אתכם.",
    features: ["משבצת ענק 2×2", "המיקום הדומיננטי בלוח", "מקסימום חשיפה", "שבוע פרסום מלא"],
    grid: [
      ["a", "a"],
      ["a", "a"],
    ],
    featured: false,
  },
];

/** ממחיש את הפרופורציה האמיתית של המשבצת על הלוח */
function SizeDiagram({ grid, featured }: { grid: string[][]; featured: boolean }) {
  return (
    <div className="grid w-fit grid-cols-2 gap-1" dir="rtl">
    {[0, 1].map((row) =>
      [0, 1].map((col) => {
        const active = grid[row]?.[col] !== undefined;
        return (
          <span
            key={`${row}-${col}`}
            className={`h-7 w-7 rounded-md sm:h-8 sm:w-8 ${
              active
                ? featured
                  ? "bg-white"
                  : "bg-coral"
                : "border-2 border-dashed border-current opacity-20"
            }`}
          />
        );
      })
    )}
    </div>
  );
}

export function Packages() {
  return (
    <section id="packages" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-right">
            <p className="text-sm font-bold tracking-wide text-coral">
              מחיר אחד, שבוע שלם, אפס הפתעות
            </p>
            <h2 className="mt-2 font-display text-6xl leading-none text-charcoal sm:text-7xl">
              בוחרים גודל. עולים ללוח.
            </h2>
            <p className="mt-4 max-w-lg text-slate-500">
              הגדלים בדיוק כמו על הלוח הפיזי — מה שאתם רואים כאן זה מה שהשכונה
              רואה על הקיר.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 130} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                  pkg.featured
                    ? "bg-charcoal text-white shadow-2xl shadow-charcoal/40"
                    : "border border-slate-200 bg-white text-charcoal shadow-sm hover:shadow-xl"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 right-8 rounded-full bg-coral px-4 py-1.5 text-xs font-extrabold text-white shadow-lg shadow-coral/40">
                    הכי נבחרת ⭐
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold">{pkg.name}</h3>
                    <p
                      className={`mt-0.5 text-sm font-semibold ${
                        pkg.featured ? "text-slate-400" : "text-slate-400"
                      }`}
                    >
                      גודל {pkg.size} על הלוח
                    </p>
                  </div>
                  <SizeDiagram grid={pkg.grid} featured={pkg.featured} />
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-7xl leading-none">
                    ₪{pkg.price}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      pkg.featured ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    / שבוע
                  </span>
                </div>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    pkg.featured ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {pkg.desc}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.featured ? "bg-coral" : "bg-coral/10"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${pkg.featured ? "text-white" : "text-coral"}`}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/board" className="mt-8 block">
                  <Button
                    className="w-full"
                    size="lg"
                    variant={pkg.featured ? "default" : "outline"}
                  >
                    בחירת משבצת {pkg.size}
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
