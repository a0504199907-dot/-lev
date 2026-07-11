"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  ImagePlus,
  Info,
  Loader2,
  MousePointerClick,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlotCell, type SlotVisualState } from "@/components/board/SlotCell";
import { WeekPicker } from "@/components/board/WeekPicker";
import { createBooking, getOccupiedBookings, getSlots, isDemoActive } from "@/lib/data";
import type { Booking, Slot } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { upcomingSundays, weekLabel } from "@/lib/weeks";

const SIZE_LABEL: Record<string, string> = {
  "2x2": "משבצת ענק — 2×2",
  "2x1": "משבצת רוחבית — 2×1",
  "1x1": "משבצת סטנדרט — 1×1",
};

export function BoardSection() {
  const weeks = useMemo(() => upcomingSundays(4), []);
  const [week, setWeek] = useState(weeks[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [occupied, setOccupied] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successSlot, setSuccessSlot] = useState<Slot | null>(null);
  // הדמיות שנשלחו לאישור בסשן הנוכחי: `${שבוע}:${משבצת}` → כתובת התמונה
  const [submitted, setSubmitted] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSlots().then((s) => {
      setSlots(s);
      setDemo(isDemoActive());
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getOccupiedBookings(week).then((rows) => {
      if (cancelled) return;
      setOccupied(rows);
      setDemo(isDemoActive());
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [week]);

  const occupiedBySlot = useMemo(() => {
    const map = new Map<string, Booking>();
    for (const b of occupied) map.set(b.slot_id, b);
    return map;
  }, [occupied]);

  // אם המשבצת הנבחרת נתפסה בשבוע החדש — ביטול הבחירה
  useEffect(() => {
    if (selectedId && occupiedBySlot.has(selectedId)) setSelectedId(null);
  }, [occupiedBySlot, selectedId]);

  const selectedSlot = slots.find((s) => s.id === selectedId) ?? null;

  function handleSlotClick(slot: Slot) {
    if (occupiedBySlot.has(slot.id)) return;
    setSuccessSlot(null);
    setError(null);
    setSelectedId((prev) => (prev === slot.id ? null : slot.id));
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(
        () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        150
      );
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !file) {
      setError("נא לבחור משבצת ולהעלות את קובץ המודעה.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createBooking({
        week_start_date: week,
        slot_id: selectedSlot.id,
        business_name: businessName.trim(),
        contact_name: contactName.trim(),
        contact_phone: phone.trim(),
        file,
      });
      setSubmitted((prev) => ({
        ...prev,
        [`${week}:${selectedSlot.id}`]: previewUrl ?? "",
      }));
      setSuccessSlot(selectedSlot);
      setSelectedId(null);
      setPreviewUrl(null);
      setFile(null);
      setBusinessName("");
      setContactName("");
      setPhone("");
      setDemo(isDemoActive());
    } catch {
      setError("אירעה שגיאה בשליחת הבקשה. נסו שוב בעוד רגע.");
    } finally {
      setSubmitting(false);
    }
  }

  function slotState(slot: Slot): SlotVisualState {
    if (occupiedBySlot.has(slot.id)) return "occupied";
    if (submitted[`${week}:${slot.id}`] !== undefined) return "submitted";
    if (slot.id === selectedId) return "selected";
    return "free";
  }

  function slotPreview(slot: Slot): string | null {
    const b = occupiedBySlot.get(slot.id);
    if (b) return b.ad_image_url || null;
    const sent = submitted[`${week}:${slot.id}`];
    if (sent !== undefined) return sent || null;
    if (slot.id === selectedId) return previewUrl;
    return null;
  }

  const sizeKey = selectedSlot
    ? `${selectedSlot.width_multiplier}x${selectedSlot.height_multiplier}`
    : "";

  return (
    <section id="board" className="bg-charcoal py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mx-auto max-w-2xl text-slate-400">
            לחצו על משבצת פנויה, העלו את הגרפיקה שלכם — ותראו בזמן אמת בדיוק
            איך המודעה שלכם תיראה על הלוח לצד שאר המפרסמים.
          </p>
        </div>

        <div className="mt-8">
          <WeekPicker weeks={weeks} selected={week} onSelect={setWeek} />
        </div>

        {/* מקרא */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-dashed border-white/30 bg-white/5" />
            פנוי לשריון
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-slate-600" />
            סגור (תפוס)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-coral bg-coral/20" />
            הבחירה שלכם
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-amber-400 bg-amber-400/20" />
            נשלח לאישור
          </span>
        </div>

        {demo && (
          <p className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Info className="h-3.5 w-3.5 text-coral" />
            מצב הדגמה — הנתונים נשמרים מקומית בדפדפן בלבד
          </p>
        )}

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* הלוח */}
          <div className="min-w-0 flex-1">
            <div className="rounded-3xl border border-white/10 bg-charcoal-deep/60 p-3 shadow-2xl sm:p-5">
              {loading || slots.length === 0 ? (
                <div className="flex h-72 items-center justify-center text-slate-400">
                  <Loader2 className="ml-2 h-6 w-6 animate-spin text-coral" />
                  טוען את מצב הלוח…
                </div>
              ) : (
                <div
                  className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-2.5"
                  style={{ gridAutoFlow: "dense", gridAutoRows: "minmax(64px, 5.5rem)" }}
                >
                  {slots.map((slot) => (
                    <SlotCell
                      key={slot.id}
                      slot={slot}
                      state={slotState(slot)}
                      booking={occupiedBySlot.get(slot.id)}
                      previewUrl={slotPreview(slot)}
                      onClick={
                        occupiedBySlot.has(slot.id)
                          ? undefined
                          : () => handleSlotClick(slot)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              המחירים הם לשבוע פרסום מלא בכל נקודות ההפצה של הלוח.
            </p>
          </div>

          {/* טופס השריון */}
          <div ref={formRef} className="w-full scroll-mt-24 lg:w-96 lg:shrink-0">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
              {successSlot ? (
                <div className="py-6 text-center animate-pop-in">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
                  <h3 className="mt-4 text-xl font-extrabold text-charcoal">
                    הבקשה נשלחה בהצלחה!
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    ביקשתם לשריין את משבצת{" "}
                    <b className="text-charcoal">{successSlot.slot_code}</b> לשבוע
                    של {weekLabel(week)}. נחזור אליכם לאישור סופי ותשלום — ואז
                    המשבצת ננעלת לטובתכם.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSuccessSlot(null)}
                  >
                    שריון משבצת נוספת
                  </Button>
                </div>
              ) : !selectedSlot ? (
                <div className="py-10 text-center">
                  <MousePointerClick className="mx-auto h-12 w-12 text-coral" />
                  <h3 className="mt-4 text-lg font-extrabold text-charcoal">
                    בחרו משבצת פנויה בלוח
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    לחיצה על משבצת פנויה תפתח כאן את טופס השריון המהיר — כולל
                    הדמיה חיה של המודעה שלכם על הלוח.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="animate-fade-in">
                  <h3 className="text-lg font-extrabold text-charcoal">
                    שריון מהיר של משבצת {selectedSlot.slot_code}
                  </h3>

                  {/* סיכום החבילה */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-coral/30 bg-coral-50 px-4 py-3">
                    <div className="text-sm">
                      <p className="font-bold text-charcoal">
                        {SIZE_LABEL[sizeKey] ?? selectedSlot.display_name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        שבוע של {weekLabel(week)}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-xl font-extrabold text-coral">
                        {formatPrice(selectedSlot.base_price)}
                      </p>
                      <p className="text-[11px] text-slate-500">לשבוע</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="business">שם העסק</Label>
                      <Input
                        id="business"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="לדוגמה: פיצה האחים"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact">שם בעל העסק</Label>
                      <Input
                        id="contact"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="שם מלא"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">טלפון</Label>
                      <Input
                        id="phone"
                        required
                        type="tel"
                        inputMode="tel"
                        dir="ltr"
                        className="text-right"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="050-1234567"
                      />
                    </div>

                    {/* העלאת מודעה + הדמיה חיה */}
                    <div className="space-y-1.5">
                      <Label htmlFor="ad-file">המודעה שלכם (תמונה או לוגו)</Label>
                      <label
                        htmlFor="ad-file"
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 p-3 transition-colors hover:border-coral hover:bg-coral-50"
                      >
                        {previewUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={previewUrl}
                            alt="תצוגה מקדימה של המודעה"
                            className="h-16 w-16 shrink-0 rounded-xl object-cover shadow"
                          />
                        ) : (
                          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                            <ImagePlus className="h-7 w-7 text-slate-400" />
                          </span>
                        )}
                        <span className="text-sm">
                          <span className="block font-semibold text-charcoal">
                            {file ? file.name : "לחצו להעלאת קובץ"}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                            {previewUrl ? (
                              <span className="flex items-center gap-1 font-semibold text-coral">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                ההדמיה כבר מוצגת בלוח למעלה!
                              </span>
                            ) : (
                              "ברגע שתעלו — תראו את המודעה חיה בתוך הלוח"
                            )}
                          </span>
                        </span>
                      </label>
                      <input
                        id="ad-file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="mt-5 w-full" size="lg" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        שולח את הבקשה…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        שלח בקשה לשריון משבצת
                      </>
                    )}
                  </Button>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
                    השריון הסופי מאושר על ידי צוות הלוח לאחר בדיקת המודעה. ללא
                    חיוב עד לאישור.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
