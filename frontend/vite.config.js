import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true, // listen on all network interfaces
  },
  watch: {
    usePolling: true, // forces Vite to poll for changes
  },
});
