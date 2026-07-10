"use client";

import { useMemo, useState } from "react";
import { Ban, Clock3, Loader2, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SlotCell, type SlotVisualState } from "@/components/board/SlotCell";
import { WeekPicker } from "@/components/board/WeekPicker";
import {
  approveBooking,
  createManualBlock,
  deleteBooking,
  setBookingStatus,
} from "@/lib/data";
import type { Booking, Slot } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { upcomingSundays, weekLabel } from "@/lib/weeks";

interface BoardControlProps {
  slots: Slot[];
  bookings: Booking[];
  onChanged: () => Promise<void>;
}

export function BoardControl({ slots, bookings, onChanged }: BoardControlProps) {
  const weeks = useMemo(() => upcomingSundays(4), []);
  const [week, setWeek] = useState(weeks[0]);
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [manualName, setManualName] = useState("");
  const [busy, setBusy] = useState(false);

  const weekBookings = useMemo(
    () => bookings.filter((b) => b.week_start_date === week),
    [bookings, week]
  );

  const taken = useMemo(() => {
    const map = new Map<string, Booking>();
    for (const b of weekBookings)
      if (b.status === "approved" || b.status === "blocked") map.set(b.slot_id, b);
    return map;
  }, [weekBookings]);

  const pendingBySlot = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of weekBookings) {
      if (b.status !== "pending") continue;
      map.set(b.slot_id, [...(map.get(b.slot_id) ?? []), b]);
    }
    return map;
  }, [weekBookings]);

  function stateFor(slot: Slot): SlotVisualState {
    if (taken.has(slot.id)) return "occupied";
    if (pendingBySlot.has(slot.id)) return "pending";
    return "free";
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    try {
      await action();
      await onChanged();
      setActiveSlot(null);
      setManualName("");
    } finally {
      setBusy(false);
    }
  }

  const activeBooking = activeSlot ? taken.get(activeSlot.id) : undefined;
  const activePending = activeSlot ? (pendingBySlot.get(activeSlot.id) ?? []) : [];

  const stats = {
    taken: taken.size,
    pending: [...pendingBySlot.values()].reduce((n, arr) => n + arr.length, 0),
    free: slots.length - taken.size,
  };

  return (
    <div>
      <WeekPicker weeks={weeks} selected={week} onSelect={setWeek} dark={false} />

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
        <Badge variant="muted">סה״כ משבצות: {slots.length}</Badge>
        <Badge variant="success">פנויות: {stats.free}</Badge>
        <Badge variant="destructive">תפוסות: {stats.taken}</Badge>
        <Badge variant="warning">בקשות ממתינות: {stats.pending}</Badge>
      </div>

      <div className="mt-6 rounded-3xl bg-charcoal p-3 shadow-xl sm:p-5">
        {slots.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-slate-400">
            <Loader2 className="ml-2 h-6 w-6 animate-spin text-coral" />
            טוען את הלוח…
          </div>
        ) : (
          <div
            className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-2.5"
            style={{ gridAutoFlow: "dense", gridAutoRows: "minmax(60px, 5rem)" }}
          >
            {slots.map((slot) => (
              <SlotCell
                key={slot.id}
                slot={slot}
                state={stateFor(slot)}
                booking={taken.get(slot.id)}
                previewUrl={taken.get(slot.id)?.ad_image_url || null}
                onClick={() => setActiveSlot(slot)}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        לחיצה על משבצת פותחת את אפשרויות הניהול שלה — חסימה ידנית, שחרור או טיפול בבקשות.
      </p>

      {/* דיאלוג פעולות משבצת */}
      <Dialog open={activeSlot !== null} onClose={() => setActiveSlot(null)}>
        {activeSlot && (
          <div className="p-6 sm:p-7">
            <h3 className="text-lg font-extrabold text-charcoal">
              משבצת {activeSlot.slot_code} — {activeSlot.display_name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              שבוע של {weekLabel(week)} · {formatPrice(activeSlot.base_price)} לשבוע ·{" "}
              {activeSlot.width_multiplier}×{activeSlot.height_multiplier}
            </p>

            {activeBooking ? (
              <div className="mt-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Badge variant={activeBooking.status === "blocked" ? "muted" : "destructive"}>
                    {activeBooking.status === "blocked" ? "חסומה ידנית" : "משוריינת (מאושרת)"}
                  </Badge>
                  <p className="mt-2 font-bold text-charcoal">{activeBooking.business_name}</p>
                  {activeBooking.contact_name !== "שריון ידני" && (
                    <p className="mt-0.5 text-sm text-slate-500">
                      {activeBooking.contact_name} ·{" "}
                      <span dir="ltr">{activeBooking.contact_phone}</span>
                    </p>
                  )}
                  {activeBooking.ad_image_url && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={activeBooking.ad_image_url}
                      alt={activeBooking.business_name}
                      className="mt-3 max-h-44 w-full rounded-xl object-contain bg-white"
                    />
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="mt-4 w-full"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      if (activeBooking.status === "blocked") {
                        await deleteBooking(activeBooking.id);
                      } else {
                        await setBookingStatus(activeBooking.id, "rejected");
                      }
                    })
                  }
                >
                  {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Unlock className="h-5 w-5" />}
                  שחרר את המשבצת
                </Button>
              </div>
            ) : (
              <div className="mt-5 space-y-5">
                {activePending.length > 0 && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-amber-700">
                      <Clock3 className="h-4 w-4" />
                      {activePending.length} בקשות ממתינות למשבצת זו
                    </p>
                    <ul className="mt-3 space-y-2">
                      {activePending.map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center justify-between gap-3 rounded-xl bg-white p-2.5"
                        >
                          <span className="min-w-0 truncate text-sm font-semibold text-charcoal">
                            {p.business_name}
                          </span>
                          <span className="flex shrink-0 gap-1.5">
                            <Button
                              size="sm"
                              variant="success"
                              disabled={busy}
                              onClick={() => run(() => approveBooking(p))}
                            >
                              אשר
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={busy}
                              onClick={() => run(() => setBookingStatus(p.id, "rejected"))}
                            >
                              דחה
                            </Button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <Label htmlFor="manual-name">
                    חסימה / שריון ידני (ללקוח קבוע)
                  </Label>
                  <Input
                    id="manual-name"
                    className="mt-1.5"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="שם העסק או סיבת החסימה"
                  />
                  <Button
                    variant="secondary"
                    className="mt-3 w-full"
                    disabled={busy || !manualName.trim()}
                    onClick={() =>
                      run(() => createManualBlock(activeSlot.id, week, manualName.trim()))
                    }
                  >
                    {busy ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Ban className="h-5 w-5" />
                    )}
                    חסום / שריין את המשבצת
                  </Button>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                    המשבצת תוצג באתר הציבורי כ"סגור" לשבוע הנבחר.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
