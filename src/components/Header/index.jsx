import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import LogoIcon from "../../images/svgs/Logo.svg";
import TataIcon from "../../images/svgs/TataLogo.svg";
import HomeIcon from "../../images/download.png";
import BackIcon from "../../images/backarrow.png";
import "react-tooltip/dist/react-tooltip.css";
import { LogoutSession } from "../../utils";

function Header() {
  const { arnList } = useSelector((state) => state.arn);
  const location = LogoutSession;

  return (
    <div className="header_wrapper">
      <div className="header_contaier d-flex justify-content-between align-items-center">
        <div className="d-flex gap-5 align-items-center">
          <Link to="/admin">
            <img src={LogoIcon} alt="/" />
          </Link>
          <div className="vas_title">VAS Digital Dashboard</div>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <Link to="/admin/admin-fleet-details">Fleet Details</Link>
          <Link to="/admin/admin-key-insight">Key Insights</Link>
          <Link to="/">
            <img src={HomeIcon} alt="/home" className="home_icon" />
          </Link>
          {/* <div
            className="user_name"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Hello world!"
            data-tooltip-place="top"
          >
            SS
          </div>
          <Tooltip id="my-tooltip" /> */}

          <img src={TataIcon} alt="/home" />
        </div>
      </div>
      <div className="border_bottom" />
      <div className="header_contaier  py-2 d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={BackIcon} alt="/back-arrow" className="home_icon" />
          &nbsp; Online Sales Platform
        </Link>
        <div className="arn_no_text">
          ARN Number : <span>{arnList[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
