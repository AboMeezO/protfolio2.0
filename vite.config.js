import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // base: mode === "production" ? "/abomeezo/" : "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5163,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 5174,
  },
}));
