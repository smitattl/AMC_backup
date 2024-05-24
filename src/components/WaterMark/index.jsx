import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import "./index.css";

function Watermark() {
  const [username, setusername] = useState(null);
  const [ip_address, setip_address] = useState(null);
  const [login_time, setlogin_time] = useState(null);

  const TokenData = localStorage.getItem("Token");

  useEffect(() => {
    if (TokenData !== null) {
      const myDecodedToken = decodeToken(localStorage.getItem("Token"));
      setusername(myDecodedToken.ARNName);
      setip_address(myDecodedToken.IpAddress);
      setlogin_time(myDecodedToken.loginTime);
    }
  }, [TokenData]);

  return (
    <div className="watermarkcontainer">
      <p className="watermark">{username}</p>
      <p className="watermarkmid">{ip_address}</p>
      <p className="watermarkbottom">{login_time}</p>
    </div>
  );
}

export default Watermark;
