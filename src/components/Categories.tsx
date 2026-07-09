import { CATEGORIES } from "../data";
import { CATEGORY_ICONS } from "./Icons";
import "./Categories.css";

export default function Categories() {
  return (
    <section className="categories section" id="categories">
      <div className="container">
        <div className="categories-head">
          <span className="script-ghost">Product categories</span>
        </div>
        <ul className="categories-grid">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon];
            return (
              <li className="cat-chip" key={cat.label.join(" ")}>
                <span className="cat-icon">{Icon && <Icon size={44} />}</span>
                <span className="cat-label">
                  {cat.label[0]}
                  <br />
                  {cat.label[1]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
