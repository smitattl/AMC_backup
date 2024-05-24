import React from "react";
import "./index.css";
import TruckIcon from "../../images/Footer.gif";
import footerLogo from "../../images/footerLogo.svg";
import { Link } from "react-router-dom";

function FooterSection() {
  return (
    <div>
      <div className="footer_wrapper">
        <img src={TruckIcon} alt="icon" className="truck_icon" />
        <div className="footer_overlay" />
      </div>
      <div className="footer_bottom_section">
        <div className="footer_container">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.tatamotors.com/");
            }}
          >
            <img src={footerLogo} alt="logo" className="footer_logo" />
          </Link>
          <div className="white_line" />
          <p>©2024 Tata Motors. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
