import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/LOGO.svg";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile, CgClose } from "react-icons/cg";
import { BiLogIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../features/cart/cartslice";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const handleTrendingClick = () => {
    const trendingSection = document.getElementById("featuredProd");
    trendingSection.scrollIntoView({ behavior: "smooth" });
  };
  const { auth } = useAuth();
  // console.log(auth.cartSize);
  const [isOpen, setIsOpen] = useState(false);
  const { amount, cartItem } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItem, dispatch]);
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
          to="/#trending"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
            handleTrendingClick();
          }}
        >
          Trending
        </NavLink>
        <NavLink
          to="/products"
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Products
        </NavLink>
        <NavLink
          to="/"
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
        <div className="nav-btn">
          <div className="btnIcon">
            <Link to="/products" style={{ color: "#1a1a1a" }}>
              <FiSearch />
            </Link>
          </div>
          <div className="btnIcon">
            <Link to="/cart" style={{ color: "#1a1a1a" }}>
              <FaShoppingCart />
              <div className="navAmount">{auth?.cartSize || 0}</div>
            </Link>
          </div>
          <div className="btnIcon">
            {auth ? (
              <>
                <CgProfile />
                <ul className="dropdown">
                  <li>
                    <Link className="#">My Profile</Link>
                  </li>
                  <li>
                    <Link className="#">Orders</Link>
                  </li>
                  <li>
                    <Link className="#">Logout</Link>
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/login">
                <BiLogIn />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
