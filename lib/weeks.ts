function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * מחזיר את 4 ימי הראשון הקרובים (כולל היום, אם היום ראשון) —
 * תאריכי הפתיחה של הלוחות השבועיים הבאים.
 */
export function upcomingSundays(count = 4): string[] {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  return Array.from({ length: count }, (_, i) => {
    const s = new Date(d);
    s.setDate(d.getDate() + i * 7);
    return toISODate(s);
  });
}

export function formatHebrewDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
  });
}

export function formatHebrewDateFull(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** תווית שבוע: "ראשון, 12 ביולי – 18 ביולי" */
export function weekLabel(iso: string) {
  const start = new Date(`${iso}T00:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${formatHebrewDate(iso)} – ${formatHebrewDate(toISODate(end))}`;
}
