import React, { useState } from "react";
import { HiOutlineMenu , HiOutlineX} from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {openSideMenu && (
        <>
          {/* Invisible backdrop for closing - no visual overlay */}
          <div 
            className="fixed top-[61px] left-64 right-0 bottom-0 z-40 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />
          {/* Sidebar */}
          <div className="fixed top-[61px] left-0 z-50 lg:hidden shadow-2xl">
            <SideMenu activeMenu={activeMenu} onMenuClick={() => setOpenSideMenu(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
