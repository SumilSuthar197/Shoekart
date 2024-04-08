import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
const AdminHeader = ({ open, toggleOpen }) => {
  return (
    <div className="mainHeader">
      <div>
        <div
          onClick={() => toggleOpen()}
          className="SideBarBtn"
          style={{ transform: `rotate(${open ? "0" : "180"}deg)` }}
        >
          <MdMenuOpen size={28} />
        </div>
        {/* <p>Dashboard</p> */}
      </div>
      <p className="adminHeaderProfile">
        Hello, Admin
        <FaCircleUser size={28} />
      </p>
    </div>
  );
};

export default AdminHeader;
