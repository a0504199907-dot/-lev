"use client";

import { Lock, Sparkles, Clock3 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Booking, Slot } from "@/lib/types";

export type SlotVisualState =
  | "free"
  | "selected"
  | "occupied"
  | "submitted"
  | "pending"; // pending משמש רק בדשבורד הניהול

interface SlotCellProps {
  slot: Slot;
  state: SlotVisualState;
  booking?: Booking | null;
  previewUrl?: string | null;
  onClick?: () => void;
  showPrice?: boolean;
}

export function SlotCell({
  slot,
  state,
  booking,
  previewUrl,
  onClick,
  showPrice = true,
}: SlotCellProps) {
  const big = slot.width_multiplier > 1 || slot.height_multiplier > 1;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{
        gridColumn: `span ${slot.width_multiplier}`,
        gridRow: `span ${slot.height_multiplier}`,
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center overflow-hidden rounded-xl text-center transition-all duration-300",
        state === "free" &&
          "border-2 border-dashed border-white/20 bg-white/[0.04] hover:border-coral hover:bg-coral/10 hover:shadow-lg hover:shadow-coral/20 cursor-pointer",
        state === "selected" &&
          "slot-selected border-2 border-coral bg-coral/15 cursor-pointer",
        state === "occupied" && "border border-white/10 bg-slate-700/80",
        state === "submitted" && "border-2 border-amber-400/70 bg-slate-700/60",
        state === "pending" &&
          "border-2 border-amber-400/70 bg-amber-500/10 cursor-pointer",
        !onClick && "cursor-default"
      )}
    >
      {/* מודעה קיימת / הדמיה חיה */}
      {previewUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={booking?.business_name ?? "הדמיית המודעה שלך"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {state === "selected" && (
            <span className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold text-white shadow">
              <Sparkles className="h-3 w-3" />
              ההדמיה שלך
            </span>
          )}
          {state === "submitted" && (
            <span className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
              <Clock3 className="h-3 w-3" />
              ממתין לאישור
            </span>
          )}
          {state === "occupied" && (
            <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal-deep/90 to-transparent px-2 pb-1.5 pt-5 text-[11px] font-bold text-white">
              {booking?.business_name}
            </span>
          )}
        </>
      ) : state === "occupied" ? (
        <span className="flex flex-col items-center gap-1 px-1 text-slate-400">
          <Lock className={cn("opacity-70", big ? "h-5 w-5" : "h-3.5 w-3.5")} />
          <span className={cn("font-bold", big ? "text-sm" : "text-[10px]")}>
            סגור
          </span>
          {big && booking?.business_name && (
            <span className="max-w-full truncate text-[11px] text-slate-500">
              {booking.business_name}
            </span>
          )}
        </span>
      ) : state === "pending" ? (
        <span className="flex flex-col items-center gap-0.5 px-1 text-amber-300">
          <Clock3 className={cn(big ? "h-5 w-5" : "h-3.5 w-3.5")} />
          <span className={cn("font-bold", big ? "text-sm" : "text-[9px]")}>
            ממתין
          </span>
        </span>
      ) : (
        <span className="flex flex-col items-center gap-0.5 px-1">
          <span
            className={cn(
              "font-extrabold tracking-wide",
              state === "selected" ? "text-coral" : "text-slate-300",
              big ? "text-lg" : "text-xs"
            )}
          >
            {slot.slot_code}
          </span>
          {showPrice && (
            <span
              className={cn(
                "font-semibold text-slate-400 transition-colors group-hover:text-coral-200",
                big ? "text-sm" : "text-[10px]"
              )}
            >
              {formatPrice(slot.base_price)}
            </span>
          )}
          {big && state === "free" && (
            <span className="mt-1 rounded-full bg-coral/0 px-2 py-0.5 text-[11px] font-bold text-coral opacity-0 transition-all group-hover:bg-coral group-hover:text-white group-hover:opacity-100">
              פנוי לשריון
            </span>
          )}
        </span>
      )}
    </button>
  );
}
