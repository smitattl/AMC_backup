import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import FleetOverView from "./FleetOverView";
import "./index.css";
import AccordionTable from "./AccordionTable";
import { useDispatch, useSelector } from "react-redux";
import { ApiInterface } from "../../API";
import {
  setFleetData,
  setRenewalData,
  setServiceScheduleData,
} from "../../store/Slices/homeAPISlice";
import Loading from "../../components/Loading/Loading";

function AdminHome() {
  const dispatch = useDispatch();
  const {
    arnNumber,
    fleetData,
    arnListForAdmin,
    renewalData,
    serviceScheduleData,
  } = useSelector((state) => state.homeApi);

  const [loading, setLoading] = useState(false);

  const arnValues = arnListForAdmin
    ?.filter((item) => item.value !== "all")
    ?.map((item) => item.value);

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
      formData.append("Section", "ServiceScheduled");
      if (arnNumber.value === "all") {
        formData.append("ARN-Number", arnValues);
      } else formData.append("ARN-Number", arnNumber.value);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        dispatch(setServiceScheduleData(response?.data?.RowData ?? []));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getDetailedViewHandlerForRenwal = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", "Renewals");
      if (arnNumber.value === "all") {
        formData.append("ARN-Number", arnValues);
      } else formData.append("ARN-Number", arnNumber.value);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        dispatch(setRenewalData(response?.data?.RowData ?? []));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const searchFilterhandler = (e) => {
    e.preventDefault();
    if (
      Object.keys(arnNumber).length === 0 &&
      arnNumber.constructor === Object
    ) {
      return;
    }
    getGenericInformationHandler();
    getDetailedViewHandler();
    getDetailedViewHandlerForRenwal();
  };
  useEffect(() => {
    if (arnNumber) {
      getGenericInformationHandler();
      getDetailedViewHandler();
      getDetailedViewHandlerForRenwal();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <FilterSection searchFilterhandler={searchFilterhandler} />
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
