"use client";

/**
 * שכבת הנתונים המאוחדת של Business Table.
 * במצב רגיל — עבודה מול Supabase (טבלאות + Storage).
 * במצב דמו, או כשה-Supabase לא זמין — נפילה חכמה לחנות הדגמה מקומית.
 */

import { ADS_BUCKET, ARCHIVES_BUCKET, DEMO_MODE } from "./config";
import { demoStore } from "./demo";
import { getSupabase } from "./supabase";
import type {
  ArchiveInput,
  ArchiveIssue,
  Booking,
  BookingInput,
  BookingStatus,
  Slot,
} from "./types";

let fallbackToDemo = DEMO_MODE;

export function isDemoActive() {
  return fallbackToDemo;
}

function activateDemoFallback(err: unknown) {
  console.warn("Business Table: נפילה למצב דמו מקומי —", err);
  fallbackToDemo = true;
}

function ext(file: File) {
  const dot = file.name.lastIndexOf(".");
  return dot >= 0 ? file.name.slice(dot + 1).toLowerCase() : "bin";
}

async function uploadPublic(bucket: string, folder: string, file: File) {
  const sb = getSupabase();
  const path = `${folder}/${crypto.randomUUID()}.${ext(file)}`;
  const { error } = await sb.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

// ---------- משבצות ----------

export async function getSlots(): Promise<Slot[]> {
  if (fallbackToDemo) return demoStore.getSlots();
  try {
    const { data, error } = await getSupabase()
      .from("slots")
      .select("*")
      .order("slot_code");
    if (error) throw error;
    return sortSlots(data as Slot[]);
  } catch (err) {
    activateDemoFallback(err);
    return demoStore.getSlots();
  }
}

/** סדר תצוגה: פרימיום → רוחביות → סטנדרט (לפי מספר) */
function sortSlots(slots: Slot[]): Slot[] {
  const rank = (s: Slot) =>
    s.width_multiplier * s.height_multiplier * -1000 +
    Number(s.slot_code.replace(/\D/g, "") || 0);
  return [...slots].sort((a, b) => rank(a) - rank(b));
}

// ---------- הזמנות ----------

/** ההזמנות התופסות משבצות בשבוע נתון (לתצוגה הציבורית) */
export async function getOccupiedBookings(week: string): Promise<Booking[]> {
  if (fallbackToDemo)
    return demoStore.getBookings({ week, statuses: ["approved", "blocked"] });
  try {
    const { data, error } = await getSupabase()
      .from("bookings")
      .select("*")
      .eq("week_start_date", week)
      .in("status", ["approved", "blocked"]);
    if (error) throw error;
    return data as Booking[];
  } catch (err) {
    activateDemoFallback(err);
    return demoStore.getBookings({ week, statuses: ["approved", "blocked"] });
  }
}

/** כלל ההזמנות (לדשבורד הניהול) */
export async function getAllBookings(): Promise<Booking[]> {
  if (fallbackToDemo) return demoStore.getBookings();
  try {
    const { data, error } = await getSupabase()
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Booking[];
  } catch (err) {
    activateDemoFallback(err);
    return demoStore.getBookings();
  }
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  if (fallbackToDemo) return demoStore.createBooking(input);
  try {
    const ad_image_url = await uploadPublic(
      ADS_BUCKET,
      input.week_start_date,
      input.file
    );
    const { data, error } = await getSupabase()
      .from("bookings")
      .insert({
        week_start_date: input.week_start_date,
        slot_id: input.slot_id,
        business_name: input.business_name,
        contact_name: input.contact_name,
        contact_phone: input.contact_phone,
        ad_image_url,
        status: "pending",
      })
      .select()
      .single();
    if (error) throw error;
    return data as Booking;
  } catch (err) {
    activateDemoFallback(err);
    return demoStore.createBooking(input);
  }
}

/** אישור בקשה — נועל את המשבצת ודוחה אוטומטית בקשות מתחרות לאותו שבוע */
export async function approveBooking(booking: Booking): Promise<void> {
  if (fallbackToDemo) {
    demoStore.setStatus(booking.id, "approved");
    return;
  }
  const sb = getSupabase();
  const { error } = await sb
    .from("bookings")
    .update({ status: "approved" })
    .eq("id", booking.id);
  if (error) throw error;
  await sb
    .from("bookings")
    .update({ status: "rejected" })
    .eq("slot_id", booking.slot_id)
    .eq("week_start_date", booking.week_start_date)
    .eq("status", "pending")
    .neq("id", booking.id);
}

export async function setBookingStatus(
  id: string,
  status: BookingStatus
): Promise<void> {
  if (fallbackToDemo) {
    demoStore.setStatus(id, status);
    return;
  }
  const { error } = await getSupabase()
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

/** חסימה/שריון ידני של משבצת ע"י המנהל */
export async function createManualBlock(
  slot_id: string,
  week: string,
  business_name: string
): Promise<void> {
  if (fallbackToDemo) {
    demoStore.insertManual(slot_id, week, business_name);
    return;
  }
  const { error } = await getSupabase().from("bookings").insert({
    week_start_date: week,
    slot_id,
    business_name,
    contact_name: "שריון ידני",
    contact_phone: "-",
    ad_image_url: "",
    status: "blocked",
  });
  if (error) throw error;
}

export async function deleteBooking(id: string): Promise<void> {
  if (fallbackToDemo) {
    demoStore.deleteBooking(id);
    return;
  }
  const { error } = await getSupabase().from("bookings").delete().eq("id", id);
  if (error) throw error;
}

// ---------- ארכיון ----------

export async function getArchives(): Promise<ArchiveIssue[]> {
  if (fallbackToDemo) return demoStore.getArchives();
  try {
    const { data, error } = await getSupabase()
      .from("archives")
      .select("*")
      .order("published_date", { ascending: false });
    if (error) throw error;
    return data as ArchiveIssue[];
  } catch (err) {
    activateDemoFallback(err);
    return demoStore.getArchives();
  }
}

export async function createArchive(input: ArchiveInput): Promise<ArchiveIssue> {
  if (fallbackToDemo) return demoStore.createArchive(input);
  const folder = input.published_date;
  const pdf_url = await uploadPublic(ARCHIVES_BUCKET, folder, input.pdfFile);
  const preview_image_url = await uploadPublic(
    ARCHIVES_BUCKET,
    folder,
    input.previewFile
  );
  const { data, error } = await getSupabase()
    .from("archives")
    .insert({
      title: input.title,
      published_date: input.published_date,
      pdf_url,
      preview_image_url,
    })
    .select()
    .single();
  if (error) throw error;
  return data as ArchiveIssue;
}

export async function deleteArchive(id: string): Promise<void> {
  if (fallbackToDemo) {
    demoStore.deleteArchive(id);
    return;
  }
  const { error } = await getSupabase().from("archives").delete().eq("id", id);
  if (error) throw error;
}
