import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo2} alt="" />
          <p>
            Delicious food from your favorite places, Delivered with love by
            CraveX.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right" id="contact">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+9178965222</li>
            <li>contact@CraveX.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyrights">
        Copyright 2025 &copy; CraveX.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
