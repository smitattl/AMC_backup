import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { Link as ScrollLink, Element } from "react-scroll";
import Form from "react-bootstrap/Form";
import DeatiledTable from "../../components/Table/Table";
import { ApiInterface } from "../../API";
import transportIcon from "../../images/transportation.png";
import renewable from "../../images/renewalTwo.png";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";
import "./HomePage.css";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setArnList, setUserData } from "../../store/Slices/arnSlice";
import TableAccordion from "./TableAccordion";
import QuickActionModal from "./QuickActionModal";

const LandingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { arnList, userEntryCount } = useSelector((state) => state.arn);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get("referrer");
  }, [location.search]);

  const { param1 } = useParams();
  const { param2 } = useParams();

  const [ARNName, setARNName] = useState();
  const [ARNContact, setARNContact] = useState();
  const [arnNumber, setArnNumber] = useState("");
  const [isOpenGenricDetails, setisOpenGenricDetails] = useState(false);
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenNotifiction, setisOpenNotifiction] = useState(false);
  const [isOpenNotifictionTile, setisOpenNotifictionTile] = useState(false);
  const [openSS, setOpenSS] = useState(false);
  const [openRen, setOpenRen] = useState(false);
  const [Rowdata, setRowdata] = useState([]);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);
  const [VehCount, setVehCount] = useState();
  const [ServiceSchedule, setServiceSchedule] = useState();
  const [Renewal, setRenewal] = useState();
  const [VasProdAmc, setVasProdAmc] = useState();
  const [AMCTypeCount, setAMCTypeCount] = useState();
  const [AppTypeCount, setAppTypeCount] = useState();
  const [VasProdFms, setVasProdFms] = useState();
  const [fleetData, setFleetData] = useState({});

  const getDecryptedDataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("DataOne", param1);
      formData.append("DataTwo", param2);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        localStorage.setItem("ARN-Number", response.data.ARNList[0]);
        localStorage.setItem(
          "ARN-NumberList",
          JSON.stringify(response.data.ARNList)
        );
        setArnNumber(response?.data?.ARNList[0]);
        dispatch(setArnList([...response.data.ARNList, "All"]));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getGenericInformationHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber);
      const response = await ApiInterface.getGenericInformation(formData);
      if (response.status === 200) {
        setFleetData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getARNDetailsHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnNumber);
      const response = await ApiInterface.getARNDetails(formData);
      if (response.status === 200) {
        setARNName(response.data.NameList);
        setARNContact(response.data.MobNo);
        localStorage.setItem("Token", response.data.Token);
        if (isOpenGenricDetails !== true) {
          setisOpenGenricDetails(!isOpenGenricDetails);
        }
        localStorage.setItem("ARN-Name", response.data.NameList);
        localStorage.setItem("ARN-Contact", response.data.MobNo);
        setLoading(false);
        dispatch(setUserData(response.data ?? null));
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
      const filteredArnList = arnList.filter((option) => option !== "All");
      setArnNumber(filteredArnList);
    } else {
      setArnNumber(selectedValue);
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
    if (userEntryCount < 1000) getDecryptedDataHandler();
  }, [userEntryCount]);

  useEffect(() => {
    if (arnNumber) {
      getARNDetailsHandler();
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
              </div>
            </div>
            <div className="contact_tile">
              <p style={{ fontWeight: "bold" }}>
                Customer Name:{" "}
                <span style={{ fontFamily: "sans-serif" }}>{ARNName}</span>
              </p>
              <p style={{ fontWeight: "bold" }}>
                Contact Details:
                <span style={{ fontFamily: "sans-serif" }}>
                  {ARNContact &&
                    ARNContact?.substring(0, ARNContact.length - 6) + "******"}
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
                    <h6 className="cnt">{fleetData.VehCount}</h6>
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
                          <h6 className="cnt">{fleetData.VasProdAmc}</h6>
                        </center>
                      </div>
                      <div className="col-md-6">
                        <center>
                          <h6 className="tile_sec_head">FMS</h6>
                        </center>
                        <center>
                          <h6 className="cnt">{fleetData.FMSCount}</h6>
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
                    <h6 className="cnt">{fleetData.AmcTypeCount}</h6>
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
                          <h6 className="cnt">{fleetData.ServiceSchedule}</h6>
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
                          <a>Due for Renewal</a>
                          <h6 className="cnt">{fleetData.Renewal}</h6>
                        </div>
                      </div>
                    </div>
                  </ScrollLink>
                </div>
              </div>
            </div>
            <TableAccordion
              openSS={openSS}
              openRen={openRen}
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
          ServiceSchedule={ServiceSchedule}
          renewable={renewable}
          Renewal={Renewal}
        />
      )}
    </>
  );
};

export default LandingPage;
