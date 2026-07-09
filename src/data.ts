export const NAV_ITEMS = [
  "בתי כנסת",
  "יודאיקה",
  "מוסדות וארגונים",
  "חותמות",
  "שילוט",
  "שירותי דפוס",
  "מסגור תמונות",
  "חיתוכי לייזר",
  "קנבס",
  "הדפסה על זכוכית",
];

export type Category = {
  label: [string, string];
  icon: string;
};

export const CATEGORIES: Category[] = [
  { label: ["הדפסה", "על זכוכית"], icon: "glass" },
  { label: ["הדפסה", "על קנבס"], icon: "canvas" },
  { label: ["חיתוכי", "לייזר"], icon: "laser" },
  { label: ["מסגור", "תמונות"], icon: "frame" },
  { label: ["שירותי", "דפוס"], icon: "print" },
  { label: ["הדפסות", "לבתי כנסת"], icon: "synagogue" },
  { label: ["מוצרי", "יודאיקה"], icon: "judaica" },
  { label: ["מוסדות", "וארגונים"], icon: "buildings" },
  { label: ["חותמות", "מותאמות"], icon: "stamp" },
  { label: ["הדפסת", "שילוט"], icon: "signs" },
];

export type Product = {
  id: number;
  name: string;
  price: string;
  tint: number;
};

export const PRODUCTS: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "שם המוצר המוצג על המסך",
  price: "299.00 ₪",
  tint: i % 6,
}));

export const FOOTER_LINKS = [
  "תקנון אתר",
  "מדיניות פרטיות",
  "הצהרת נגישות",
];

export const CONTACT = {
  phone: "0522244555",
  email: "123456789@gmail.com",
};
