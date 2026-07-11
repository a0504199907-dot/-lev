import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF5F38",
          50: "#FFF3EF",
          100: "#FFE4DC",
          200: "#FFC7B8",
          300: "#FFA48C",
          400: "#FF7F5F",
          500: "#FF5F38",
          600: "#F04314",
          700: "#C6350D",
          800: "#9C2C10",
          900: "#7E2811",
        },
        charcoal: {
          DEFAULT: "#1E293B",
          light: "#334155",
          deep: "#0F172A",
        },
      },
      fontFamily: {
        sans: ['"Heebo Variable"', "Heebo", "system-ui", "sans-serif"],
        display: ["Karantina", '"Heebo Variable"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        "slot-pop": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "70%": { transform: "scale(1.06)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        "pop-in": "pop-in 0.25s ease-out both",
        marquee: "marquee 45s linear infinite",
        "slot-pop": "slot-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "float-y": "float-y 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
