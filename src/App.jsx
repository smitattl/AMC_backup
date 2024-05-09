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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Watermark from "./components/WaterMark/WaterMark";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ApiInterface } from "./API";
import { useDispatch, useSelector } from "react-redux";
import UserLoggedIn from "./components/UserLoggedIn";
import {
  setParams,
  setUserData,
  setUserEntryCount,
} from "./store/Slices/arnSlice";
import { Toaster } from "react-hot-toast";
import WarningModal from "./components/WarningModal";
import QuickActionModal from "./pages/LandingPage/QuickActionModal";
import { setArnNumber, setUserMobile } from "./store/Slices/arnSlice";
import { decodeToken } from "react-jwt";
import {
  setActiveAccordionItem,
  setArnForCustomer,
  setArnListForCustomer,
  setArnValuesForCustomer,
} from "./store/Slices/customerSlice";
import Loading from "./components/Loading/Loading";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const { userData, userEntryCount, params } = useSelector(
    (state) => state.arn
  );
  const { isOpen, arnValuesForCustomer, arnForCustomer, arnListForCustomer } =
    useSelector((state) => state.customer);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);

  const LogoutSession = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/thank-you");
    window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
  };
  const handleClickActive = (element) => {
    if (element === "section1") {
      dispatch(setActiveAccordionItem("0"));
    } else if (element === "section2") {
      dispatch(setActiveAccordionItem("1"));
    }
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

  const getDecryptedDataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("DataOne", params.param1);
      formData.append("DataTwo", params.param2);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        localStorage.setItem("Token", response.data.Token);
        const { ARN, MobNo, email_id, userName } = decodeToken(
          response.data.Token
        );
        const userData = { MobNo, email_id, userName };
        dispatch(setUserData(userData));
        const arnData = ARN.map((name) => ({
          value: name,
          label: name,
        }));
        let arnListWithAll;
        const allOption = { value: "all", label: "All" };
        if (arnData.length > 1) {
          arnListWithAll = [allOption, ...arnData];
        } else {
          arnListWithAll = arnData;
        }
        const preselectedArn =
          arnListWithAll.length > 0 ? arnListWithAll[0] : null;
        dispatch(setArnListForCustomer(arnListWithAll));
        dispatch(setArnForCustomer(preselectedArn));
        setWrongUser(false);
      } else if (response.status !== 200) setWrongUser(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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

  const getLoginEntryCountHandler = async () => {
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
    if (params.param1 !== undefined && !token && !pathname.includes("/admin")) {
      getDecryptedDataHandler();
    }
  }, [token, params]);

  useEffect(() => {
    if (token && userData && !pathname.includes("/admin")) {
      getLoginEntryCountHandler();
    }
  }, [token, userData]);

  useEffect(() => {
    if (
      userEntryCount &&
      userEntryCount <= 100 &&
      !pathname.includes("/admin")
    ) {
      updateLoginEntriesHandler();
    }
  }, [userEntryCount, pathname, updateLoginEntriesHandler]);

  useEffect(() => {
    if (arnForCustomer?.value === "all") {
      const values = arnListForCustomer
        ?.filter((option) => option.value !== "all")
        ?.map((option) => option.value);
      dispatch(setArnValuesForCustomer(values));
    } else {
      dispatch(setArnValuesForCustomer(arnForCustomer?.value));
    }
  }, [arnForCustomer, arnListForCustomer, dispatch]);

  return (
    <div>
      {wrongUser && !pathname.includes("/admin") ? (
        <WarningModal />
      ) : loading ? (
        <Loading />
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
      {isOpen && !pathname.includes("/admin") && (
        <QuickActionModal handleClickActive={handleClickActive} />
      )}
    </div>
  );
}

export default App;
