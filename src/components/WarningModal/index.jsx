import React from "react";
import "./index.css";

function WarningModal() {
  return (
    <div className="warning_modal_wrapper">
      <div className="warning_modal">
        <h5>Please enter correct Mobile or PAN number.</h5>
        <p className="text_1">
          Note: Kindly use Mobile number and PAN card provided at the time of
          Vehicle purchase
        </p>
        <button
          onClick={() => window.open("https://buytrucknbus.tatamotors.com/")}
        >
          Return to my Profile
        </button>
      </div>
    </div>
  );
}

export default WarningModal;
