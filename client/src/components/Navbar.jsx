import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
// import logo from "../assets/LOGO.svg";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile, CgClose } from "react-icons/cg";
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
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
        <Link to="/">SHOEKART</Link>
        {/* <img src={logo} alt="LOGO" /> */}
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
          to="/"
          state={{ scrollToTop: true }}
          className="nav-link"
          onClick={() => {
            setIsOpen(!isOpen);
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
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        setAuth(null);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/login" style={{ color: "#1a1a1a", fontSize: "30px" }}>
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
