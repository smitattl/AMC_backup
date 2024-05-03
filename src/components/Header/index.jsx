import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "react-tooltip/dist/react-tooltip.css";
import BackIcon from "../../images/backarrow.png";
import LogoIcon from "../../images/svgs/Logo.svg";
import HomeIcon from "../../images/download.png";
import TataIcon from "../../images/svgs/TataLogo.svg";
import {
  NameInitials,
  maskEmail,
  useHandleClickActiveForAdmin,
} from "../../utils";
import "./index.css";

function Header() {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { arnList, userData } = useSelector((state) => state.arn);
  const { fleetData, arnNumber } = useSelector((state) => state.homeApi);
  const handleClickActiveForAdmin = useHandleClickActiveForAdmin();
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const LogoutSession = () => {
    localStorage.clear();
    navigate("/thank-you");
    window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
  };

  return (
    <div className="header_wrapper">
      <div className="bg-white w-full">
        <div className="header_contaier  d-flex justify-content-between align-items-center">
          <div className="d-flex gap-5 align-items-center">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.tatamotors.com/");
              }}
              className="cursor-pointer"
            >
              <img src={LogoIcon} alt="/" />
            </Link>
            <div className="vas_title">VAS Digital Dashboard</div>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Link
              className={
                pathname === "/admin/admin-fleet-details" ||
                pathname === "/Home/Fleet-details"
                  ? "activeLink"
                  : ""
              }
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
              className={
                pathname === "/admin/admin-key-insight" ||
                pathname === "/Home/Key-insights"
                  ? "activeLink"
                  : ""
              }
            >
              Key Insights
            </Link>
            <Link to="/admin">
              <img src={HomeIcon} alt="HomeIcon" className="home_img" />
            </Link>
            {userData?.NameList && !pathname.includes("/admin") && (
              <div className="position-relative" ref={dropdownRef}>
                <div
                  onClick={() => setShowDropDown(!showDropdown)}
                  className="intials"
                >
                  <NameInitials names={userData.NameList} />
                </div>
                {showDropdown && (
                  <div className="menu_section">
                    <div className="p-3">
                      <h6>Hi, {userData?.NameList}</h6>
                      <p>Access your account and manage your orders</p>
                      <button onClick={LogoutSession}> Logout</button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
            {!(
              pathname === "/admin/admin-fleet-details" ||
              pathname === "/admin/admin-key-insight" ||
              pathname === "/Home/Fleet-details" ||
              pathname === "/Home/Key-insights"
            ) && (
              <React.Fragment>
                <ScrollLink
                  to="section1"
                  smooth={true}
                  duration={50}
                  spy={true}
                  exact="true"
                  offset={-140}
                  onClick={() => handleClickActiveForAdmin("section1")}
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
                  offset={-450}
                  onClick={() => handleClickActiveForAdmin("section2")}
                  className="scroll_link"
                >
                  Due for Renewal <span>({fleetData.Renewal || "0"})</span>
                </ScrollLink>
              </React.Fragment>
            )}
          </div>
          <div className="arn_no_text" style={{ fontFamily: "sans-serif" }}>
            <div>
              <div>ARN Number</div>
              {userData?.email_id && (
                <div className="arn_no_text text-end">Email</div>
              )}
            </div>
            <div className="d-flex flex-column text-left">
              <span className="">: {arnList[0] || arnNumber?.value}</span>
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
