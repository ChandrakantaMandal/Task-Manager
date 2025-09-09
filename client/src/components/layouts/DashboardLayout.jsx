import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
    const {user}=useContext(UserContext)
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="flex-1 mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
