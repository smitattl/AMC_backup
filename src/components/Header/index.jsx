import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import LogoIcon from "../../images/svgs/Logo.svg";
import TataIcon from "../../images/svgs/TataLogo.svg";
import HomeIcon from "../../images/download.png";
import BackIcon from "../../images/backarrow.png";
import "react-tooltip/dist/react-tooltip.css";
import { maskEmail, useHandleClickActive } from "../../utils";
import { Link as ScrollLink } from "react-scroll";

function Header() {
  const { pathname } = useLocation();
  const { arnList, userData } = useSelector((state) => state.arn);
  const { fleetData } = useSelector((state) => state.homeApi);
  const handleClickActive = useHandleClickActive();

  return (
    <div className="header_wrapper">
      <div className="bg-white w-full">
        <div className="header_contaier  d-flex justify-content-between align-items-center">
          <div className="d-flex gap-5 align-items-center">
            <Link to={pathname.includes("/admin") && "/admin"}>
              <img src={LogoIcon} alt="/" />
            </Link>
            <div className="vas_title">VAS Digital Dashboard</div>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Link
              to={
                pathname.includes("/admin")
                  ? "/admin/admin-fleet-details"
                  : "/Home/Fleet-details"
              }
            >
              Fleet Details
            </Link>
            <Link
              to={
                pathname.includes("/admin")
                  ? "/admin/admin-key-insight"
                  : "/Home/Key-insights"
              }
            >
              Key Insights
            </Link>
            <Link to="/Home/:param1/:param2">
              <img src={HomeIcon} alt="/home" className="home_icon" />
            </Link>
            <img src={TataIcon} alt="/home" />
          </div>
        </div>
        <div className="border_bottom" />
      </div>
      <div className="bottom_header">
        <div className="header_contaier py-2 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <Link to="/">
              <img src={BackIcon} alt="/back-arrow" className="home_icon" />
              &nbsp; Online Sales Platform
            </Link>
            {pathname === "/admin" ||
              (pathname.includes("/Home") && (
                <React.Fragment>
                  <ScrollLink
                    to="section1"
                    smooth={true}
                    duration={50}
                    spy={true}
                    exact="true"
                    offset={-140}
                    onClick={() => handleClickActive("section1")}
                    className="scroll_link"
                  >
                    Due for Schedule Service{" "}
                    <span>({fleetData.ServiceSchedule || "0"})</span>
                  </ScrollLink>
                  <ScrollLink
                    to="section2"
                    smooth={true}
                    duration={50}
                    spy={true}
                    exact="true"
                    offset={-140}
                    onClick={() => handleClickActive("section2")}
                    className="scroll_link"
                  >
                    Due for Renewal<span>({fleetData.Renewal || "0"})</span>
                  </ScrollLink>
                </React.Fragment>
              ))}
          </div>
          <div className="arn_no_text" style={{ fontFamily: "sans-serif" }}>
            <div>
              <div>ARN Number</div>
              {userData?.email_id && (
                <div className="arn_no_text text-end">Email</div>
              )}
            </div>
            <div className="d-flex flex-column text-left">
              <span className="scroll_link">: {arnList[0]}</span>
              {userData?.email_id && (
                <span className="scroll_link">
                  : {maskEmail(userData?.email_id || "")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
