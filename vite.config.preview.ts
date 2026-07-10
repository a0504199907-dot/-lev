import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds a single self-contained HTML file (JS + CSS + fonts inlined as data URIs)
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "dist-preview",
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      input: "index.preview.html",
    },
  },
});
