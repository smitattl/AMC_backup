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
import { useNavigate } from "react-router-dom";
import Watermark from "./components/WaterMark/WaterMark";
import Header from "./components/Header";
import Footer from "./components/Footer";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

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

  return (
    <React.Fragment>
      <Header />
      <Watermark />
      <IndexRoute />
      <Footer />
    </React.Fragment>
  );
}

export default App;
