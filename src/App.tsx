import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";

const Home = lazy(() => import("./pages/home/home"));
const Hotels = lazy(() => import("./pages/hotels-list/hotels-list"));
const Hotel = lazy(() => import("./pages/hotel/hotel"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/:id" element={<Hotel />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
