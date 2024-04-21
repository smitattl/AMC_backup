import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const [agreed, setAgreed] = useState(false);
  const [flagCheck, setflagCheck] = useState(true);

  // const FetchARNFlagInsert = () => {
  //   const FormData = require("form-data");
  //   const data = new FormData();
  //   data.append("DataOne", param1);
  //   data.append("DataTwo", param2);

  //   const config = {
  //     method: "post",
  //     url: `${API_ROOT}/Terms-Condition/accept`,
  //     headers: {
  //       Authorization: "Basic YWRtaW4xOjEyMw==",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       // console.log("Test data ------------>", JSON.stringify(response.data));
  //       if (response.data.Check === "Inserted True") {
  //         // alert("add mob..");
  //         setAgreed(true);
  //         setflagCheck(false);
  //       }
  //       // Test data ------------> {"Check":"Inserted True"}
  //       // Test data ------------> {"Check":[[true]]}
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setOpen(true);
  //     });
  // };

  const FetchARNFlagInsert = async () => {
    try {
      const body = {};
      const response = await ApiInterface.getTermsandConditionAcceptData(body);
      if (response.status === 200) {
        setAgreed(true);
        setflagCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const FetchARN = () => {
  //   const FormData = require("form-data");
  //   const data = new FormData();
  //   data.append("DataOne", param1);
  //   data.append("DataTwo", param2);

  //   const config = {
  //     method: "post",
  //     //   url: `${API_ROOT}/de-key``,
  //     url: `${API_ROOT}/de-key`,
  //     headers: {
  //       Authorization: "Basic YWRtaW4xOjEyMw==",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       // console.log("Test data ------------>",JSON.stringify(response.data));
  //       const User = [];
  //       // FetchARNFlagCheck(response.data.ARNList);
  //       const RespData = response.data.ARNList;
  // User.push(response.data.NameList);
  //       User.push(response.data.MobNo);
  //       // console.log("User Details -------------->", User);
  //       // setARN(['Option 1', 'Option 2', 'Option 3']);

  //       setARN(RespData);
  //       setUserDeatils(User);
  //       // localStorage.setItem("ARN-Number", response.data.ARNList);
  //       // localStorage.setItem("ARN-Name", response.data.NameList);
  //       // localStorage.setItem("ARN-Contact", response.data.MobNo);
  //       // setARN(0);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setARN(0);
  //       setOpen(true);
  //     });
  // };

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

  // const ARNDetails = (ARN) => {
  //   const FormData = require("form-data");
  //   const data = new FormData();
  //   // data.append('ARN-Number', 'AR02-21-1146759422301');
  //   data.append("ARN-Number", ARN);

  //   const config = {
  //     method: "post",
  //     url: `${API_ROOT}/ARN-details`,
  //     headers: {
  //       Authorization: "Basic YWRtaW4xOjEyMw==",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       // console.log("ARN details data ------------>",JSON.stringify(response.data));
  //       // console.log("name ---------->", response.data.NameList);
  //       // console.log("mob no ---------->", response.data.MobNo);
  //       // console.log("token ---------->", response.data.Token);
  //       const User = [];
  //       // FetchARNFlagCheck(response.data.ARNList);
  //       const RespData = response.data.ARNList;
  //       localStorage.setItem("ARN-Name", response.data.NameList);
  //       localStorage.setItem("ARN-Contact", response.data.MobNo);
  //       localStorage.setItem("Token", response.data.Token);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const getARNDetailsHandler = async () => {
    try {
      const body = {};
      const response = await ApiInterface.getARNDetails(body);
      if (response.status === 200) {
        const RespData = response.data.ARNList;
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
