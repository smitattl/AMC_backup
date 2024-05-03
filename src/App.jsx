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
import { ApiInterface } from "./API";
import { useDispatch, useSelector } from "react-redux";
import UserLoggedIn from "./components/UserLoggedIn";
import {
  setArnList,
  setArnNumber,
  setUserData,
  setUserEntryCount,
  setUserMobile,
} from "./store/Slices/arnSlice";
import { Toaster } from "react-hot-toast";
import { decodeToken } from "react-jwt";
import WarningModal from "./components/WarningModal";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const { userData, userEntryCount, params, arnNumber } = useSelector(
    (state) => state.arn
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);

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
      formData.append("mobile_no", params.param1);
      formData.append("Pan_no", params.param2);
      const response = await ApiInterface.checkLoginEntries(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginEntryCounthandler = async () => {
    try {
      const formData = new FormData();
      formData.append("mobile_no", params.param1);
      formData.append("Pan_no", params.param2);
      const response = await ApiInterface.getLoginEntryCount(formData);
      if (response.status === 200) {
        dispatch(setUserEntryCount(response?.data?.count ?? 0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && userData && !pathname.includes("/admin")) {
      getLoginEntryCounthandler();
    }
  }, [userData]);

  const getARNDetailsHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber);
      formData.append("Token", token);
      const response = await ApiInterface.getARNDetails(formData);
      if (response.status === 200) {
        dispatch(setUserData(response.data));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userEntryCount <= 100 && !pathname.includes("/admin")) {
      updateLoginEntriesHandler();
    }
  }, []);

  useEffect(() => {
    if (arnNumber) {
      getARNDetailsHandler();
    }
  }, []);

  return (
    <div>
      {wrongUser && !pathname.includes("/admin") ? (
        <WarningModal />
      ) : (
        <React.Fragment>
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
              <Header />
              <Watermark />
              <IndexRoute
                setWrongUser={setWrongUser}
                userEntryCount={userEntryCount}
              />
              <Footer />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
