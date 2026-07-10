import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Minimal font subsets for a self-contained preview (Hebrew + Latin only)
import "@fontsource/heebo/hebrew-300.css";
import "@fontsource/heebo/hebrew-400.css";
import "@fontsource/heebo/hebrew-500.css";
import "@fontsource/heebo/hebrew-700.css";
import "@fontsource/heebo/latin-300.css";
import "@fontsource/heebo/latin-400.css";
import "@fontsource/heebo/latin-500.css";
import "@fontsource/allura/latin-400.css";
import "./index.css";
import App from "./App.tsx";

document.documentElement.setAttribute("dir", "rtl");
document.documentElement.setAttribute("lang", "he");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
