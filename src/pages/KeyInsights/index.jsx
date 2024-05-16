import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Speedometer from "../../images/speedometer.png";
import ScheduleIcon from "../../images/shipping-schedule.png";
import HoursIcon from "../../images/working-hours.png";
import { ApiInterface } from "../../API";
import Loading from "../../components/Loading/Loading";

import {
  FleetDetailsColumns,
  FleetTATColumns,
  tableheaderFour,
  tableheaderOne,
  tableheaderThree,
} from "../../DummyData";
import BarGraph from "../../components/graph/BarGraph";
import TableInSightsComp from "../../components/TableInsightsComp";
import { monthNames } from "../../StaticTableData";
import { useDispatch, useSelector } from "react-redux";
import FilterSectionForCustomer from "../CommonComponents/FilterSectionForCustomer";
import { setSelectVasType } from "../../store/Slices/customerSlice";

const KeyInsights = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const {
    chasisNumber,
    arnValuesForCustomer,
    selectSearchType,
    vehicleRegistrationNo,
    selectVasType,
  } = useSelector((state) => state.customer);

  const [vasOptions, setVasOptions] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState({});
  const [servicedetails, setServiceDetails] = useState({});
  const [dueForService, setDueForService] = useState({});
  const [advanceChasis, setAdvanceChasis] = useState({});
  const [FleetUptimeX, setFleetUptimeX] = useState([]);
  const [FleetUptimeY, setFleetUptimeY] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let previousMonth, previousYear;
  if (currentMonth === 1) {
    previousMonth = 12;
    previousYear = currentYear - 1;
  } else {
    previousMonth = currentMonth - 1;
    previousYear = currentYear;
  }
  const previousMonthName = monthNames[previousMonth - 1];
  const barGraphData = [
    {
      x: FleetUptimeX || [],
      y: FleetUptimeY || [],
      type: "bar",
    },
  ];

  const getkeyInsightsdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnValuesForCustomer);
      formData.append("vas", selectVasType.value);
      const response = await ApiInterface.getKeyInsightsData(formData);
      if (response.status === 200) {
        const data = response.data;
        setDueForService({
          ...data.due_for_service[0],
          due_for_service_schedule:
            data?.due_for_service[0]?.free_service +
            data?.due_for_service[0]?.Scheduled_service,
        });
        setTatDetails(data.tat_details);
        setTotalActiveVehicle(data?.total_active_vehicles);
        setAdvanceChasis(data?.advance_chassis_count);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const FleetupTimehandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnValuesForCustomer);
      formData.append("Vas-type", selectVasType.value);
      formData.append("Token", token);
      const response = await ApiInterface.getFleetUptime(formData);
      if (response.status === 200) {
        setFleetUptimeX(response?.data?.xlist);
        setFleetUptimeY(response?.data?.ylist);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getChasisDatahandler = async () => {
    try {
      const body = {
        chassis_no: chasisNumber,
      };
      const response = await ApiInterface.getKeyInsightsDataByChasis(body);
      if (response.status === 200) {
        setFleetUptimeX(response?.data?.xlist);
        setFleetUptimeY(response?.data?.ylist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataByVehicleRegNoHandler = async () => {
    try {
      const body = {
        vehicle_registration_no: vehicleRegistrationNo,
      };
      const response = await ApiInterface.getVehicledataforCustomer(body);
      if (response.status === 200) {
        const data = response.data;
        setTatDetails(data.tat_details);
        setServiceDetails(data.service_details);
        setDueForService(data.due_for_service);
        setTotalActiveVehicle(data?.total_active_vehicles);
        setAdvanceChasis(data?.advance_chassis_count);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FleetupTimehandler();
    getkeyInsightsdataHandler();
  }, []);

  const searchData = () => {
    getkeyInsightsdataHandler();
    if (selectSearchType.value === "chassis_name" && chasisNumber !== "")
      getChasisDatahandler();
    else if (
      selectSearchType.value === "vehicle_registration_no" &&
      vehicleRegistrationNo !== ""
    )
      getDataByVehicleRegNoHandler();
    else if (
      selectSearchType.value === "arn_number" &&
      arnValuesForCustomer !== null
    )
      FleetupTimehandler();
  };

  return (
    <>
      <div className="main_content">
        {loading ? (
          <Loading />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <FilterSectionForCustomer
                  searchData={searchData}
                  vasOptions={vasOptions}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                {barGraphData.length > 0 && (
                  <div className="view-box">
                    <div className="card_heading pt10">Fleet Up-Time</div>
                    <div className="box-body p-0">
                      <div className="js-plotly-plot">
                        <BarGraph data={barGraphData} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "2px",
                }}
              >
                <TableInSightsComp
                  image={Speedometer}
                  tabledata={totalActiveVehicle}
                  tableheader={tableheaderOne}
                  heading="Total Active Vehicle Under Fleetedge"
                  FleetDetailsColumns={FleetDetailsColumns}
                />
                <TableInSightsComp
                  image={HoursIcon}
                  tabledata={tatDetails}
                  tableheader={tableheaderFour}
                  heading="Fleet Turn Around Time"
                  FleetDetailsColumns={FleetTATColumns}
                  fleetTurn
                />
              </div>
            </div>
            <div className="my-4">
              <TableInSightsComp
                image={ScheduleIcon}
                tabledata={dueForService}
                tableheader={tableheaderThree}
                heading={`Service Details ${
                  (dueForService && dueForService[0]?.Jobcard_Created_Month) ||
                  `${previousMonthName} - ${previousYear}`
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KeyInsights;
