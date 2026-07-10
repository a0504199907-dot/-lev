"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ExternalLink,
  Inbox,
  Info,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllBookings, getArchives, getSlots, isDemoActive } from "@/lib/data";
import type { ArchiveIssue, Booking, Slot } from "@/lib/types";
import { BoardControl } from "./BoardControl";
import { PendingQueue } from "./PendingQueue";
import { ArchiveManager } from "./ArchiveManager";

type Tab = "board" | "queue" | "archive";

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("board");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [archives, setArchives] = useState<ArchiveIssue[]>([]);
  const [demo, setDemo] = useState(false);

  const refresh = useCallback(async () => {
    const [s, b, a] = await Promise.all([
      getSlots(),
      getAllBookings(),
      getArchives(),
    ]);
    setSlots(s);
    setBookings(b);
    setArchives(a);
    setDemo(isDemoActive());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const pendingCount = useMemo(
    () => bookings.filter((b) => b.status === "pending").length,
    [bookings]
  );

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin-login");
    router.refresh();
  }

  const TABS: Array<{ id: Tab; label: string; icon: typeof LayoutGrid; badge?: number }> = [
    { id: "board", label: "בקרת לוח", icon: LayoutGrid },
    { id: "queue", label: "בקשות לאישור", icon: Inbox, badge: pendingCount },
    { id: "archive", label: "ארכיון מהדורות", icon: Archive },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* פס עליון */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal-deep">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral">
              <LayoutGrid className="h-5 w-5 text-white" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold text-white">
                ניהול Business Table
              </span>
              <span className="block text-[11px] text-slate-400">
                דשבורד המנהל של הלוח השבועי
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">לאתר הציבורי</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">יציאה</span>
            </button>
          </div>
        </div>

        {/* טאבים */}
        <div className="mx-auto flex max-w-6xl gap-1 px-4 sm:px-6">
          {TABS.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "relative flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors",
                tab === id
                  ? "bg-slate-100 text-charcoal"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1.5 text-[11px] font-bold text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {demo && (
          <p className="mb-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs text-slate-500 shadow-sm">
            <Info className="h-3.5 w-3.5 text-coral" />
            מצב הדגמה — הפעולות נשמרות מקומית בדפדפן בלבד
          </p>
        )}

        {tab === "board" && (
          <BoardControl slots={slots} bookings={bookings} onChanged={refresh} />
        )}
        {tab === "queue" && (
          <PendingQueue slots={slots} bookings={bookings} onChanged={refresh} />
        )}
        {tab === "archive" && (
          <ArchiveManager archives={archives} onChanged={refresh} />
        )}
      </main>
    </div>
  );
}
