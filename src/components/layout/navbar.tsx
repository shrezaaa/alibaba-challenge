import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-white h-14 w-full z-50 border-b shadow-sm">
      <div className="flex h-full items-center">
        <div className="ps-2">Alibaba Challenge</div>
      </div>
    </nav>
  );
};

export default Navbar;
