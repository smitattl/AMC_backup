import React from "react";
import TransportIcon from "../../images/transportation.png";
import RenewableIcon from "../../images/renewalTwo.png";
import { Link as ScrollLink } from "react-scroll";
import { useHandleClickActive } from "../../utils";

function QuickActions() {
  const handleClickActive = useHandleClickActive();

  return (
    <div className="mb-3 quick_action container_wrapper">
      <h2 className="text-center">Quick Actions</h2>
      <div className="d-flex mx-auto w-75  justify-content-around mt-4">
        <div className="card_second">
          <ScrollLink
            to="section1"
            smooth={true}
            duration={50}
            spy={true}
            exact="true"
            offset={-370}
            onClick={() => handleClickActive("section1")}
          >
            <div>
              <img src={TransportIcon} alt="/" />
              <h5 className="opacity-75">Due for Schedule Service</h5>
              <h4 className="font_weight_700">0</h4>
            </div>
          </ScrollLink>
        </div>
        <div className="card_second">
          <ScrollLink
            to="section2"
            smooth={true}
            duration={50}
            spy={true}
            exact="true"
            offset={-370}
            onClick={() => handleClickActive("section2")}
          >
            <div>
              <img src={RenewableIcon} alt="/" />
              <h5 className="opacity-75">Due for Renewal</h5>
              <h4 className="font_weight_700">0</h4>
            </div>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;
