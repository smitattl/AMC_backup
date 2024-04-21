import React, { useState, useEffect } from "react";
import styles from "./FleetDetailsLanding.module.css";
import FleetData from "./FleetData";

const FleetDetails = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const ARNNum = localStorage.getItem("ARN-Number");
  const ARNName = localStorage.getItem("ARN-Name");

  useEffect(() => {
    if (ARNNum !== null || ARNName !== null) {
      setIsOpen(false);
      setShowComponent(true);
    }
  }, [ARNName, ARNNum]);

  const RedirectOSP = (newTabUrl) => {
    window.location.href = newTabUrl;
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.popupcontainer}>
          <div className={styles.popupcontent}>
            <div>
              <div className="row">
                <div className="col-md-7">
                  <p style={{ color: "red" }}>
                    Please enter correct Mobile or PAN number.
                  </p>
                </div>
                <div className="col-md-5">
                  <button
                    className={styles.button}
                    style={{ marginLeft: "100px" }}
                    onClick={() =>
                      RedirectOSP("https://buytrucknbus.tatamotors.com/")
                    }
                  >
                    Return to my profile
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: "18px" }}>
                <div className="col-md-10">
                  <span className={styles.required}>
                    Note: Kindly use Mobile number and PAN card provided at the
                    time of Vehicle purchase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showComponent && <FleetData />}
    </div>
  );
};

export default FleetDetails;
