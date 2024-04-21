import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
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
import { useSelector } from "react-redux";

const KeyInsights = () => {
  const { arnList } = useSelector((state) => state.arn);
  const token = localStorage.getItem("Token");

  const [indexTAT, setindexTAT] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [arnNumber, setArnNumber] = useState([
    localStorage.getItem("ARN-Number"),
  ]);

  const [VASOptions, setVASOptions] = useState([]);
  const [totalActiveVehicle, setTotalActiveVehicle] = useState([]);
  const [tatDetails, setTatDetails] = useState([]);
  const [servicedetails, setServiceDetails] = useState([""]);
  const [dueForService, setDueForService] = useState([]);
  const [advanceChasis, setAdvanceChasis] = useState([]);
  const [FleetUptimeX, setFleetUptimeX] = useState([]);
  const [FleetUptimeY, setFleetUptimeY] = useState([]);
  const [vasType, setVasType] = useState("AMC");
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

  const getvasdataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber);
      const response = await ApiInterface.getvasData(formData);
      setVASOptions(response?.data ?? []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching VAS data:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getkeyInsightsdataHandler = async () => {
    setInitialized(true);
    try {
      const formData = new FormData();
      formData.append("arn_no", arnNumber);
      formData.append("vas", vasType);
      const response = await ApiInterface.getKeyInsightsData(formData);
      if (response.status === 200) {
        const data = response.data;
        setTatDetails(data.tat_details);
        setServiceDetails(data.service_details);
        setDueForService(data.due_for_service);
        setTotalActiveVehicle(data?.total_active_vehicles);
        setAdvanceChasis(data?.advance_chassis_count);
        setInitialized(false);
      }
    } catch (error) {
      console.log(error);
    }
    setInitialized(false);
  };

  const FleetupTimehandler = async () => {
    setInitialized(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber);
      formData.append("Vas-type", vasType);
      formData.append("Token", token);
      const response = await ApiInterface.getFleetUptime(formData);
      if (response.status === 200) {
        setFleetUptimeX(response?.data?.xlist);
        setFleetUptimeY(response?.data?.ylist);
      }
    } catch (error) {
      console.log(error);
    }
    setInitialized(false);
  };

  const handleItemClick = (indexData) => {
    setindexTAT(indexData);
  };

  useEffect(() => {
    if (arnNumber) {
      getvasdataHandler();
      FleetupTimehandler();
      getkeyInsightsdataHandler();
    }
  }, [arnNumber, vasType]);

  const handleChangeARNNumber = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "All") {
      const filteredArnList = arnList.filter((option) => option !== "All");
      setArnNumber(filteredArnList);
    } else {
      setArnNumber(selectedValue);
    }
  };
  const handleChangeVasType = (e) => {
    setVasType(e.target.value);
  };

  return (
    <>
      <div className="main_content">
        {initialized ? (
          <Loading />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <Accordion>
                  <Accordion.Item eventKey="0" style={{ marginBottom: "10px" }}>
                    <Accordion.Header>Search Filter</Accordion.Header>
                    <Accordion.Body>
                      <form onSubmit={(e) => e.preventDefault()}>
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
                          <Form.Group className="form_group">
                            <Form.Label>VAS Type</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              id="selectOption"
                              value={vasType}
                              onChange={handleChangeVasType}
                            >
                              <span>
                                {
                                  VASOptions?.find(
                                    (option) => option.vas_type === vasType
                                  )?.vas_type
                                }
                              </span>
                              {VASOptions.map((option) => (
                                <option
                                  key={option.vas_type}
                                  value={option.vas_type}
                                >
                                  {option.vas_type}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </form>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div className="row">
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
        )}
      </div>
    </>
  );
};

export default KeyInsights;
