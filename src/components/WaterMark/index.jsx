import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import moment from "moment";

function Watermark() {
  const { customerData } = useSelector((state) => state.customer);

  const timestamp = customerData?.loginTime;
  const truncatedTimestamp = timestamp?.substring(0, 23);
  const formattedDate = moment(
    truncatedTimestamp,
    "YYYY-MM-DDTHH:mm:ss.SSS"
  ).format("YYYY-MM-DD");

  return (
    <div className="watermarkcontainer">
      <div className="watermark_user_name">{customerData?.userName}</div>
      <div>{customerData?.IpAddress}</div>
      <div>{formattedDate}</div>
    </div>
  );
}

export default Watermark;
