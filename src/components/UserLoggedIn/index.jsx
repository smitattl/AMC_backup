import React from "react";
import "./index.css";
import BubbleBackground from "../BubbleBackground";

function UserLoggedIn() {
  return (
    <div className="user_logged_in_wrapper">
      <BubbleBackground />
      <div className="warning_wrapper">
        <h3>Warning: Excessive Login Attempts Detected !</h3>
        <p>
          Our system has detected that you have exceeded the allowed number of
          login attempts within a short period of time. To protect your
          account's security, access has been temporarily restricted. Please
          wait for a short while before attempting to log in again.
        </p>
      </div>
    </div>
  );
}

export default UserLoggedIn;
