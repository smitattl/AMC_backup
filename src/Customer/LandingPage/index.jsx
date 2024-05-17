import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ApiInterface } from "../../API";
import transportIcon from "../../images/transportation.png";
import renewable from "../../images/renewalTwo.png";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";
import "./HomePage.css";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setFleetData } from "../../store/Slices/arnSlice";
import TableAccordion from "./TableAccordion";
import {
  setActiveAccordionItem,
  setArnForCustomer,
  setArnListForCustomer,
  setCustomerData,
  setIsOpen,
  setParams,
  setShowTableForCustomerOne,
  setShowTableForCustomerTwo,
} from "../../store/Slices/customerSlice";
import FilterSectionForCustomer from "../FilterSectionForCustomer";
import { decodeToken } from "react-jwt";

const LandingPage = ({ setWrongUser }) => {
  const token = localStorage.getItem("Token");

  const dispatch = useDispatch();
  const { param1, param2 } = useParams();
  const [loading, setLoading] = useState(false);
  const [Rowdata, setRowdata] = useState([]);
  const [stopApi, setStopApi] = useState(false);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);

  const { fleetData } = useSelector((state) => state.arn);
  const {
    arnValuesForCustomer,
    activeAccordionItem,
    showTableForCustomerTwo,
    showTableForCustomerOne,
    customerData,
  } = useSelector((state) => state.customer);

  useEffect(() => {
    localStorage.clear();
  }, [param1, param2]);

  useEffect(() => {
    dispatch(setParams({ param1, param2 }));
  }, [param1, param2]);

  const getDecryptedDataHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("DataOne", param1);
      formData.append("DataTwo", param2);
      const response = await ApiInterface.getDecryptedData(formData);
      if (response.status === 200) {
        localStorage.setItem("Token", response.data.Token);
        const { ARN, MobNo, email_id, userName } = decodeToken(
          response.data.Token
        );
        const userData = { MobNo, email_id, userName };
        dispatch(setCustomerData(userData));
        const arnData = ARN.map((name) => ({
          value: name,
          label: name,
        }));
        let arnListWithAll;
        const allOption = { value: "all", label: "All" };
        if (arnData.length > 1) {
          arnListWithAll = [allOption, ...arnData];
        } else {
          arnListWithAll = arnData;
        }
        dispatch(setArnListForCustomer(arnListWithAll));
        dispatch(setArnForCustomer(arnListWithAll[0]));
        setWrongUser(false);
      } else if (response.status !== 200) setWrongUser(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) getDecryptedDataHandler();
  }, [token, param1, param2]);

  const getGenericInformationHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ARN-Number", arnValuesForCustomer);
      const response = await ApiInterface.getGenericInformation(formData);
      if (response.status === 200) {
        dispatch(setFleetData(response.data));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", "ServiceScheduled");
      formData.append("ARN-Number", arnValuesForCustomer);
      const response = await ApiInterface.getVehicleDetails(formData);
      if (response.status === 200) {
        setServiceScheduleData(response?.data?.RowData ?? []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getRenewalDetailedViewHandler = async (element) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Section", "Reneawls");
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

  const handleClickActive = (element) => {
    if (element === "section1") {
      dispatch(setShowTableForCustomerOne(!showTableForCustomerOne));
      dispatch(setShowTableForCustomerTwo(false));
    } else if (element === "section2") {
      dispatch(setShowTableForCustomerTwo(!showTableForCustomerTwo));
      dispatch(setShowTableForCustomerOne(false));
    }
  };

  useEffect(() => {
    if (arnValuesForCustomer) {
      getDetailedViewHandler();
      getRenewalDetailedViewHandler();
      getGenericInformationHandler();
    }
  }, [arnValuesForCustomer]);

  const searchData = () => {
    getDetailedViewHandler();
    getRenewalDetailedViewHandler();
    getGenericInformationHandler();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main_content">
          <div className="container">
            <FilterSectionForCustomer searchData={searchData} />
            <div className="contact_tile">
              <p style={{ fontWeight: "bold" }}>
                Customer Name:{" "}
                <span style={{ fontFamily: "sans-serif" }}>
                  {customerData.userName}
                </span>
              </p>
              <p style={{ fontWeight: "bold" }}>
                Contact Details:
                <span style={{ fontFamily: "sans-serif" }}>
                  {customerData?.MobNo &&
                    customerData?.MobNo?.substring(
                      0,
                      customerData.MobNo.length - 6
                    ) + "******"}
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
              <div className="tile_wrapper w-75 mx-auto">
                <div className="quick_action" id="section1">
                  <ScrollLink
                    to="section1"
                    smooth={true}
                    duration={200}
                    spy={true}
                    exact="true"
                    offset={50}
                    onClick={() => {
                      handleClickActive("section1");
                      dispatch(setIsOpen(false));
                    }}
                    className="renewal_link_div cursor_pointer"
                  >
                    <img
                      src={transportIcon}
                      alt="/"
                      style={{ height: 50, width: 58 }}
                    />
                    <div className="d-flex flex-column  justify-content-between h-100">
                      <h5 className="text-center">Due for Schedule Service</h5>
                      <h6 className="cnt ">{fleetData?.ServiceSchedule}</h6>
                    </div>
                  </ScrollLink>
                </div>
                <div className="quick_action" id="section2">
                  <ScrollLink
                    to="section2"
                    smooth={true}
                    duration={200}
                    spy={true}
                    exact="true"
                    offset={50}
                    onClick={() => handleClickActive("section2")}
                    className="renewal_link_div cursor_pointer  text-center"
                  >
                    <img
                      src={renewable}
                      alt="/"
                      style={{ height: 50, width: 50 }}
                    />
                    <div className="d-flex flex-column  justify-content-between h-100">
                      <h5 className="text-center">Due for Renewal</h5>
                      <h6 className="cnt text-center">{fleetData?.Renewal}</h6>
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
    </>
  );
};

export default LandingPage;
