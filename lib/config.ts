// פרטי החיבור ל-Supabase — ניתנים לדריסה דרך משתני סביבה.
// מפתח ה-publishable בטוח לחשיפה בצד לקוח (מוגן ע"י RLS).
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://dpiarwpxqoucrsnmmqkv.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_B0IoI7zI2f6D_uz1MInWCg_xG5pXgUq";

// מצב דמו: עבודה מול נתוני הדגמה מקומיים (localStorage) במקום Supabase.
export const DEMO_MODE =
  process.env.NEXT_PUBLIC_DEMO === "1" || !SUPABASE_URL || !SUPABASE_ANON_KEY;

export const ADS_BUCKET = "board-ads";
export const ARCHIVES_BUCKET = "board-archives";
