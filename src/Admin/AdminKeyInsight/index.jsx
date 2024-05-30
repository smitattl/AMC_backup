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
import fleetuptimeIcon from "../../images/uptime.png";

function AdminKeyInsight({ getvasdataHandler }) {
  const token = localStorage.getItem("Token");

  const { arnValues, vasType } = useSelector((state) => state.homeApi);
  const [FleetUptimeX, setFleetUptimeX] = useState([]);
  const [FleetUptimeY, setFleetUptimeY] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexTAT, setindexTAT] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState([]);
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("encrypted_arn", arnValues);
      formData.append("vas", vasType.value);
      const response = await ApiInterface.getKeyInsightsData(formData);
      if (response.status === 200) {
        const data = response.data;
        setDueForService(data.due_for_service);
        setTatDetails(data.tat_details);
        setTotalActiveVehicle(data?.total_active_vehicles);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const FleetupTimehandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("encrypted_arn", arnValues);
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

  useEffect(() => {
    FleetupTimehandler();
    getkeyInsightsdataHandler();
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
          <FilterSection
            searchFilterhandler={searchBasedOnVas}
            getvasdataHandler={getvasdataHandler}
          />
          <div className="container_wrapper">
            <div className="insight_tables_wrapper  my-3">
              <div className="bar_graph_section">
                {barGraphData.length !== 0 && (
                  <div className="view-box">
                    <div className="card_heading">
                      <img
                        src={fleetuptimeIcon}
                        alt="/"
                        className="fleet_uptime_icon"
                      />
                      <h5 className="key_insight_table_title">Fleet Up-Time</h5>
                    </div>
                    <div className="box-body">
                      <div className="js-plotly-plot">
                        <BarGraph data={barGraphData} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="tables_insight">
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
