import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Workbox } from "workbox-window";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
// Register service worker if available

if ("serviceWorker" in navigator && process.env.NODE_ENV === "development") {
  const serviceWorkerUrl = `service-worker.js`;

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

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
