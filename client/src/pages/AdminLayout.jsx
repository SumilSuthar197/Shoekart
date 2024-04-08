import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import "../styles/adminDashboard.css";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dashPage">
      <div
        className={`dashSidebar ${open ? "openSide" : "closeSide"}`}
        // style={open ? { width: "17%" } : { width: "0%" }}
      >
        <AdminSideBar toggleOpen={() => setOpen((prev) => !prev)} />
      </div>
      <div className="dashOutlet" style={{height:"100%"}}>
        <AdminHeader open={open} toggleOpen={() => setOpen((prev) => !prev)} />

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
