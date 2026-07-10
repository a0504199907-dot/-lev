"use client";

/**
 * חנות נתוני הדגמה מקומית (localStorage) — משמשת כשהאתר רץ במצב דמו
 * (NEXT_PUBLIC_DEMO=1) או כשה-Supabase אינו זמין. מאפשרת לחוות את כל
 * הזרימות — שריון, אישור, ארכיון — בלי חיבור חיצוני.
 */

import type { ArchiveIssue, Booking, Slot } from "./types";
import { toISODate, upcomingSundays } from "./weeks";

const KEY = "business-table-demo-v1";

interface DemoDB {
  slots: Slot[];
  bookings: Booking[];
  archives: ArchiveIssue[];
}

function adSvg(name: string, bg: string, fg = "#ffffff") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect width="480" height="480" rx="24" fill="${bg}"/><circle cx="240" cy="180" r="64" fill="${fg}" opacity="0.18"/><text x="240" y="196" text-anchor="middle" font-family="Arial" font-size="52" fill="${fg}" opacity="0.9">★</text><text x="240" y="300" text-anchor="middle" font-family="Arial" font-size="40" font-weight="bold" fill="${fg}">${name}</text><text x="240" y="352" text-anchor="middle" font-family="Arial" font-size="22" fill="${fg}" opacity="0.75">03-1234567</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function archiveSvg(title: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="440"><rect width="600" height="440" fill="#1E293B"/><rect x="24" y="24" width="552" height="392" rx="12" fill="#334155"/><rect x="48" y="48" width="240" height="160" rx="8" fill="#FF5F38"/><rect x="312" y="48" width="240" height="72" rx="8" fill="#475569"/><rect x="312" y="136" width="240" height="72" rx="8" fill="#475569"/><rect x="48" y="232" width="112" height="112" rx="8" fill="#475569"/><rect x="176" y="232" width="112" height="112" rx="8" fill="#475569"/><rect x="312" y="232" width="240" height="112" rx="8" fill="#64748B"/><text x="300" y="400" text-anchor="middle" font-family="Arial" font-size="26" font-weight="bold" fill="#F8FAFC">${title}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function seed(): DemoDB {
  const mk = (
    code: string,
    name: string,
    w: number,
    h: number,
    price: number
  ): Slot => ({
    id: `slot-${code}`,
    slot_code: code,
    display_name: name,
    width_multiplier: w,
    height_multiplier: h,
    base_price: price,
  });

  const slots: Slot[] = [
    mk("P1", "פרימיום ענק", 2, 2, 480),
    mk("P2", "פרימיום ענק", 2, 2, 480),
    mk("W1", "רוחבית בולטת", 2, 1, 260),
    mk("W2", "רוחבית בולטת", 2, 1, 260),
    mk("W3", "רוחבית בולטת", 2, 1, 260),
    mk("W4", "רוחבית בולטת", 2, 1, 260),
    ...Array.from({ length: 16 }, (_, i) =>
      mk(`S${i + 1}`, "סטנדרט", 1, 1, 140)
    ),
  ];

  const weeks = upcomingSundays(4);
  const now = new Date().toISOString();
  const demoAds: Array<[string, string, string]> = [
    ["slot-P1", "פיצה האחים", "#C6350D"],
    ["slot-W2", "מוסך יוסי", "#0E7490"],
    ["slot-S3", "מספרת שיק", "#7C3AED"],
    ["slot-S8", "חומוס הבית", "#15803D"],
    ["slot-W4", "נגריית עץ טוב", "#B45309"],
  ];

  const bookings: Booking[] = demoAds.map(([slotId, name, color], i) => ({
    id: `demo-booking-${i}`,
    created_at: now,
    week_start_date: weeks[0],
    slot_id: slotId,
    business_name: name,
    contact_name: "לקוח לדוגמה",
    contact_phone: "050-0000000",
    ad_image_url: adSvg(name, color),
    status: "approved",
  }));

  bookings.push({
    id: "demo-pending-1",
    created_at: now,
    week_start_date: weeks[0],
    slot_id: "slot-S12",
    business_name: "קפה של בוקר",
    contact_name: "דנה לוי",
    contact_phone: "052-1112233",
    ad_image_url: adSvg("קפה של בוקר", "#334155"),
    status: "pending",
  });

  const today = new Date();
  const archives: ArchiveIssue[] = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - 7 * (i + 1));
    const iso = toISODate(d);
    const title = `לוח העסקים השבועי — מהדורה ${42 - i}`;
    return {
      id: `demo-archive-${i}`,
      published_date: iso,
      title,
      pdf_url: "#",
      preview_image_url: archiveSvg(title),
    };
  });

  return { slots, bookings, archives };
}

