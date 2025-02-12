import React from "react";
import "./index.scss";
import App from "./App";
import { createRoot, hydrateRoot } from "react-dom/client";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
// Register service worker if available

if ("serviceWorker" in navigator && import.meta.env.DEV) {
  const serviceWorkerUrl = `/sw.js`;

  // Register service worker
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

hydrateRoot(
  document.getElementById("root") as HTMLElement,
    <App />
)
