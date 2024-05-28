import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css"; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>Dummy Text that will go here</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <nav>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </nav>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+233-57-60-36-422</li>
            <li>contact@gbemi.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024@ ALXAFRICA.COM</p>
    </footer>
  );
};

export default Footer;
