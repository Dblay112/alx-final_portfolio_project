import React, { useContext, useState } from "react";
import "./Navbar.css"; // css file
import { useNavigate, Link } from "react-router-dom";

// Importing assets directly
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.png";
import basket_icon from "../../assets/basket_icon.png";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/"); // Optionally navigate to home or another page after logout
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} className="logo" alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-shop"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Shop
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" />
        <div className="navbar-icons">
          <Link to="/cart">
            <img src={basket_icon} alt="Basket Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          {!token ? (
            <button className="sign-in-btn" onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div
              className="navbar-profile"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <img src={assets.profile_icon} alt="Profile Icon" />
              {dropdownVisible && (
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="Orders Icon" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={handleLogout}>
                    <img src={assets.logout_icon} alt="Logout Icon" />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
