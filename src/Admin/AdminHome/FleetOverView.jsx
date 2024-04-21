import React from "react";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";

function FleetOverView() {
  return (
    <div className="fleet_overview container_wrapper">
      <h2 className="text-center">Fleet Overview</h2>
      <div className="w-full flex-wrap  py-2 d-flex justify-content-around  gap-3">
        <div className="card">
          <h5 className="opacity-75">Total Fleet Count</h5>
          <img src={vehiclecount} alt="/" className="card_img" />
          <div className="font_weight_700">233</div>
        </div>
        <div className="card">
          <h5 className="opacity-75">Fleet Under VAS</h5>
          <img src={AMCType} alt="/" className="card_img" />
          <div className="d-flex w-50 mx-auto mt-4 justify-content-between">
            <div className="d-flex flex-column gap-1">
              <div>AMC</div> <div className="font_weight_700">100</div>
            </div>
            <div className="d-flex flex-column gap-1">
              <div>FMC</div> <div className="font_weight_700">1000</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="opacity-75">Fleet Under Fleetedge</h5>
          <img src={product} alt="/" className="card_img" />
          <div className="font_weight_700">200</div>
        </div>
      </div>
    </div>
  );
}

export default FleetOverView;
