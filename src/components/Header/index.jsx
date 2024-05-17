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
  const { arnList } = useSelector((state) => state.arn);
  const { fleetData, arnNumber } = useSelector((state) => state.homeApi);
  const { arnForCustomer, params, customerData } = useSelector(
    (state) => state.customer
  );
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

            <Link
              to={
                pathname.includes("/admin")
                  ? "/admin"
                  : `/Home/${params.param1}/${params.param2}`
              }
            >
              <img src={HomeIcon} alt="HomeIcon" className="home_img" />
            </Link>
            {customerData?.userName && !pathname.includes("/admin") && (
              <div className="position-relative" ref={dropdownRef}>
                <div
                  onClick={() => setShowDropDown(!showDropdown)}
                  className="intials"
                >
                  <NameInitials names={customerData.userName} />
                </div>
                {showDropdown && (
                  <div className="menu_section">
                    <div className="p-3">
                      <h6>Hi, {customerData?.userName}</h6>
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
            {pathname.includes("/Home") && (
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://buytrucknbus-osp3dev.home.tatamotors/account/vas-dashboard"
                  );
                }}
              >
                <img src={BackIcon} alt="/back-arrow" className="home_icon" />
                &nbsp; Online Sales Platform
              </Link>
            )}
            {!(
              pathname === "/admin/admin-fleet-details" ||
              pathname === "/admin/admin-key-insight" ||
              pathname.includes("/Home")
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
                  Due for Renewal <span>({fleetData?.Renewal || 0})</span>
                </ScrollLink>
              </React.Fragment>
            )}
          </div>
          <div className="arn_no_text" style={{ fontFamily: "sans-serif" }}>
            <div>
              {pathname?.includes("/admin") && arnNumber && (
                <div>ARN Number </div>
              )}
              {pathname?.includes("/Home") && arnForCustomer && (
                <div>ARN Number </div>
              )}
              {customerData?.email_id && pathname.includes("/Home") && (
                <div className="arn_no_text text-end">Email</div>
              )}
            </div>
            <div className="d-flex flex-column text-left">
              {pathname?.includes("/Home") && arnForCustomer && (
                <div> : {arnForCustomer?.label}</div>
              )}
              {pathname?.includes("/admin") && arnNumber && (
                <div>{arnNumber?.label || arnList[0]} </div>
              )}
              {customerData?.email_id && pathname.includes("/Home") && (
                <span className="scroll_link">
                  : {maskEmail(customerData?.email_id || "")}
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
