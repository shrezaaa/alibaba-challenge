import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/layout";

import { StaticRouter } from "react-router-dom/server";
import { BrowserRouter } from "react-router-dom";

const Hotels = lazy(() => import("./pages/hotels-list/hotels-list"));
const Hotel = lazy(() => import("./pages/hotel/hotel"));

function App({ isServer = false, url = "" }) {

  const Router: any = isServer ? StaticRouter : BrowserRouter;

  return (
    <Router location={isServer ? url : undefined}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/hotels" replace />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/:id" element={<Hotel />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
