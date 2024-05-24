import React, { useEffect, useMemo, useState } from "react";
import { ApiInterface } from "../../API";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./index.css";
import moment from "moment/moment";

const BasicDataTable = ({ columns }) => {
  const { pathname } = useLocation();
  const { arnValuesForCustomer, customerVasType, indexTAT } = useSelector(
    (state) => state.customer
  );
  const { arnValues, vasType } = useSelector((state) => state.homeApi);
  const [fleetData, setFleetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const TotalFleetDeatiled = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      if (pathname.includes("/Home")) {
        formData.append("arn_no", arnValuesForCustomer);
      } else if (pathname.includes("/admin")) {
        pathname.append("arn_no", arnValuesForCustomer);
      }
      formData.append("vas_type", customerVasType.value);
      const response = await ApiInterface.getTotalFleetDetailsData(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const TotalFleetDeatiledForAdmin = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      formData.append("vas_type", vasType.value);
      const response = await ApiInterface.getTotalFleetDetailsData(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const FleetDataHandler = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValuesForCustomer);
      formData.append("vas_type", customerVasType.value);
      formData.append("Clickindex", indexTAT);
      const response = await ApiInterface.getFleetTatDetails(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const FleetDataHandlerForAdmin = async () => {
    setLoading(true);
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("arn_no", arnValues);
      formData.append("vas_type", vasType.value);
      formData.append("Clickindex", indexTAT);
      const response = await ApiInterface.getFleetTatDetails(formData);
      if (response.status === 200) {
        setFleetData(response.data.TotalData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pathname.includes("/Home")) {
      if (columns.length === 6) {
        TotalFleetDeatiled();
      } else if (columns.length === 11) {
        FleetDataHandler();
      }
    } else if (pathname.includes("/admin")) {
      if (columns.length === 6) {
        TotalFleetDeatiledForAdmin();
      } else if (columns.length === 11) {
        FleetDataHandlerForAdmin();
      }
    }
  }, [pathname, columns]);

  return (
    <div className="responsive-table">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.title}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fleetData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.field === "Jobcard_Created_Date" ||
                  column.field === "Jobcard_Close_Date" ||
                  column.field === "amc_end_Date"
                    ? moment(row[column.field]).format("YYYY-MM-DD")
                    : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BasicDataTable;
