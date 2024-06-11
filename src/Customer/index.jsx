import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ApiInterface } from "../API";
import Watermark from "../components/WaterMark";
import {
  setArnValuesForCustomer,
  setCustomerVasList,
  setCustomerVasType,
} from "../store/Slices/customerSlice";
import FleetDetails from "./FleetDetails";
import KeyInsights from "./KeyInsights";
import LandingPage from "./LandingPage";
import QuickActionModal from "./LandingPage/QuickActionModal";
import "./index.css";
import Loading from "../components/Loading/Loading";
import { generateToken } from "../utils";

const Customer = ({ setWrongUser }) => {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isOpen, arnForCustomer, arnListForCustomer } = useSelector(
    (state) => state.customer
  );
  const getvasdataHandler = async (values) => {
    setLoading(true);
    try {
      const encryptedArn = generateToken(values);
      const body = {
        encrypted_arn: encryptedArn,
      };
      const response = await ApiInterface.getvasData(body);
      if (response.status === 200) {
        const vasTypes = response.data.map((item) => ({
          value: item.vas_type,
          label: item.vas_type,
        }));
        dispatch(setCustomerVasList(vasTypes ?? []));
        dispatch(setCustomerVasType(vasTypes[0]));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching VAS data:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (arnForCustomer) {
      if (arnForCustomer?.value === "all") {
        const values = arnListForCustomer
          ?.filter((option) => option.value !== "all")
          ?.map((option) => option.value);
        const encryptedArn = generateToken(values);
        dispatch(setArnValuesForCustomer(encryptedArn));
        getvasdataHandler(values);
      } else {
        const singleValueArray = [arnForCustomer?.value];
        const encryptedArn = generateToken(singleValueArray);
        dispatch(setArnValuesForCustomer(encryptedArn));
        getvasdataHandler(singleValueArray);
      }
    }
  }, [arnForCustomer]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Watermark />
          <Routes>
            <Route
              exact
              path="/"
              element={<LandingPage setWrongUser={setWrongUser} />}
            />
            <Route path="/Fleet-details" element={<FleetDetails />} />
            <Route path="/Key-insights" element={<KeyInsights />} />
          </Routes>
        </React.Fragment>
      )}
      {isOpen && !pathname.includes("/admin") && <QuickActionModal />}
    </>
  );
};

export default Customer;
