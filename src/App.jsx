import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretSquareUp,
  faCaretSquareDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  Route,
  Routes,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Admin from "./Admin";
import Customer from "./Customer";
import Logout from "./components/Logout/Logout";
import Error from "./components/Error";
import FooterSection from "./components/FooterSection";
import { ApiInterface } from "./API";
import { decodeToken } from "react-jwt";
import {
  setArnForCustomer,
  setArnListForCustomer,
  setCustomerData,
  setIsOpen,
} from "./store/Slices/customerSlice";
import { useDispatch } from "react-redux";
import WarningModal from "./components/WarningModal";
import RestrictedModal from "./components/RestrictedModal";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  const queryString = search;
  const urlParams = new URLSearchParams(queryString);
  let encryptedToken = urlParams.get("token");

  const [isErrorPage, setIsErrorPage] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [loginEntries, setLoginEntries] = useState(null);

  const storedToken = sessionStorage.getItem("encryptedToken");

  useEffect(() => {
    if (!encryptedToken && storedToken) {
      encryptedToken = storedToken;
    }
  }, [encryptedToken, storedToken]);

  const routes = [
    "/admin",
    "/admin/admin-fleet-details",
    "admin/admin-key-insight",
    `/Home`,
    "/Home/Fleet-details",
    "/Home/Key-insights",
  ];

  useEffect(() => {
    if (pathname.includes("/Home/") && !storedToken) {
      getDecryptedDataHandler();
      checkLoginEntries();
      getLoginEntries();
      urlParams.delete("token");
      sessionStorage.setItem("encryptedToken", encryptedToken);
      navigate(pathname, { replace: true });
    } else return;
  }, []);

  useEffect(() => {
    if (wrongUser) {
      setTimeout(() => {
        window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
      }, 4000);
    }
  }, [wrongUser]);

  useEffect(() => {
    const isValidRoute = routes.some((route) => matchPath(route, pathname));
    setIsErrorPage(!isValidRoute);
  }, [pathname, routes]);

  const getDecryptedDataHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("encryptedToken", encryptedToken);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        localStorage.setItem("encryptedToken", encryptedToken);
        const { ARN, MobNo, email_id, userName, IpAddress, loginTime } =
          decodeToken(response.data.Token);
        const userData = { MobNo, email_id, userName, IpAddress, loginTime };
        dispatch(setCustomerData(userData));
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
        dispatch(setArnListForCustomer(arnListWithAll));
        dispatch(setArnForCustomer(arnListWithAll[0]));
        dispatch(setIsOpen(true));
        setWrongUser(false);
      } else if (response.status !== 200) {
        setWrongUser(true);
        dispatch(setIsOpen(false));
      } else if (response.status === 500) {
        setWrongUser(true);
        dispatch(setIsOpen(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginEntries = async () => {
    try {
      const formData = new FormData();
      formData.append("encryptedToken", encryptedToken);
      const response = await ApiInterface.checkLoginEntries(formData);
      if (response.status === 200) {
        setLoginEntries(response?.data?.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginEntries = async () => {
    try {
      const formData = new FormData();
      formData.append("encryptedToken", encryptedToken);
      const response = await ApiInterface.getLoginEntryCount(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (storedToken && !pathname.includes("Home")) {
      navigate("/Home");
    }
  }, [pathname]);

  return (
    <div>
      {loginEntries > 6 ? (
        <RestrictedModal />
      ) : (
        <React.Fragment>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
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
          <React.Fragment>
            {!isErrorPage && <Header />}
            <Routes>
              <Route path="admin/*" element={<Admin />} />
              <Route
                path="Home/*"
                element={
                  <Customer
                    wrongUser={wrongUser}
                    setWrongUser={setWrongUser}
                    // loading={loading}
                    // setLoading={setLoading}
                  />
                }
              />
              <Route path="/thank-you" element={<Logout />} />
              <Route path="*" element={<Error />} />
            </Routes>
            {!isErrorPage && <FooterSection />}
            {wrongUser && <WarningModal />}
          </React.Fragment>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
