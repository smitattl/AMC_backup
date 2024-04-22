import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./layout.module.css";
import logo from "../images/logo.svg";
import logo_sec from "../images/logo_sec.svg";
import heart from "../images/house.png";
import user from "../images/user.svg";
import backButton from "../images/back-button.png";

const Header = ({ sendDataToParent }) => {
  const [isOpenNotifiction, setisOpenNotifiction] = useState(false);

  const navigate = useNavigate();

  const value_Num = localStorage.getItem("ARN-Number");
  const value_name = localStorage.getItem("ARN-Name");
  const redirectToApplicationLandingPage = () => {
    navigate("/Home/Fleet-Overview");
  };

  const redirectToApplicationFleetPage = () => {
    navigate("/Home/Fleet-details");
  };

  const redirectToApplicationKeyInsightsPage = () => {
    navigate("/Home/Key-insights");
  };

  const LogoutSession = () => {
    localStorage.removeItem("ARN-Number");
    localStorage.removeItem("ARN-Name");
    navigate("/thank-you");
    window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
  };

  const sendDataToParentHandler = () => {
    // Call the function received from parent and pass the data
    // sendDataToParent(isOpen);
    sendDataToParent(!isOpenNotifiction);
  };

  return (
    <>
      <div className={styles.div}>
        <div className={styles.div_2}>
          <div className={styles.div_3}>
            <a
              href="https://www.tatamotors.com/"
              style={{
                color: "black",
                textDecoration: "none",
                borderRight: "1px solid #80808054",
                paddingRight: "21px",
              }}
              target="_blank"
            >
              <img loading="lazy" src={logo} className={styles.img} />
            </a>
            <div className={styles.div_4}>VAS Digital Dashboard</div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div className={styles.div_8}>
            <div className={styles.div_11}></div>
            <div className={styles.div_13}>
              <div className={styles.div_14} style={{ marginRight: "10px" }}>
                <span
                  onClick={redirectToApplicationFleetPage}
                  style={{ fontWeight: "bold" }}
                >
                  Fleet Details
                </span>
              </div>
              <div className={styles.div_14}>
                <span
                  style={{ fontWeight: "bold" }}
                  onClick={redirectToApplicationKeyInsightsPage}
                >
                  Key Insights
                </span>
              </div>
            </div>
          </div>
          <div className={styles.div_15}>
            {/* <span onClick={sendDataToParentHandler} style={{marginTop:"7px"}}>
            <img loading="lazy" src={notification} className={styles.img_6} />
          </span> */}
            <span onClick={redirectToApplicationLandingPage}>
              <img loading="lazy" src={heart} className={styles.img_7} />
            </span>
            {/* <img loading="lazy" src={heart} className={styles.img_7} /> */}
            <Dropdown id="dropdown_profile">
              <Dropdown.Toggle id="dropdown-basic">
                <img
                  loading="lazy"
                  src={user}
                  className={`${styles.img_8} dropdown-toggle`}
                  data-toggle="dropdown"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" className="title">
                  Hi {value_name}
                </Dropdown.Item>
                <Dropdown.Item href="#" className="sub_title">
                  Access your account and manage your orders
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={LogoutSession}
                  className="login_out_button"
                >
                  {/* <Dropdown.Item> */}
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <img loading="lazy" src={logo_sec} className={styles.img_9} />
          </div>
        </div>
        <div className={styles.div_16}>
          <div className={styles.div_17}>
            <div className={styles.div_18}>
              <a
                href="https://buytrucknbus-osp3dev.home.tatamotors/"
                style={{ color: "black", textDecoration: "none" }}
                target="_blank"
              >
                <img loading="lazy" src={backButton} className={styles.img_6} />
                &nbsp;&nbsp; Online Sales Platform
              </a>
            </div>
            <div>
              <a style={{ paddingLeft: "600px" }}>ARN Number: {value_Num}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
