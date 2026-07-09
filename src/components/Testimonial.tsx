import { ArrowLeft } from "./Icons";
import "./Testimonial.css";

function Stars() {
  return (
    <div className="stars" aria-label="דירוג 5 מתוך 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.9l1.2-6.6L2.5 9.7l6.6-.9L12 2Z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="testimonial section">
      <div className="container">
        <blockquote className="quote">
          “חיפשתי משהו שיוסיף נשמה לבית, ובלב עיצובים מצאתי הרבה מעבר לזה. האיכות
          של ההדפסה והדיוק בפרטים הקטנים הם פשוט ברמה אחרת. השירות האישי והעין
          העיצובית שלהם הופכים כל פריט ליצירת אמנות של ממש.”
        </blockquote>
        <p className="quote-author">ישראל ישראלי.</p>
        <div className="quote-controls">
          <button className="arrow-btn flip" aria-label="הקודם">
            <ArrowLeft size={40} />
          </button>
          <Stars />
          <button className="arrow-btn" aria-label="הבא">
            <ArrowLeft size={40} />
          </button>
        </div>
      </div>
    </section>
  );
}
