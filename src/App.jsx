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
import { useDispatch, useSelector } from "react-redux";
import UserLoggedIn from "./components/UserLoggedIn";
import { setUserEntryCount } from "./store/Slices/arnSlice";
import { Toaster } from "react-hot-toast";
import { encryptMobileNo, encryptPan } from "./utils";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const dispacth = useDispatch();
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const { userData, userEntryCount } = useSelector((state) => state.arn);

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
      const body = {
        mobile_no: userData.MobNo,
        Pan_no: userData.pan,
      };
      const response = await ApiInterface.checkLoginEntries(body);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginEntryCounthandler = async () => {
    try {
      const body = {
        mobile_no: userData.MobNo,
        Pan_no: userData.pan,
      };
      const response = await ApiInterface.getLoginEntryCount(body);
      if (response.status === 200) {
        dispacth(setUserEntryCount(response?.data?.count ?? 0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && userData) {
      getLoginEntryCounthandler();
    }
  }, [userData]);

  useEffect(() => {
    if (userEntryCount <= 100 && token && userData) {
      updateLoginEntriesHandler();
    }
  }, []);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {userEntryCount > 1000 ? (
        <UserLoggedIn />
      ) : (
        <React.Fragment>
          {location.pathname.includes("Home") ? <CustomerHeader /> : <Header />}
          <Watermark />
          <IndexRoute />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
