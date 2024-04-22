import React, { useState } from "react";
import "./index.css";
import PieChartGraph from "../../components/PieChart/PieChart";
import CommonTable from "../CommonComps/CommonTable";
import CommonFilterSection from "../CommonComps/CommonFilterSection";

function AdminFleetDetails() {
  const [fmsChartData, setFmsChartData] = useState([]);
  const [amcChartData, setAmcChartData] = useState([]);
  return (
    <React.Fragment>
      <CommonFilterSection />
      <div className="container_wrapper">
        <div className="d-flex justify-content-between flex-wrap mt-2">
          <div className="graph_wrapper">
            <div>
              <div className="view-box mb-2">
                <div className="card_heading pt10">AMC Type Count</div>
                <PieChartGraph
                  data={amcChartData}
                  increaseHeight={fmsChartData.length === 0 ? true : false}
                />
              </div>
            </div>
            <div className="view-box">
              <div className="card_heading pt10">AMC Type Count</div>
              <PieChartGraph
                data={amcChartData}
                increaseHeight={fmsChartData.length === 0 ? true : false}
              />
            </div>
          </div>
          <div className="graph_wrapper">
            <CommonTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminFleetDetails;
