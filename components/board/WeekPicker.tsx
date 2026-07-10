"use client";

import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { weekLabel } from "@/lib/weeks";

interface WeekPickerProps {
  weeks: string[];
  selected: string;
  onSelect: (week: string) => void;
  dark?: boolean;
}

export function WeekPicker({ weeks, selected, onSelect, dark = true }: WeekPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {weeks.map((week, i) => {
        const active = week === selected;
        return (
          <button
            key={week}
            onClick={() => onSelect(week)}
            className={cn(
              "flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              active
                ? "border-coral bg-coral text-white shadow-lg shadow-coral/30"
                : dark
                  ? "border-white/15 bg-white/5 text-slate-300 hover:border-coral/60 hover:text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-coral/60 hover:text-charcoal"
            )}
          >
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span className="text-right leading-tight">
              <span className="block text-[11px] font-medium opacity-75">
                {i === 0 ? "השבוע הקרוב" : `בעוד ${i} שבועות`}
              </span>
              יום ראשון, {weekLabel(week)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
