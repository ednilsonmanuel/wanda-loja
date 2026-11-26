import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" permite publicar tanto na raiz de um domínio como em
// https://<utilizador>.github.io/<repositório>/ (GitHub Pages).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
