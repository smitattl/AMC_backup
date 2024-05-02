import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DeatiledTable from "../../components/Table/Table";
import Loading from "../../components/Loading/Loading";
import PieChartGraph from "../../components/PieChart/PieChart";
import { ApiInterface } from "../../API";
import { fleetTableColumns } from "../../StaticTableData";
import { useSelector } from "react-redux";

const FleetDetails = () => {
  const { arnList } = useSelector((state) => state.arn);
  const [Rowdata, setRowdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arnNumber, setArnNumber] = useState(arnList[0]);
  const [amcCount, setAmcCount] = useState([]);
  const [fmsCount, setFmsCount] = useState([]);

  const handleChangeARNNumber = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "All") {
      const filteredArnList = arnList.filter((option) => option !== "All");
      setArnNumber(filteredArnList);
    } else {
      setArnNumber(selectedValue);
    }
  };

  const getDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", element);
      formData.append("ARN-Number", arnNumber);
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
    if (arnNumber) {
      getAmcdataHandler();
      getDetailedViewHandler("VehicleCount");
    }
  }, [arnNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getAmcdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber);
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
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      style={{ marginBottom: "10px" }}
                    >
                      <Accordion.Header>Search Filter</Accordion.Header>
                      <Accordion.Body>
                        <form onSubmit={handleSubmit}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              gap: "10px",
                            }}
                          >
                            <Form.Group className="form_group">
                              <Form.Label>ARN Number</Form.Label>
                              <Form.Select
                                aria-label="ARN Number"
                                value={arnNumber}
                                onChange={handleChangeARNNumber}
                              >
                                <span>{arnNumber}</span>
                                {arnList.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
