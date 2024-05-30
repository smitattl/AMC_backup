import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ApiInterface } from "../../API";
import transportIcon from "../../images/transportation.png";
import renewable from "../../images/renewalTwo.png";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";
import "./index.css";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setFleetData } from "../../store/Slices/arnSlice";
import TableAccordion from "./TableAccordion";
import {
  setActiveAccordionItem,
  setIsOpen,
  setParams,
  setShowTableForCustomerOne,
  setShowTableForCustomerTwo,
} from "../../store/Slices/customerSlice";
import FilterSectionForCustomer from "../FilterSectionForCustomer";

const LandingPage = () => {
  const token = localStorage.getItem("Token");

  const dispatch = useDispatch();
  const { param1, param2 } = useParams();
  const [loading, setLoading] = useState(true);
  const [Rowdata, setRowdata] = useState([]);
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
    dispatch(setParams({ param1, param2 }));
  }, [param1, param2]);

  const getGenericInformationHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("encrypted_arn", arnValuesForCustomer);
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
      formData.append("Section", "ServiceScheduled");
      formData.append("encrypted_arn", arnValuesForCustomer);
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
    if (!token) return;
    else if (arnValuesForCustomer && token) {
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
        <div className="container_wrapper_customer">
          <FilterSectionForCustomer searchData={searchData} />
          <div className="contact_tile">
            <p style={{ fontWeight: "bold" }} className="mb-0">
              Customer Name:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {customerData.userName}
              </span>
            </p>
            <p style={{ fontWeight: "bold" }} className="mb-0">
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
          <div className="tilesection mt-4">
            <h3 className="tileHeading text-center">Fleet Overview</h3>
            <div className="card_wrapper">
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
                <div className="d-flex justify-content-around w-100">
                  <div className="">
                    <h6 className="tile_sec_head">AMC</h6>
                    <h6 className="cnt">{fleetData?.VasProdAmc}</h6>
                  </div>
                  <div>
                    <h6 className="tile_sec_head">FMS</h6>
                    <h6 className="cnt">{fleetData?.FMSCount}</h6>
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
            <h6 className="tileHeading mt-4 text-center">
              Quick Actions Required
            </h6>
            <div className="tile_wrapper mx-auto mb-5">
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
                  className="renewal_link_div justify-content-between  cursor_pointer"
                >
                  <img src={transportIcon} alt="/" />
                  <div>
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
                  className="renewal_link_div justify-content-between cursor_pointer  text-center"
                >
                  <img
                    src={renewable}
                    alt="/"
                    style={{ height: 50, width: 50 }}
                  />
                  <div>
                    <h5 className="text-center">Due for Renewal</h5>
                    <h6 className="cnt text-center">{fleetData?.Renewal}</h6>
                  </div>
                </ScrollLink>
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
