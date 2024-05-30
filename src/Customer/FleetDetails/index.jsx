import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { ApiInterface } from "../../API";
import { fleetTableColumns } from "../../StaticTableData";
import { useSelector } from "react-redux";
import FilterSectionForCustomer from "../FilterSectionForCustomer";
import CommonTable from "../../Admin/CommonComps/CommonTable";
import PieChartGraph from "../../components/PieChart";

const FleetDetails = () => {
  const [Rowdata, setRowdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amcCount, setAmcCount] = useState([]);
  const [fmsCount, setFmsCount] = useState([]);
  const { arnForCustomer, arnValuesForCustomer } = useSelector(
    (state) => state.customer
  );

  const getDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", element);
      formData.append("encrypted_arn", arnValuesForCustomer);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        setRowdata(response?.data?.RowData ?? []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAmcdataHandler();
    getDetailedViewHandler("VehicleCount");
  }, []);

  const searchData = () => {
    getAmcdataHandler();
    getDetailedViewHandler("VehicleCount");
  };

  const getAmcdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("encrypted_arn", arnValuesForCustomer);
      const response = await ApiInterface.getAmcCountData(formData);
      if (response.status === 200) {
        setAmcCount(response?.data?.amc_count ?? []);
        setFmsCount(response?.data?.fms_count ?? []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const amcChartData = amcCount?.map((item) => ({
    name: item?.contract_type,
    value: item?.chassis_no,
  }));
  const fmsChartData = fmsCount?.map((item) => ({
    name: item?.contract_type,
    value: item?.chassis_no,
  }));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container_wrapper_customer">
            <FilterSectionForCustomer searchData={searchData} />
            <div className="d-flex justify-content-between flex-wrap mt-2">
              <div
                className={
                  amcChartData.length === 0 && fmsChartData.length === 0
                    ? "d-none"
                    : "graph_wrapper"
                }
              >
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
                    <div className="card_heading pt10">FMS Type Count</div>
                    <PieChartGraph
                      data={fmsChartData}
                      increaseHeight={fmsChartData.length === 0 ? true : false}
                    />
                  </div>
                )}
              </div>
              <div
                className={
                  amcChartData.length === 0 && fmsChartData.length === 0
                    ? "table_full_wrapper"
                    : "graph_wrapper"
                }
              >
                <CommonTable data={Rowdata} columns={fleetTableColumns} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FleetDetails;
