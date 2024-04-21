// import React, { useEffect, useState } from 'react';
// // npm install react-jwt --force
// import { decodeToken } from "react-jwt";
// import styles from './WaterMark.module.css';

// function Watermark() {
//     const [user_data, setUserData] = useState({});
//     const Token = localStorage.getItem("Token");
//     useEffect(() => {
//         if ( Token !== "") {
//           const myDecodedToken = decodeToken(localStorage.getItem("Token"));
//           const ARNName = localStorage.getItem('ARN-Name');
//           console.log("decoded token ---------------->", myDecodedToken);
//           setUserData({
//             "username":myDecodedToken.ARNName,
//             "ip_address":myDecodedToken.IpAddress,
//             "login_time":myDecodedToken.loginTime
//           });
//         }
//     }, [])

//   return (
//     <div className={styles.watermarkcontainer}>
//       {/* <div className={styles.watermark}>Your Watermark Here</div> */}
//       <p className={styles.watermark}>{user_data.username}</p>
//       <p className={styles.watermarkmid}>{user_data.ip_address}</p>
//       <p className={styles.watermarkbottom}>{user_data.login_time}</p>
//     </div>
//   );
// }

// export default Watermark;

import React, { useEffect, useState } from "react";
// npm install react-jwt --force
import { decodeToken } from "react-jwt";
import styles from "./WaterMark.module.css";

function Watermark() {
  // const [user_data, setUserData] = useState(null);

  const [username, setusername] = useState(null);
  const [ip_address, setip_address] = useState(null);
  const [login_time, setlogin_time] = useState(null);

  const TokenData = localStorage.getItem("Token");
  // console.log("toke ---------------->", TokenData);

  useEffect(() => {
    if (TokenData !== null) {
      // alert("inside useeffect");
      const myDecodedToken = decodeToken(localStorage.getItem("Token"));
      // const ARNName = localStorage.getItem('ARN-Name');
      // console.log("inside token --------->", myDecodedToken);
      setusername(myDecodedToken.ARNName);
      setip_address(myDecodedToken.IpAddress);
      setlogin_time(myDecodedToken.loginTime);
      // setUserData({
      //   "username":myDecodedToken.ARNName,
      //   "ip_address":myDecodedToken.IpAddress,
      //   "login_time":myDecodedToken.loginTime
      // });
    }
  }, [TokenData]);

  return (
    <div className={styles.watermarkcontainer}>
      {/* <div className={styles.watermark}>Your Watermark Here</div> */}
      {/* <p className={styles.watermark}>{user_data.username}</p>
      <p className={styles.watermarkmid}>{user_data.ip_address}</p>
      <p className={styles.watermarkbottom}>{user_data.login_time}</p> */}
      <p className={styles.watermark}>{username}</p>
      <p className={styles.watermarkmid}>{ip_address}</p>
      <p className={styles.watermarkbottom}>{login_time}</p>
    </div>
  );
}

export default Watermark;
