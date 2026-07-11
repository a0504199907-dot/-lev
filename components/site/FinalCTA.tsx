import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep py-28">
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
        className="absolute left-1/2 top-1/2 h-96 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/20 blur-[130px]"
      />
      <Reveal className="relative">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-7xl leading-[0.9] text-white sm:text-8xl lg:text-9xl">
            הלוח הבא נתלה
            <br />
            <span className="text-coral">ביום ראשון.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            המשבצות הטובות נחטפות ראשונות. שריינו עכשיו — ותנו לכל השכונה לפגוש
            את העסק שלכם השבוע.
          </p>
          <Link href="/board" className="mt-10 inline-block">
            <Button size="lg" className="group px-12 text-lg">
              לבחירת משבצת בלוח החי
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-slate-500">
            ללא התחייבות וללא חיוב — עד שאנחנו מאשרים את השריון יחד איתכם.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
