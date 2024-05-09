import React from "react";
import "./quickactionmodal.css";
import transportIcon from "../../images/transportation.png";
import { useHandleClickActive } from "../../utils";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../store/Slices/customerSlice";

import renewable from "../../images/renewalTwo.png";

function QuickActionModal() {
  const dispatch = useDispatch();
  const { fleetData } = useSelector((state) => state.arn);

  const handleClickActive = useHandleClickActive();

  return (
    <>
      <div className="overlay" />
      <div className="modal_wrapper_for_quick_action">
        <div className="quick_action_modal">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="title_qa mb-0 text-center">
              Quick Actions Required
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => dispatch(setIsOpen(false))}
            />
          </div>
          <div className="tile_wrapper d-flex ">
            <div className="quick_action quick_action_modal" id="section1">
              <ScrollLink
                to="section1"
                smooth={true}
                duration={50}
                spy={true}
                exact="true"
                offset={-120}
                onClick={() => handleClickActive("section1")}
                className="renewal_link_div renewal_link_modal"
              >
                <img
                  src={transportIcon}
                  alt="/"
                  style={{ height: 30, width: 30 }}
                />
                <div className="d-flex flex-column  justify-content-between h-100">
                  <h6>Due for Schedule Service</h6>
                  <h6 className="cnt text-center">
                    {fleetData?.ServiceSchedule}
                  </h6>
                </div>
              </ScrollLink>
            </div>
            <div className="quick_action quick_action_modal" id="section2">
              <ScrollLink
                to="section2"
                smooth={true}
                duration={50}
                spy={true}
                exact="true"
                offset={-370}
                onClick={() => handleClickActive("section2")}
                className="renewal_link_div renewal_link_modal"
              >
                <img
                  src={renewable}
                  alt="/"
                  style={{ height: 30, width: 30 }}
                />
                <div className="d-flex flex-column  justify-content-between h-100">
                  <h6>Due for Renewal</h6>
                  <h6 className="cnt text-center">{fleetData?.Renewal}</h6>
                </div>
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickActionModal;