function load(): DemoDB {
  if (typeof window === "undefined") return seed();
  const raw = window.localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as DemoDB;
    } catch {
      /* נתונים פגומים — נאתחל מחדש */
    }
  }
  const db = seed();
  window.localStorage.setItem(KEY, JSON.stringify(db));
  return db;
}

function save(db: DemoDB) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(db));
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function uid() {
  return `demo-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export const demoStore = {
  getSlots(): Slot[] {
    return load().slots;
  },

  getBookings(filter?: { week?: string; statuses?: string[] }): Booking[] {
    let rows = load().bookings;
    if (filter?.week) rows = rows.filter((b) => b.week_start_date === filter.week);
    if (filter?.statuses) rows = rows.filter((b) => filter.statuses!.includes(b.status));
    return rows;
  },

  async createBooking(input: {
    week_start_date: string;
    slot_id: string;
    business_name: string;
    contact_name: string;
    contact_phone: string;
    file: File;
  }): Promise<Booking> {
    const db = load();
    const booking: Booking = {
      id: uid(),
      created_at: new Date().toISOString(),
      week_start_date: input.week_start_date,
      slot_id: input.slot_id,
      business_name: input.business_name,
      contact_name: input.contact_name,
      contact_phone: input.contact_phone,
      ad_image_url: await fileToDataUrl(input.file),
      status: "pending",
    };
    db.bookings.push(booking);
    save(db);
    return booking;
  },

  setStatus(id: string, status: Booking["status"]) {
    const db = load();
    const b = db.bookings.find((x) => x.id === id);
    if (b) {
      b.status = status;
      if (status === "approved") {
        for (const other of db.bookings) {
          if (
            other.id !== id &&
            other.slot_id === b.slot_id &&
            other.week_start_date === b.week_start_date &&
            other.status === "pending"
          ) {
            other.status = "rejected";
          }
        }
      }
    }
    save(db);
  },

  insertManual(slot_id: string, week: string, business_name: string): Booking {
    const db = load();
    const booking: Booking = {
      id: uid(),
      created_at: new Date().toISOString(),
      week_start_date: week,
      slot_id,
      business_name,
      contact_name: "שריון ידני",
      contact_phone: "-",
      ad_image_url: "",
      status: "blocked",
    };
    db.bookings.push(booking);
    save(db);
    return booking;
  },

  deleteBooking(id: string) {
    const db = load();
    db.bookings = db.bookings.filter((b) => b.id !== id);
    save(db);
  },

  getArchives(): ArchiveIssue[] {
    return [...load().archives].sort((a, b) =>
      b.published_date.localeCompare(a.published_date)
    );
  },

  async createArchive(input: {
    title: string;
    published_date: string;
    pdfFile: File;
    previewFile: File;
  }): Promise<ArchiveIssue> {
    const db = load();
    const issue: ArchiveIssue = {
      id: uid(),
      title: input.title,
      published_date: input.published_date,
      pdf_url: await fileToDataUrl(input.pdfFile),
      preview_image_url: await fileToDataUrl(input.previewFile),
    };
    db.archives.push(issue);
    save(db);
    return issue;
  },

  deleteArchive(id: string) {
    const db = load();
    db.archives = db.archives.filter((a) => a.id !== id);
    save(db);
  },
};
