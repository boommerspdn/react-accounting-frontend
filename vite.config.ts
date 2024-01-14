import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "about-us": path.resolve(__dirname, "src/routes/about-us/index.html"),
        "contact-us": path.resolve(
          __dirname,
          "src/routes/contact-us/index.html",
        ),
      },
    },
  },
});
