import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/layout";

const Hotels = lazy(() => import("./pages/hotels-list/hotels-list"));
const Hotel = lazy(() => import("./pages/hotel/hotel"));

function App() {
  return (
    <Router>
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
