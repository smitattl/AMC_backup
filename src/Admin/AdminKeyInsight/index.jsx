import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarGraph from "../../components/graph/BarGraph";
import TableInSightsComp from "../../components/TableInsightsComp";
import Speedometer from "../../images/speedometer.png";
import ScheduleIcon from "../../images/shipping-schedule.png";
import HoursIcon from "../../images/working-hours.png";
import {
  FleetDetailsColumns,
  FleetTATColumns,
  tableheaderFour,
  tableheaderOne,
  tableheaderThree,
} from "../../DummyData";
import { monthNames } from "../../StaticTableData";
import { ApiInterface } from "../../API";
import Loading from "../../components/Loading/Loading";
import FilterSection from "../AdminHome/FilterSection";
import { setVasOptions, setVasType } from "../../store/Slices/homeAPISlice";

function AdminKeyInsight() {
  const token = localStorage.getItem("Token");
  const dispatch = useDispatch();
  const { vasOptions, arnValues, vasType } = useSelector(
    (state) => state.homeApi
  );
  const [FleetUptimeX, setFleetUptimeX] = useState([]);
  const [FleetUptimeY, setFleetUptimeY] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advanceChasis, setAdvanceChasis] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [indexTAT, setindexTAT] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState([]);
  const [servicedetails, setServiceDetails] = useState([]);
  const [dueForService, setDueForService] = useState([]);

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

  const handleItemClick = (indexData) => {
    setindexTAT(indexData);
  };
  const getkeyInsightsdataHandler = async () => {
    if (!arnValues) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      formData.append("vas", vasType?.value);
      const response = await ApiInterface.getKeyInsightsData(formData);
      if (response.status === 200) {
        const data = response.data;
        setTatDetails(data.tat_details);
        setDueForService({
          ...data.due_for_service[0],
          due_for_service_schedule:
            response.data.due_for_service[0]?.free_service +
            response.data.due_for_service[0]?.Scheduled_service,
        });
        setTotalActiveVehicle(data?.total_active_vehicles);
        setAdvanceChasis(data?.advance_chassis_count);
        setInitialized(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const FleetupTimehandler = async () => {
    if (!arnValues && vasType.value !== "undefined") return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnValues);
      formData.append("Vas-type", vasType?.value);
      formData.append("Token", token);
      const response = await ApiInterface.getFleetUptime(formData);
      if (response.status === 200) {
        setFleetUptimeX(response?.data?.xlist);
        setFleetUptimeY(response?.data?.ylist);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getvasdataHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      const response = await ApiInterface.getvasData(formData);
      if (response.status === 200) {
        const vasOptionsData = response?.data?.map((item) => ({
          label: item?.vas_type,
          value: item?.vas_type,
        }));

        console.log("vasOptionsData:", vasOptionsData);

        if (vasOptionsData && vasOptionsData.length > 0) {
          dispatch(setVasOptions(vasOptionsData));
          console.log("Dispatching setVasType:", vasOptionsData[0]);
          dispatch(setVasType(vasOptionsData[0]));
        } else {
          console.log("vasOptionsData is empty");
        }
      }
    } catch (error) {
      console.error("Error fetching VAS data:", error);
    }
  };
  useEffect(() => {
    getvasdataHandler();
  }, [arnValues]);

  useEffect(() => {
    if (vasType.value !== "undefined") {
      FleetupTimehandler();
      getkeyInsightsdataHandler();
    }
  }, []);

  const searchBasedOnVas = () => {
    getkeyInsightsdataHandler();
    FleetupTimehandler();
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FilterSection searchFilterhandler={searchBasedOnVas} />
          <div className="container_wrapper">
            <div className="row mt-3">
              <div className="col-md-6 ">
                {barGraphData.length !== 0 && (
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
                  onItemClick={handleItemClick}
                />
              </div>
            </div>
            <div className="my-4">
              <TableInSightsComp
                image={ScheduleIcon}
                tabledata={dueForService}
                tableheader={tableheaderThree}
                heading={`Service Details ${
                  dueForService[0]?.Jobcard_Created_Month ||
                  `${previousMonthName} - ${previousYear}`
                }`}
              />
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default AdminKeyInsight;
