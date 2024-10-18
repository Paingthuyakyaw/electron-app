import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // Ensure this matches the port used in your Electron main.js
    strictPort: true, // Ensures that the server will not try to find another port if 5173 is already in use
    open: false, // Prevents the server from automatically opening the browser
  },
  build: {
    outDir: "dist", // Specify the output directory for builds
    rollupOptions: {
      output: {
        entryFileNames: "app.js", // Customize entry file name if needed
        chunkFileNames: "[name].js", // Customize chunk file names if needed
        assetFileNames: "[name].[ext]", // Keep asset file names
      },
    },
  },
});
