import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminKeyInsight from "./AdminKeyInsight";
import AdminFleetDetails from "./AdminFleetDetails";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setVasOptions, setVasType } from "../store/Slices/homeAPISlice";
import { ApiInterface } from "../API";
import Loading from "../components/Loading/Loading";

function Admin() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { arnValues } = useSelector((state) => state.homeApi);

  const getvasdataHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      const response = await ApiInterface.getvasData(formData);
      if (response.status === 200) {
        const vasListOptions = response.data.map((item) => ({
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

  useEffect(() => {
    getvasdataHandler();
  }, [arnValues]);

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
