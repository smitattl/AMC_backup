import React, { useState, useEffect } from "react";
import LandingPage from "../../pages/amc-pages/LandingPage";
import DropdownWithCheckbox from "../CheckboxSelect/CheckboxSelect";
import styles from "./Popup.module.css";
import { ApiInterface } from "../../API";

const Popup = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const parts = url.split("?");
    const userIdFromUrl = parts[parts.length - 1];
    setUserId(userIdFromUrl);
  }, []);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [ARN, setARN] = useState([]);
  const [UserDeatils, setUserDeatils] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [ARNData, setARNData] = React.useState([]);

  const FetchARN = async () => {
    try {
      const body = {};
      const response = await ApiInterface.ApiInterface(body);
      if (response.status === 200) {
        setARN(response?.data?.ARNList);
        setUserDeatils(response.data);
        localStorage.setItem("ARN-Number", response?.data?.ARNList);
        localStorage.setItem("ARN-Name", response?.data?.NameList);
        localStorage.setItem("ARN-Contact", response?.data?.MobNo);
        setARN(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchARN();
  }, []);

  const RedirectOSP = (newTabUrl) => {
    window.location.href = newTabUrl;
  };

  const getARNDetailsHandler = async () => {
    try {
      const body = {};
      const response = await ApiInterface.getARNDetails(body);
      if (response.status === 200) {
        localStorage.setItem("ARN-Name", response.data.NameList);
        localStorage.setItem("ARN-Contact", response.data.MobNo);
        localStorage.setItem("Token", response.data.Token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckboxChange = (selectedOptions) => {
    localStorage.setItem("ARN-Number", selectedOptions);
    getARNDetailsHandler(selectedOptions);
    setIsOpen(!isOpen);
    setARNData(selectedOptions);
    setShowComponent(true);
  };

  return (
    <div>
      <div>
        {isOpen && (
          <div className={styles.popupcontainer}>
            <div className={styles.popupcontent}>
              <h4 className={styles.headLabel}>Please select ARN number</h4>
              {open ? (
                <div>
                  <p>Please enter correct Mobile or PAN number.</p>
                  <button
                    className={styles.button}
                    onClick={() =>
                      RedirectOSP("https://buytrucknbus.tatamotors.com/")
                    }
                  >
                    Return to my profile
                  </button>
                  <p className={styles.required}>
                    Note: Kindly use Mobile number and PAN card provided at the
                    time of Vehicle purchase
                  </p>
                </div>
              ) : (
                <DropdownWithCheckbox
                  options={ARN}
                  onCheckboxChange={handleCheckboxChange}
                />
              )}
            </div>
          </div>
        )}
        {showComponent && (
          <LandingPage ARNList={ARNData} userData={UserDeatils} />
        )}
      </div>
    </div>
  );
};

export default Popup;
