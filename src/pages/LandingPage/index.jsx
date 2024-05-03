import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { Link as ScrollLink, Element } from "react-scroll";
import Form from "react-bootstrap/Form";
import { ApiInterface } from "../../API";
import transportIcon from "../../images/transportation.png";
import renewable from "../../images/renewalTwo.png";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";
import "./HomePage.css";
import Loading from "../../components/Loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import {
  setArnList,
  setFleetData,
  setParams,
  setArnNumber,
  setUserData,
  setUserMobile,
} from "../../store/Slices/arnSlice";
import TableAccordion from "./TableAccordion";
import QuickActionModal from "./QuickActionModal";

const LandingPage = ({ setWrongUser, userEntryCount }) => {
  const { param1, param2 } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem("Token");
  const { arnList, userData, userMobile, arnNumber, fleetData } = useSelector(
    (state) => state.arn
  );

  useEffect(() => {
    dispatch(setParams({ param1, param2 }));
  }, [param1, param2]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get("referrer");
  }, [location.search]);

  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenNotifiction, setisOpenNotifiction] = useState(false);
  const [Rowdata, setRowdata] = useState([]);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);

  const getDecryptedDataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("DataOne", param1);
      formData.append("DataTwo", param2);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        const myDecodedToken = decodeToken(response.data.Token);
        localStorage.setItem("Token", response.data.Token);
        dispatch(setArnNumber(myDecodedToken.ARN[0]));
        localStorage.setItem("ARN-Number", myDecodedToken.ARN[0]);
        localStorage.setItem(
          "ARN-NumberList",
          JSON.stringify(myDecodedToken.ARN)
        );
        localStorage.setItem("ARN-Contact", myDecodedToken.MobNo);
        const arnList = myDecodedToken?.ARN;
        const mobileNumber = myDecodedToken.MobNo;
        dispatch(setArnList([...arnList, "All"]));
        dispatch(setUserMobile(mobileNumber));

        setWrongUser(false);
      } else if (response.status !== 200) setWrongUser(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDecryptedDataHandler();
  }, []);

  const getGenericInformationHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber);
      const response = await ApiInterface.getGenericInformation(formData);
      if (response.status === 200) {
        dispatch(setFleetData(response.data));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        if (element === "ServiceScheduled") {
          setServiceScheduleData(response?.data?.RowData ?? []);
        } else if (element === "Reneawls") {
          setRowdata(response?.data?.RowData ?? []);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChangeARNNumber = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "All") {
      const filteredArnList = arnList?.filter((option) => option !== "All");
      dispatch(setArnNumber(filteredArnList));
    } else {
      dispatch(setArnNumber(selectedValue));
    }
    setIsOpen(isOpen);
    setisOpenNotifiction(isOpenNotifiction);
  };

  const handleClickActive = (element) => {
    if (element === "section1") {
      setActiveAccordionItem("0");
    } else if (element === "section2") {
      setActiveAccordionItem("1");
    }
  };

  useEffect(() => {
    if (arnNumber) {
      getDetailedViewHandler("ServiceScheduled");
      getDetailedViewHandler("Reneawls");
      getGenericInformationHandler();
    }
  }, [arnNumber]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main_content">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0" style={{ marginBottom: "10px" }}>
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
                              {arnNumber}
                              {arnList?.map((option) => (
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
              </div>
            </div>
            <div className="contact_tile">
              <p style={{ fontWeight: "bold" }}>
                Customer Name:{" "}
                <span style={{ fontFamily: "sans-serif" }}>
                  {userData.NameList}
                </span>
              </p>
              <p style={{ fontWeight: "bold" }}>
                Contact Details:
                <span style={{ fontFamily: "sans-serif" }}>
                  {userMobile &&
                    userMobile?.substring(0, userMobile.length - 6) + "******"}
                </span>
              </p>
            </div>

            <div className="row tilesection mt-4">
              <div className="row">
                <h3 className="tileHeading text-center">Fleet Overview</h3>
                <div className="d-flex justify-content-around w-75 mx-auto">
                  <div className="card_section" id="section3">
                    <img
                      src={vehiclecount}
                      alt="/"
                      className="cnt_img"
                      style={{ height: 5, width: 5 }}
                    />
                    <h6>Total Fleet Count</h6>
                    <div className="gen_sub_title" />
                    <h6 className="cnt">{fleetData?.VehCount}</h6>
                  </div>
                  <div className="card_section" id="section4">
                    <img
                      src={product}
                      alt="/"
                      className="cnt_img"
                      style={{ height: 5, width: 5 }}
                    />
                    <h6>Fleet Under VAS</h6>
                    <div className="gen_sub_title" />
                    <div className="row">
                      <div className="col-md-6">
                        <center>
                          <h6 className="tile_sec_head">AMC</h6>
                        </center>
                        <center>
                          <h6 className="cnt">{fleetData?.VasProdAmc}</h6>
                        </center>
                      </div>
                      <div className="col-md-6">
                        <center>
                          <h6 className="tile_sec_head">FMS</h6>
                        </center>
                        <center>
                          <h6 className="cnt">{fleetData?.FMSCount}</h6>
                        </center>
                      </div>
                    </div>
                  </div>
                  <div className="card_section" id="section5">
                    <img
                      src={AMCType}
                      alt="/"
                      className="cnt_img"
                      style={{ height: 5, width: 5 }}
                    />
                    <h6>Fleet Under Fleetedge</h6>
                    <div className="gen_sub_title" />
                    <h6 className="cnt">{fleetData?.AmcTypeCount}</h6>
                  </div>
                </div>
              </div>
              <h6 className="tileHeading mt-4 text-center">
                Quick Actions Required
              </h6>
              <div className="row w-75 mx-auto justify-content-around flex-wrap">
                <div className="col-md-5" id="section1">
                  <ScrollLink
                    to="section1"
                    smooth={true}
                    duration={50}
                    spy={true}
                    exact="true"
                    offset={-120}
                    onClick={() => handleClickActive("section1")}
                  >
                    <div className="tile">
                      <div className="row">
                        <div className="col-md-2">
                          <img
                            src={transportIcon}
                            alt="/"
                            style={{ height: 50, width: 58 }}
                          />
                        </div>
                        <div className="col-md-9 tile_main_div">
                          <h5>Due for Schedule Service</h5>
                          <h6 className="cnt">{fleetData?.ServiceSchedule}</h6>
                        </div>
                      </div>
                    </div>
                  </ScrollLink>
                </div>
                <div className="col-md-5" id="section2">
                  <ScrollLink
                    to="section2"
                    smooth={true}
                    duration={50}
                    spy={true}
                    exact="true"
                    offset={-370}
                    onClick={() => handleClickActive("section2")}
                    className="renewal_link"
                  >
                    <div className="tile">
                      <div className="row">
                        <div className="col-md-2">
                          <img
                            src={renewable}
                            alt="/"
                            style={{ height: 50, width: 50 }}
                          />
                        </div>
                        <div
                          className="col-md-9 tile_main_div"
                          style={{ paddingRight: "10px" }}
                        >
                          <h5>Due for Renewal</h5>
                          <h6 className="cnt">{fleetData?.Renewal}</h6>
                        </div>
                      </div>
                    </div>
                  </ScrollLink>
                </div>
              </div>
            </div>
            <TableAccordion
              activeAccordionItem={activeAccordionItem}
              setActiveAccordionItem={setActiveAccordionItem}
              serviceScheduleData={serviceScheduleData}
              Rowdata={Rowdata}
            />
          </div>
        </div>
      )}

      {isOpen && (
        <QuickActionModal
          setIsOpen={setIsOpen}
          handleClickActive={handleClickActive}
          isOpen={isOpen}
          ServiceSchedule={fleetData?.ServiceSchedule}
          renewable={renewable}
          Renewal={fleetData?.Renewal}
        />
      )}
    </>
  );
};

export default LandingPage;
