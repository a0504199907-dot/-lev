import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Categories from "./components/Categories";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      {/* decorative vertical rules that frame the content (as in the design) */}
      <div className="frame-rules" aria-hidden="true">
        <span className="frame-rule left" />
        <span className="frame-rule right" />
      </div>

      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Categories />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}
