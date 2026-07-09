import { useState } from "react";
import { ArrowLeft } from "./Icons";
import "./Hero.css";

const SLIDES = 4;

export default function Hero() {
  const [active, setActive] = useState(SLIDES - 1);

  return (
    <section className="hero section" id="top">
      <div className="hero-grid container">
        {/* left: wordmark + tagline */}
        <div className="hero-copy">
          <span className="hero-since">since 2010</span>
          <div className="hero-wordmark" aria-label="Lev Designs">
            <span className="wm wm-ghost">Lev Designs</span>
            <span className="wm wm-front">Lev Designs</span>
          </div>
          <div className="eyebrow hero-eyebrow">
            <span className="rule" />
            <p>
              לב עיצובים
              <br />
              דפוס מתקדם, יודאיקה
              <br />
              ועיצוב בהתאמה אישית
            </p>
          </div>
        </div>

        {/* right: image card */}
        <div className="hero-media">
          <div className="hero-image tint-0" role="img" aria-label="תמונת אווירה — עבודות דפוס ועיצוב">
            <div className="hero-caption">
              <button className="arrow-btn flip" aria-label="לצפייה במוצר">
                <ArrowLeft size={26} />
              </button>
              <div className="hero-caption-text">
                <span>שם המוצר המוצג על המסך</span>
                <strong>299.00 ₪</strong>
              </div>
            </div>
          </div>
          <div className="hero-dots" role="tablist" aria-label="מעבר בין תמונות">
            {Array.from({ length: SLIDES }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === active ? "on" : ""}`}
                aria-label={`תמונה ${i + 1}`}
                aria-selected={i === active}
                role="tab"
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
