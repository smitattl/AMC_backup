import React from "react";
import "./index.css";

function RestrictedModal({
  title = "Sorry, access to this URL is prohibited!",
  text = " You do not have access to this URL. Please ensure that you are logged in to the OSP platform in order to proceed.",
}) {
  return (
    <div className="restricted_modal">
      <div className="modal_section">
        <h5>{title}</h5>
        <div className="redirection_section">
          <p>{text}</p>
          <div className="d-flex justify-content-end">
            <button
              onClick={() =>
                window.open("https://buytrucknbus-osp3qa.home.tatamotors/login")
              }
            >
              Go to OSP Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestrictedModal;
