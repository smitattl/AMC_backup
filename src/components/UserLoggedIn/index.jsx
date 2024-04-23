import React from "react";
import "./index.css";

function UserLoggedIn() {
  return (
    <div className="user_logged_in_wrapper">
      <div className="warning_wrapper">
        <h3>Warning: You are trying to log in multiple times !</h3>
        <p className="opacity-50">
          Our system has detected multiple login attempts using this account.
          For security reasons, please ensure that your login credentials are
          entered correctly. If you believe this is an error or if you need
          assistance, please contact our support team.
        </p>
      </div>
    </div>
  );
}

export default UserLoggedIn;
