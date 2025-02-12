/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update service worker when a new version is available
      workbox: {
        globPatterns: ["**/*.{html,js,css,png,jpg,svg}"], // Add the types of files to cache
      },
      manifest: {
        name: "Alibaba Hotels PWA",
        short_name: "PWA",
        description:
          "Alibaba Hotels Progressive Web App built with Vite and React",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
  },
  ssr: {
    noExternal: ["react-router-dom"],
  },
});
