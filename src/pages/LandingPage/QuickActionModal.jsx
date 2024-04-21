import React from "react";
import "./quickactionmodal.css";
import { Link as ReactLink } from "react-scroll";
import transportIcon from "../../images/transportation.png";

function QuickActionModal({
  setIsOpen = () => {},
  handleClickActive = () => {},
  isOpen = false,
  ServiceSchedule,
  renewable,
  Renewal,
}) {
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="overlay" />
      <div className="popup">
        <div className="popupcontent">
          <div className="popupheader">
            <div className="row position-relative">
              <div className="col-md-11"></div>
              <div className="col-md-1">
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  onClick={togglePopup}
                />
              </div>
            </div>
          </div>
          <div className="popupbody">
            <div className="row">
              <div className="text-center h3 font-weight-bold mb-4">
                Quick Actions Required
              </div>
              <div className="col-md-6 cursor-pointer" id="section1">
                <ReactLink
                  to="section1"
                  smooth={true}
                  className="text-black text-decoration-none"
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-120}
                  onClick={() => {
                    handleClickActive("section1");
                    setIsOpen(false);
                  }}
                >
                  <div className="tile" onClick={togglePopup}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={transportIcon}
                          alt="/"
                          style={{ height: 50, width: 58 }}
                        />
                      </div>
                      <div
                        className="col-md-9 tile_main_div"
                        style={{ marginLeft: "10px" }}
                      >
                        <h6>Due for Schedule Service</h6>
                        <h6 className="cnt">{ServiceSchedule}</h6>
                      </div>
                    </div>
                  </div>
                </ReactLink>
              </div>
              <div className="col-md-6 cursor-pointer" id="section2">
                <ReactLink
                  to="section2"
                  className="text-black text-decoration-none cursor-pointer"
                  smooth={true}
                  duration={50}
                  spy={true}
                  exact="true"
                  offset={-370}
                  onClick={() => {
                    handleClickActive("section2");
                    setIsOpen(false);
                  }}
                >
                  <div className="tile" onClick={togglePopup}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={renewable}
                          alt="/"
                          style={{ height: 50, width: 50 }}
                        />
                      </div>
                      <div
                        className="col-md-9 tile_main_div"
                        style={{ paddingRight: "10px" }}
                      >
                        <h6>Due for Renewal</h6>
                        <h6 className="cnt">{Renewal}</h6>
                      </div>
                    </div>
                  </div>
                </ReactLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickActionModal;
