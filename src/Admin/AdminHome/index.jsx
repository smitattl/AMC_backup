import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import FleetOverView from "./FleetOverView";
import "./index.css";
import AccordionTable from "./AccordionTable";
import { useDispatch, useSelector } from "react-redux";
import { ApiInterface } from "../../API";
import {
  setArnListForAdmin,
  setArnNumber,
  setFleetData,
} from "../../store/Slices/homeAPISlice";
import Loading from "../../components/Loading/Loading";

function AdminHome() {
  const dispatch = useDispatch();
  const { arnNumber, fleetData, arnListForAdmin } = useSelector(
    (state) => state.homeApi
  );
  const [loading, setLoading] = useState(false);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);
  const [renewalData, setRenewalData] = useState([]);

  const arnValues = arnListForAdmin
    .filter((item) => item.value !== "all")
    .map((item) => item.value);

  const getGenericInformationHandler = async () => {
    try {
      const formData = new FormData();
      if (arnNumber.value === "all") {
        formData.append("ARN-Number", arnValues);
      } else formData.append("ARN-Number", arnNumber.value);
      const response = await ApiInterface.getGenericInformation(formData);
      if (response.status === 200) {
        dispatch(setFleetData(response.data));
      }
    } catch (error) {
      console.error("Error fetching generic information:", error);
    }
  };

  const getDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", element);
      if (arnNumber.value === "all") {
        formData.append("ARN-Number", arnValues);
      } else formData.append("ARN-Number", arnNumber.value);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        if (element === "ServiceScheduled") {
          setServiceScheduleData(response?.data?.RowData ?? []);
        } else if (element === "Reneawls") {
          setRenewalData(response?.data?.RowData ?? []);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const searchFilterhandler = () => {
    getGenericInformationHandler();
    getDetailedViewHandler("ServiceScheduled");
    getDetailedViewHandler("Reneawls");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <FilterSection  searchFilterhandler={searchFilterhandler}/>
          <FleetOverView fleetData={fleetData} />
          <AccordionTable
            renewalData={renewalData}
            serviceScheduleData={serviceScheduleData}
          />
        </div>
      )}
    </>
  );
}

export default AdminHome;
