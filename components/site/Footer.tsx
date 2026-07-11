import Link from "next/link";
import { LayoutGrid, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-charcoal-deep text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral">
              <LayoutGrid className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-extrabold text-white">Business Table</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            לעסקים יש שולחן אחד. לוח העסקים השבועי שמחבר בין העסקים המקומיים
            לאלפי משפחות — בבניינים ובמרכזים הכי חמים באזור.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            ניווט מהיר
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/board" className="transition-colors hover:text-coral">
                הלוח החי ושריון משבצות
              </Link>
            </li>
            <li><a href="/#how" className="transition-colors hover:text-coral">איך זה עובד</a></li>
            <li><a href="/#packages" className="transition-colors hover:text-coral">גדלים ומחירים</a></li>
            <li><a href="/#archive" className="transition-colors hover:text-coral">ארכיון מהדורות</a></li>
            <li>
              <Link href="/admin" className="transition-colors hover:text-coral">
                כניסת מנהל
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            מדברים איתנו
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-coral" />
              <a href="tel:0501234567" dir="ltr" className="transition-colors hover:text-coral">
                050-123-4567
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-coral" />
              <a
                href="mailto:hello@businesstable.co.il"
                className="transition-colors hover:text-coral"
              >
                hello@businesstable.co.il
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-coral" />
              פועלים בכל רחבי האזור
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Business Table — לעסקים יש שולחן אחד. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
