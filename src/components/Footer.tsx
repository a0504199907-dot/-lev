import { NAV_ITEMS, FOOTER_LINKS, CONTACT } from "../data";
import { Phone, Envelope, ArrowLeft } from "./Icons";
import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div className="footer-inner">
          {/* brand + policy + contact */}
          <div className="footer-col footer-brand">
            <a href="#top"><Logo className="footer-logo" /></a>

            <ul className="footer-policy">
              {FOOTER_LINKS.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>

            <ul className="footer-contact">
              <li>
                <Phone size={22} />
                <a href={`tel:${CONTACT.phone}`} dir="ltr">{CONTACT.phone}</a>
              </li>
              <li>
                <Envelope size={22} />
                <a href={`mailto:${CONTACT.email}`} dir="ltr">{CONTACT.email}</a>
              </li>
            </ul>
          </div>

          {/* contact form */}
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-row">
              <label className="field">
                <span>טלפון</span>
                <input type="tel" name="phone" />
              </label>
              <label className="field">
                <span>שם מלא</span>
                <input type="text" name="fullname" />
              </label>
            </div>
            <label className="field">
              <span>אימייל</span>
              <input type="email" name="email" />
            </label>
            <label className="field">
              <span>הודעה</span>
              <input type="text" name="message" />
            </label>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <span className="arrow-btn flip-rtl"><ArrowLeft size={26} /></span>
                <span>שליחה</span>
              </button>
              <label className="consent">
                <span>
                  עם שליחת הטופס אתם מסכימים ליצירת קשר
                  <br />
                  וקבלת דיוור בהתאם למדיניות הפרטיות שלנו.
                </span>
                <input type="checkbox" />
              </label>
            </div>
          </form>

          {/* site nav */}
          <nav className="footer-col footer-nav" aria-label="ניווט באתר">
            <h3>ניווט באתר</h3>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item}><a href="#products">{item}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© כל הזכויות שמורות ללב עיצובים</p>
        <a href="#">קרדיטים</a>
      </div>
    </footer>
  );
}
