import React from "react";
import "./index.css";

function RestrictedModal({
  title = "Too Many Login Attempts",
  text = "You have attempted to log in multiple times in a short period. Please wait a few minutes before trying again.",
}) {
  return (
    <div className="restricted_modal">
      <div className="restricted_modal_section">
        <h5 className="title_restricted">{title}</h5>
        <div className="redirection_section">
          <p>{text}</p>
          <div className="d-flex justify-content-end">
            <button
              onClick={() =>
                window.open("https://buytrucknbus-osp3qa.home.tatamotors/login")
              }
              className="restricted_button"
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
