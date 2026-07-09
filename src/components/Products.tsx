import { PRODUCTS } from "../data";
import { ArrowLeft } from "./Icons";
import "./Products.css";

export default function Products() {
  return (
    <section className="products section" id="products">
      <div className="container">
        <div className="products-head">
          <span className="script-ghost products-ghost">Products</span>
          <div className="eyebrow">
            <span className="rule" />
            <p>
              לב עיצובים
              <br />
              דפוס מתקדם, יודאיקה
              <br />
              ועיצוב בהתאמה אישית
            </p>
          </div>
          <div className="eyebrow end">
            <span className="rule" />
            <p>
              המוצרים
              <br />
              שלנו בחנות
            </p>
          </div>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <article className="product-card" key={p.id}>
              <div className={`product-image tint-${p.tint}`} role="img" aria-label={p.name} />
              <div className="product-meta">
                <button className="arrow-btn flip-rtl" aria-label="לצפייה במוצר">
                  <ArrowLeft size={26} />
                </button>
                <div className="product-text">
                  <span>{p.name}</span>
                  <strong>{p.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="load-more">
          <span>טען מוצרים נוספים</span>
          <span className="arrow-btn down"><ArrowLeft size={26} /></span>
        </button>
      </div>
    </section>
  );
}
