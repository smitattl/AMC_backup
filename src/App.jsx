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
  useParams,
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

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const token = localStorage.getItem("token");

  const param1 = localStorage.getItem("param1");
  const param2 = localStorage.getItem("param2");

  const routes = [
    "/admin",
    "/admin/admin-fleet-details",
    "admin/admin-key-insight",
    `/Home/${param1}/${param2}`,
    "/Home/Fleet-details",
    "/Home/Key-insights",
  ];

  useEffect(() => {
    const isValidRoute = routes.some((route) =>
      matchPath(route, location.pathname)
    );
    setIsErrorPage(!isValidRoute);
  }, [location.pathname, routes]);

  const getDecryptedDataHandler = async (param1, param2) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("DataOne", param1);
      formData.append("DataTwo", param2);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        localStorage.setItem("Token", response.data.Token);
        const { ARN, MobNo, email_id, userName } = decodeToken(
          response.data.Token
        );
        const userData = { MobNo, email_id, userName };
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
        setLoading(false);
        dispatch(setIsOpen(false));
      } else if (response.status === 500) {
        setWrongUser(true);
        dispatch(setIsOpen(false));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token === null && location.pathname.startsWith("/Home/")) {
      const params = location.pathname.split("/").filter(Boolean);
      if (params.length >= 3) {
        const param1 = params[1];
        const param2 = params[2];
        localStorage.setItem("param1", param1);
        localStorage.setItem("param2", param2);
        getDecryptedDataHandler(param1, param2);
      }
    }
  }, [param1]);

  return (
    <div>
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
                  loading={loading}
                  setLoading={setLoading}
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
    </div>
  );
}

export default App;
