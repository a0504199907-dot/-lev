import type { Metadata, Viewport } from "next";
import "@fontsource-variable/heebo";
import "@fontsource/karantina/400.css";
import "@fontsource/karantina/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Table | לעסקים יש שולחן אחד",
  description:
    "החשיפה הפיזית הכי חזקה לעסק שלך באזור — שולחן עסקים אחד שמגיע ישירות לעיניים של אלפי משפחות וקונים פוטנציאליים מדי שבוע.",
};

export const viewport: Viewport = {
  themeColor: "#1E293B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
