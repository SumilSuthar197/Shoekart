import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/LOGO.svg";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile, CgClose } from "react-icons/cg";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navigation-bar">
      <div
        className="btnMenu"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <FiMenu />
      </div>
      <span className="logo">
        <img src={logo} alt="LOGO" />
      </span>
      <div className={isOpen ? "nav-links-md" : "nav-links"}>
        <div
          className="closeBtn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <CgClose />
        </div>
        <NavLink
          to="/"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/trending"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Trending
        </NavLink>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
        <NavLink
          to="/about"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Contact
        </NavLink>
      </div>
      <div className="nav-button">
        {/* <div className="search-bar">
          <span className="searchIcon"><FiSearch /></span>
          <input type="text" name="search" id="search" className="search" placeholder="Search Product..."/>
        </div> */}
        <div className="nav-btn">
          <div className="btnIcon">
            <FiSearch />
          </div>
          <div className="btnIcon">
            <FaShoppingCart />
          </div>
          <div className="btnIcon">
            <CgProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
