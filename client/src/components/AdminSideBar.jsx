import React from "react";
import logo from "../../public/android-chrome-512x512.png";
import SideItems from "./SideItems";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";
import {
  MdWindow,
  MdOutlineLogout,
  MdMenuOpen,
  MdCategory,
} from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const AdminSideBar = ({ toggleOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sideBarLogoMain">
        <div className="sideBarLogo">
          <img src={logo} alt="logo" />
          <div>
            <div className="sideBrandName">SHOEKART</div>
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
          iconName={<MdCategory size={20} />}
          text="Category"
          to="/admin/category"
        />
        <li
          onClick={() => {
            localStorage.removeItem("jwtAdmin");
            navigate("/adminlogin");
          }}
          className="sideItemLink hover:cursor-pointer hover:bg-[#ffffff0d] flex items-center gap-3 px-4 py-2 rounded-md mb-1 text-[14px]"
        >
          <div className="sideItemIcon">
            <MdOutlineLogout size={20} />
          </div>
          <div className="sideItemName">Logout</div>
        </li>
      </ul>
    </>
  );
};

export default AdminSideBar;
