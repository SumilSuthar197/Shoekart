import React from "react";
import logo from "../assets/LOGO.svg";
import SideItems from "./SideItems";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";
import { MdWindow, MdOutlineLogout, MdMenuOpen } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const AdminSideBar = ({ toggleOpen }) => {
  return (
    <>
      <div className="sideBarLogoMain">
        <div className="sideBarLogo">
          <img src={logo} alt="logo" />
          <div>
            <div className="sideBrandName">ShoeKart</div>
            <Link
              to="/"
              className="sideBrandLink text-sm underline text-[#ccc] hover:text-white"
            >
              Visit store
            </Link>
          </div>
        </div>
        <div onClick={() => toggleOpen()} className="sidebarCloseBtn">
          <MdMenuOpen size={28} />
        </div>
      </div>
      <ul className="sideItemList p-2 list-none flex-1">
        <SideItems iconName={<FaHome size={20} />} text="Home" to="/admin" />
        <SideItems
          iconName={<FaUser size={17} />}
          text="Customers"
          to="/admin/customers"
        />
        <SideItems
          iconName={<MdWindow size={20} />}
          text="Products"
          to="/admin/products"
        />
        <SideItems
          iconName={<FaClipboardList size={18} />}
          text="Orders"
          to="/admin/orders"
        />
        <SideItems
          iconName={<BiSolidDiscount size={20} />}
          text="Coupons"
          to="/admin/coupons"
        />
        <SideItems
          iconName={<TbBrandBooking size={22} />}
          text="Brands"
          to="/admin/brands"
        />
        <SideItems
          iconName={<MdOutlineLogout size={20} />}
          text="Logout"
          to="/"
        />
      </ul>
    </>
  );
};

export default AdminSideBar;
