import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 relative overflow-auto h-[calc(100vh-56px)]">
        <div className="p-0 w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
