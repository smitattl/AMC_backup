import React, { useEffect, useState } from "react";
import "./index.css";
import PieChartGraph from "../../components/PieChart/PieChart";
import CommonTable from "../CommonComps/CommonTable";
import { useSelector } from "react-redux";
import { ApiInterface } from "../../API";
import { fleetTableColumns } from "../../StaticTableData";
import FilterSection from "../AdminHome/FilterSection";
import Loading from "../../components/Loading/Loading";

function AdminFleetDetails() {
  const { arnNumber } = useSelector((state) => state.homeApi);
  const [amcChartData, setAmcChartData] = useState([]);
  const [fmsChartData, setFmsChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAmcdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber.value);
      const response = await ApiInterface.getAmcCountData(formData);
      if (response.status === 200) {
        const amcData = response?.data?.amc_count?.map((item) => ({
          name: item?.contract_type,
          value: item?.chassis_no,
        }));
        const fmsData = response?.data?.fms_count?.map((item) => ({
          name: item?.contract_type,
          value: item?.chassis_no,
        }));
        setAmcChartData(amcData);
        setFmsChartData(fmsData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", element);
      formData.append("ARN-Number", arnNumber.value);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        setTableData(response?.data?.RowData ?? []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (arnNumber) {
      getAmcdataHandler();
      getDetailedViewHandler("VehicleCount");
    }
  }, [arnNumber]);

  const searchFilterhandler = () => {
    getAmcdataHandler();
    getDetailedViewHandler("VehicleCount");
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FilterSection searchFilterhandler={searchFilterhandler} />
          <div className="container_wrapper">
            <div className="d-flex justify-content-between flex-wrap mt-2">
              <div className="graph_wrapper">
                {amcChartData.length !== 0 && (
                  <div className="view-box mb-2">
                    <div className="card_heading pt10">AMC Type Count</div>
                    <PieChartGraph
                      data={amcChartData}
                      increaseHeight={fmsChartData.length === 0 ? true : false}
                    />
                  </div>
                )}
                {fmsChartData.length !== 0 && (
                  <div className="view-box">
                    <div className="card_heading pt10">AMC Type Count</div>
                    <PieChartGraph
                      data={fmsChartData}
                      increaseHeight={fmsChartData.length === 0 ? true : false}
                    />
                  </div>
                )}
              </div>
              <div className="graph_wrapper">
                <CommonTable data={tableData} columns={fleetTableColumns} />
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default AdminFleetDetails;
