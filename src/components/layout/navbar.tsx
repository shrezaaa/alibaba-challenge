import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-white h-14 w-full z-50">
      <div className="flex h-full justify-end items-center">
        <div className="ps-2">Demo App</div>

        <div className="mr-auto"></div>

        {/* <div className="py-2 pr-2 ml-auto my-2 text-black rounded-full hover:text-yellow-600 cursor-pointer">
          <button>
            <span className="material-icons">notifications</span>
          </button>
        </div> */}

        {/* <div className="py-2 mx-2 rounded-sm text-black cursor-pointer flex flex-col items-end">
          <span>Admin</span>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
