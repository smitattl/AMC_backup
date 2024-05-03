import React from "react";
import "./index.css";
import CloseIcon from "../../images/close.svg";

function CommonModal({ children, setCloseModal = () => {} }) {
  return (
    <div className="common_modal_Wrapper">
      <div className="common_modal">
        <div className="d-flex justify-content-between ">
          <h3>Visit To FleetEdge</h3>
          <span onClick={() => setCloseModal(false)}>
            <img src={CloseIcon} alt="close-icon" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default CommonModal;
