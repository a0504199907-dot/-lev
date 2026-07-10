export type BookingStatus = "pending" | "approved" | "rejected" | "blocked";

export interface Slot {
  id: string;
  slot_code: string;
  display_name: string;
  width_multiplier: number;
  height_multiplier: number;
  base_price: number;
}

export interface Booking {
  id: string;
  created_at: string;
  week_start_date: string;
  slot_id: string;
  business_name: string;
  contact_name: string;
  contact_phone: string;
  ad_image_url: string;
  status: BookingStatus;
}

export interface ArchiveIssue {
  id: string;
  published_date: string;
  title: string;
  pdf_url: string;
  preview_image_url: string;
}

export interface BookingInput {
  week_start_date: string;
  slot_id: string;
  business_name: string;
  contact_name: string;
  contact_phone: string;
  file: File;
}

export interface ArchiveInput {
  title: string;
  published_date: string;
  pdfFile: File;
  previewFile: File;
}
