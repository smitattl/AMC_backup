import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ApiInterface } from "../API";
import WarningModal from "../components/WarningModal";
import Watermark from "../components/WaterMark/WaterMark";
import {
  setArnValuesForCustomer,
  setCustomerVasList,
  setCustomerVasType,
  setPreventApiCalling,
} from "../store/Slices/customerSlice";
import FleetDetails from "./FleetDetails";
import KeyInsights from "./KeyInsights";
import LandingPage from "./LandingPage";
import QuickActionModal from "./LandingPage/QuickActionModal";

const Customer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isOpen, arnForCustomer, arnListForCustomer } = useSelector(
    (state) => state.customer
  );
  const [wrongUser, setWrongUser] = useState(false);

  const getvasdataHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("arn_no", values);
      const response = await ApiInterface.getvasData(formData);
      if (response.status === 200) {
        const vasTypes = response.data.map((item) => ({
          value: item.vas_type,
          label: item.vas_type,
        }));
        dispatch(setCustomerVasList(vasTypes ?? []));
        dispatch(setCustomerVasType(vasTypes[0]));
      }
    } catch (error) {
      console.error("Error fetching VAS data:", error);
    }
  };
  useEffect(() => {
    if (arnForCustomer) {
      if (arnForCustomer?.value === "all") {
        const values = arnListForCustomer
          ?.filter((option) => option.value !== "all")
          ?.map((option) => option.value);
        dispatch(setArnValuesForCustomer(values));
        getvasdataHandler(values);
      } else {
        const singleValueArray = [arnForCustomer?.value];
        dispatch(setArnValuesForCustomer(singleValueArray));
        getvasdataHandler(singleValueArray);
      }
    }
  }, [arnForCustomer]);

  return (
    <>
      <React.Fragment>
        <Watermark />
        <Routes>
          <Route
            exact
            path="/:param1/:param2"
            element={<LandingPage setWrongUser={setWrongUser} />}
          />
          <Route path="/Fleet-details" element={<FleetDetails />} />
          <Route path="/Key-insights" element={<KeyInsights />} />
        </Routes>
      </React.Fragment>
      {isOpen && !pathname.includes("/admin") && <QuickActionModal />}
      {wrongUser && <WarningModal />}
    </>
  );
};

export default Customer;

// <Routes>
//   <Route
//     path="/Home/:param1/:param2"
//     element={
//       <LandingPage
//         setWrongUser={setWrongUser}
//         userEntryCount={userEntryCount}
//       />
//     }
//   />
//     <Routes>
//     <Route exact path="/" element={<AdminHome />} />
//     <Route path="/admin-fleet-details" element={<AdminFleetDetails />} />
//     <Route path="/admin-key-insight" element={<AdminKeyInsight />} />
//   </Routes>

//   <Route path="/" element={<PrivateRoute />}>
//     <Route path="/Home/Fleet-details" element={<FleetDetails />} />
//     <Route path="/Home/Key-insights" element={<KeyInsights />} />
//     <Route path="/thank-you" element={<Logout />} />
//   </Route>
//   <Route path="*" element={<Error />} />
// </Routes>
