import React from "react";
import vehiclecount from "../../images/vehiclecount.png";
import AMCType from "../../images/AMC_Type.png";
import product from "../../images/product.png";

function FleetOverView({ fleetData = {} }) {
  return (
    <div className="fleet_overview container_wrapper">
      <h2 className="text-center title">Fleet Overview</h2>
      <div className="w-full flex-wrap  py-2 d-flex justify-content-evenly   gap-3">
        <div className="card">
          <h5 className="opacity-75 subtitle">Total Fleet Count</h5>
          <img src={vehiclecount} alt="/" className="card_img" />
          <div className="font_weight_700">{fleetData.VehCount || "0"}</div>
        </div>
        <div className="card">
          <h5 className="opacity-75 subtitle">Fleet Under VAS</h5>
          <img src={AMCType} alt="/" className="card_img" />
          <div className="d-flex w-50 mx-auto mt-4 justify-content-between">
            <div className="d-flex flex-column gap-1">
              <div>AMC</div>
              <div className="font_weight_700">
                {fleetData.VasProdAmc || "0"}
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <div>FMS</div>
              <div className="font_weight_700">{fleetData.FMSCount || "0"}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h5 className="opacity-75 subtitle">Fleet Under Fleetedge</h5>
          <img src={product} alt="/" className="card_img" />
          <div className="font_weight_700">{fleetData.AmcTypeCount || "0"}</div>
        </div>
      </div>
    </div>
  );
}

export default FleetOverView;
