"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Inbox,
  Loader2,
  Phone,
  User,
  XCircle,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { approveBooking, setBookingStatus } from "@/lib/data";
import type { Booking, Slot } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { weekLabel } from "@/lib/weeks";

interface PendingQueueProps {
  slots: Slot[];
  bookings: Booking[];
  onChanged: () => Promise<void>;
}

export function PendingQueue({ slots, bookings, onChanged }: PendingQueueProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);

  const pending = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "pending")
        .sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [bookings]
  );

  const slotById = useMemo(() => {
    const map = new Map<string, Slot>();
    for (const s of slots) map.set(s.id, s);
    return map;
  }, [slots]);

  async function act(booking: Booking, approve: boolean) {
    setBusyId(booking.id);
    try {
      if (approve) await approveBooking(booking);
      else await setBookingStatus(booking.id, "rejected");
      await onChanged();
    } finally {
      setBusyId(null);
    }
  }

  if (pending.length === 0) {
    return (
      <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
        <Inbox className="mx-auto h-14 w-14 text-slate-300" />
        <h2 className="mt-4 text-xl font-extrabold text-charcoal">
          אין בקשות ממתינות 🎉
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          כשעסק ישלח בקשת שריון חדשה — היא תופיע כאן לאישור או דחייה.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-charcoal">
        תור בקשות לאישור ({pending.length})
      </h2>

      {pending.map((booking) => {
        const slot = slotById.get(booking.slot_id);
        const busy = busyId === booking.id;
        return (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* תצוגה מקדימה ענקית של המודעה */}
                <button
                  onClick={() => setZoomUrl(booking.ad_image_url)}
                  className="group relative block w-full shrink-0 bg-charcoal md:w-80"
                  aria-label="הגדלת המודעה"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={booking.ad_image_url}
                    alt={`המודעה של ${booking.business_name}`}
                    className="h-56 w-full object-contain md:h-full md:min-h-64"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-charcoal-deep/0 transition-colors group-hover:bg-charcoal-deep/40">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </button>

                {/* פרטי הבקשה */}
                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-extrabold text-charcoal">
                        {booking.business_name}
                      </h3>
                      <Badge variant="warning">ממתין לאישור</Badge>
                    </div>

                    <dl className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-coral" />
                        {booking.contact_name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-coral" />
                        <a
                          dir="ltr"
                          href={`tel:${booking.contact_phone}`}
                          className="hover:text-coral"
                        >
                          {booking.contact_phone}
                        </a>
                      </div>
                    </dl>

                    <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      <p className="font-bold text-charcoal">
                        משבצת {slot?.slot_code ?? "?"} — {slot?.display_name}
                        {slot && (
                          <span className="mr-2 font-semibold text-coral">
                            {formatPrice(slot.base_price)} לשבוע
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-slate-500">
                        לשבוע של {weekLabel(booking.week_start_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="success"
                      disabled={busy}
                      onClick={() => act(booking, true)}
                    >
                      {busy ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                      אשר שריון — נעל את המשבצת
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-600 hover:border-red-600"
                      disabled={busy}
                      onClick={() => act(booking, false)}
                    >
                      <XCircle className="h-5 w-5" />
                      דחה ושחרר את המשבצת
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* חלון הגדלה */}
      <Dialog open={zoomUrl !== null} onClose={() => setZoomUrl(null)} className="sm:max-w-3xl">
        {zoomUrl && (
          <div className="bg-charcoal p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomUrl}
              alt="תצוגה מקדימה מוגדלת של המודעה"
              className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
