import React, { useState } from "react";
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

function AdminKeyInsight() {
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
  const [barGraphData, setBarGraphData] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState([]);
  const [servicedetails, setServiceDetails] = useState([""]);
  const [dueForService, setDueForService] = useState([]);
  const [advanceChasis, setAdvanceChasis] = useState([]);
  const [FleetUptimeX, setFleetUptimeX] = useState([]);
  const [FleetUptimeY, setFleetUptimeY] = useState([]);
  const [vasType, setVasType] = useState("AMC");
  const [loading, setLoading] = useState(false);

  const handleItemClick = (indexData) => {
    setindexTAT(indexData);
  };

  return (
    <div className="">
      <CommonFilterSection />
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
    </div>
  );
}

export default AdminKeyInsight;
