import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonFilterSection from "../CommonComps/CommonFilterSection";
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

function AdminKeyInsight() {
  const token = localStorage.getItem("Token");
  const { arnNumber } = useSelector((state) => state.homeApi);
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

  const [indexTAT, setindexTAT] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState([]);
  const [servicedetails, setServiceDetails] = useState([""]);
  const [dueForService, setDueForService] = useState([]);
  const [VASOptions, setVASOptions] = useState([]);
  const [vasType, setVasType] = useState(null);

  const barGraphData = [
    {
      x: FleetUptimeX || [],
      y: FleetUptimeY || [],
      type: "bar",
    },
  ];
  useEffect(() => {
    if (VASOptions) setVasType(VASOptions[0]);
  }, [VASOptions]);

  const handleItemClick = (indexData) => {
    setindexTAT(indexData);
  };

  const getkeyInsightsdataHandler = async () => {
    if (Object.keys(arnNumber).length === 0 && arnNumber.constructor === Object)
      return;
    if (Object.keys(vasType).length === 0 && vasType.constructor === Object)
      return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber.value);
      formData.append("vas", vasType.value);
      const response = await ApiInterface.getKeyInsightsData(formData);
      if (response.status === 200) {
        const data = response.data;
        setTatDetails(data.tat_details);
        setServiceDetails(data.service_details);
        setDueForService(data.due_for_service);
        setTotalActiveVehicle(data?.total_active_vehicles);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const FleetupTimehandler = async () => {
    if (Object.keys(arnNumber).length === 0 && arnNumber.constructor === Object)
      return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber.value);
      formData.append("Vas-type", vasType.value);
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber.value);
      const response = await ApiInterface.getvasData(formData);
      const vasOptions = response?.data?.map((item) => ({
        label: item?.vas_type,
        value: item?.vas_type,
      }));
      setVASOptions(vasOptions ?? []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching VAS data:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getvasdataHandler();
    FleetupTimehandler();
    getkeyInsightsdataHandler();
  }, [arnNumber]);

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
          <CommonFilterSection
            VASOptions={VASOptions}
            setVasType={setVasType}
            vasType={vasType}
            searchFilterhandler={searchBasedOnVas}
          />
          <div className="container_wrapper">
            <div className="row mt-3">
              <div className="col-md-6 ">
                <div className="view-box">
                  <div className="card_heading pt10">Fleet Up-Time</div>
                  <div className="box-body p-0">
                    <div className="js-plotly-plot">
                      <BarGraph data={barGraphData} />
                    </div>
                  </div>
                </div>
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
                  heading={`Total Active Vehicle Under Fleetedge`}
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
                tabledata={servicedetails}
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
