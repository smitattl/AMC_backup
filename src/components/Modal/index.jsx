import React from "react";
import "./index.css";
import closeIcon from "../../images/close.svg";
import BasicDataTable from "../BasicTable";

function Modal({
  setIsModalOpen,
  indexClick,
  FleetDetailsColumns,
  fleetTil,
  heading,
}) {
  return (
    <React.Fragment>
      <div className="modal_overlay" onClick={() => setIsModalOpen(false)} />
      <div className="table_modal">
        <div className="modal_section">
          <div className="modal_header">
            <div className="modal_title">Fleet Data</div>
            <div
              onClick={() => setIsModalOpen(false)}
              className="close_button_modal"
            >
              <img src={closeIcon} alt="close_button" />
            </div>
          </div>
          <div className="mt-3">
            <BasicDataTable
              columns={FleetDetailsColumns}
              indextable={indexClick}
              title={fleetTil}
              heading={heading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
