import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import IndexRoute from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretSquareUp,
  faCaretSquareDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Watermark from "./components/WaterMark/WaterMark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CustomerHeader from "./components/CustomerHeader";
import { ApiInterface } from "./API";
import { useSelector } from "react-redux";
import UserLoggedIn from "./components/UserLoggedIn";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [userEntryCount, setUserEntryCount] = useState(null);

  const { userData } = useSelector((state) => state.arn);
  console.log(userEntryCount);

  const LogoutSession = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/thank-you");
    window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
  };

  useEffect(() => {
    const handleActivity = () => {
      if (!isLoggedIn) {
        setIsLoggedIn(true);
      }
      resetInactivityTimeout();
    };

    let inactivityTimeout;

    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        console.log("User inactive for too long. Logging out...");
        LogoutSession();
      }, 1800000);
    };

    const resetActivityListeners = () => {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      resetInactivityTimeout();
    };

    resetActivityListeners();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(inactivityTimeout);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setIsLoggedIn(!!storedToken);
  }, []);

  const updateLoginEntriesHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("mobile_no", userData.MobNo);
      formData.append("Pan_no", userData.pan);
      const response = await ApiInterface.checkLoginEntries(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginEntryCounthandler = async () => {
    try {
      const formData = new FormData();
      formData.append("mobile_no", userData.MobNo);
      formData.append("Pan_no", userData.pan);
      const response = await ApiInterface.getLoginEntryCount(formData);
      if (response.status === 200) {
        setUserEntryCount(response?.data?.count ?? 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateLoginEntriesHandler();
    getLoginEntryCounthandler();
  }, []);

  return (
    <React.Fragment>
      {userEntryCount > 5 ? (
        <div>
          <UserLoggedIn />
        </div>
      ) : (
        <React.Fragment>
          {location.pathname.includes("Home") ? <CustomerHeader /> : <Header />}
          <Watermark />
          <IndexRoute />
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
