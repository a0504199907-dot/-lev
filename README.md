# לב עיצובים — Lev Designs

אתר תדמית ומסחר לסטודיו **לב עיצובים** — דפוס מתקדם, יודאיקה ועיצוב בהתאמה אישית.
נבנה מעיצוב Figma לאתר React מלא, רספונסיבי ותומך RTL.

## סטאק

- **React 18** + **TypeScript**
- **Vite** — dev server ובנייה
- **@fontsource/heebo** — גופן הגוף (עברית)
- **@fontsource/allura** — גופן הסקריפט הדקורטיבי ("Lev Designs")
- CSS רגיל עם משתני עיצוב (design tokens) — ללא תלות בספריית UI

## הרצה

```bash
npm install
npm run dev      # שרת פיתוח (http://localhost:5173)
npm run build    # בנייה לפרודקשן -> dist/
npm run preview  # תצוגה מקדימה של הבנייה
```

## מבנה

```
src/
  components/
    Header.tsx        ניווט עליון דביק + אייקונים + עגלה
    Hero.tsx          כותרת ראשית + תמונת אווירה + סליידר
    Products.tsx      גריד מוצרים
    About.tsx         טקסט "מאז 2010"
    Categories.tsx    קטגוריות מוצרים (עיגולים)
    Testimonial.tsx   המלצת לקוח + דירוג
    Footer.tsx        טופס יצירת קשר + ניווט + זכויות
    Icons.tsx         סט אייקונים (SVG inline)
    Logo.tsx          לוגו הסקריפט
  data.ts             תוכן (ניווט, קטגוריות, מוצרים)
  index.css           משתני עיצוב + סגנונות גלובליים
```

## פלטת הצבעים (מ-Figma)

| טוקן | ערך | שימוש |
|------|-----|--------|
| `--cream` | `#FFF9F4` | רקע ראשי |
| `--brown` | `#5D442D` | טקסט ראשי |
| `--tan` | `#DEC4AA` | הדגשת הלוגו |
| `--beige` | `#EFE8E1` | פס תחתון / עגלה |
| `--cream-3` | `#FFFCF9` | רקע פוטר |

## החלפת תמונות ה-placeholder לתמונות אמיתיות

התמונות בעיצוב מאוחסנות ב-Figma, וסביבת הפיתוח הנוכחית חוסמת גישה ישירה
ל-`figma.com` (מדיניות רשת), ולכן נעשה שימוש ב-placeholders בגוונים החמים של העיצוב.
כדי להכניס את התמונות האמיתיות:

1. ייצאו את התמונות מ-Figma (Export כ-JPG/PNG) ושמרו אותן ב-`public/images/`.
2. בקומפוננטות `Hero.tsx` ו-`Products.tsx`, החליפו את ה-`div` עם `className="... tint-N"`
   ב-`<img src="/images/שם-הקובץ.jpg" alt="..." />` (או הגדירו `background-image`).

התמונות היחסים (aspect ratios) כבר מוגדרים נכון — הירו `849:737`, כרטיסי מוצר `1:1`.
