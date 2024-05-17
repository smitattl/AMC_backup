import React, { useState, useEffect } from "react";
import DeatiledTable from "../../components/Table/Table";
import Loading from "../../components/Loading/Loading";
import PieChartGraph from "../../components/PieChart/PieChart";
import { ApiInterface } from "../../API";
import { fleetTableColumns } from "../../StaticTableData";
import { useSelector } from "react-redux";
import FilterSectionForCustomer from "../FilterSectionForCustomer";

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
      formData.append("ARN-Number", arnValuesForCustomer);
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
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getAmcdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnValuesForCustomer);
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
          <div className="main_content">
            <div className="container-fluid pb-4">
              <div className="row">
                <div className="col-md-12">
                  <FilterSectionForCustomer searchData={searchData} />
                  <div className="row d-flex flex-wrap">
                    <div className="col-md-5">
                      {amcChartData.length > 0 && (
                        <div className="view-box">
                          <div className="card_heading pt10">
                            AMC Type Count
                          </div>
                          <PieChartGraph
                            data={amcChartData}
                            increaseHeight={
                              fmsChartData.length === 0 ? true : false
                            }
                          />
                        </div>
                      )}
                      {fmsChartData?.length > 0 && (
                        <div className="view-box">
                          <div className="card_heading pt10">
                            FMS Type Count
                          </div>
                          <div className="box-body p-0">
                            <div className="js-plotly-plot">
                              <PieChartGraph
                                data={fmsChartData}
                                increaseHeight={
                                  amcChartData.length === 0 ? true : false
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-7">
                      <div className="view-box">
                        <div className="card_heading pt10">Fleet Details</div>
                        <div className="box-body p-0">
                          <div className="js-plotly-plot">
                            <DeatiledTable
                              ColData={fleetTableColumns}
                              Tbldata={Rowdata}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FleetDetails;
