import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data";
import { Bag, User, Heart, Search } from "./Icons";
import Logo from "./Logo";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        {/* right (RTL start): actions */}
        <div className="header-actions">
          <button className="cart" aria-label="עגלת קניות">
            <Bag size={24} />
            <span className="cart-count">0</span>
          </button>
          <button className="icon-btn" aria-label="חשבון"><User size={24} /></button>
          <button className="icon-btn" aria-label="מועדפים"><Heart size={24} /></button>
          <button className="icon-btn" aria-label="חיפוש"><Search size={24} /></button>
        </div>

        {/* center: nav */}
        <nav className={`header-nav ${open ? "open" : ""}`} aria-label="ניווט ראשי">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a href="#products" onClick={() => setOpen(false)}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* left (RTL end): logo + burger */}
        <div className="header-brand">
          <a href="#top"><Logo className="header-logo" /></a>
          <button
            className={`burger ${open ? "active" : ""}`}
            aria-label="תפריט"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
