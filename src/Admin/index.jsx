import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ApiInterface } from "../API";
import {
  setArnValues,
  setVasOptions,
  setVasType,
} from "../store/Slices/homeAPISlice";
import AdminFleetDetails from "./AdminFleetDetails";
import AdminHome from "./AdminHome";
import AdminKeyInsight from "./AdminKeyInsight";
import "./index.css";
import { generateToken } from "../utils";

function Admin() {
  const dispatch = useDispatch();
  const { arnNumber, arnListForAdmin, arnValues } = useSelector(
    (state) => state.homeApi
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (arnNumber) {
      if (arnNumber?.value === "all") {
        const values = arnListForAdmin
          ?.filter((option) => option.value !== "all")
          ?.map((option) => option.value);
        const encryptedArn = generateToken(values);
        dispatch(setArnValues(encryptedArn));
        getvasdataHandler(encryptedArn);
      } else {
        const singleValueArray = arnNumber?.value;
        const encryptedArn = generateToken(singleValueArray);
        dispatch(setArnValues(encryptedArn));
        getvasdataHandler(encryptedArn);
      }
    }
  }, [arnNumber]);

  const getvasdataHandler = async (arnValues) => {
    try {
      const formData = new FormData();
      formData.append("encrypted_arn", arnValues);
      const response = await ApiInterface.getvasData(formData);
      if (response.status === 200) {
        const data = response.data;
        const vasListOptions = data?.map((item) => ({
          label: item?.vas_type,
          value: item?.vas_type,
        }));
        dispatch(setVasOptions(vasListOptions));
        dispatch(setVasType(vasListOptions[0]));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching VAS data:", error);
    }
  };

  return (
    <div className="layout_wrapper">
      <Routes>
        <Route exact path="/" element={<AdminHome />} />
        <Route path="/admin-fleet-details" element={<AdminFleetDetails />} />
        <Route path="/admin-key-insight" element={<AdminKeyInsight />} />
      </Routes>
    </div>
  );
}

export default Admin;
