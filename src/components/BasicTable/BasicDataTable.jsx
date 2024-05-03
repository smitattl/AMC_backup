import React, { useEffect, useState } from "react";
import "./BasicDataTable.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ApiInterface } from "../../API";

const BasicTable = ({ columns, indextable, title }) => {
  const [Dataflagfirst, setDataflagfirst] = useState(false);
  const [Dataflagtwo, setDataflagtwo] = useState(false);
  const setFleetData = (response) => {
    let tat_data = "";
    let tblData =
      '<div class="table-responsive" ><table id="fleet_report_data" class="table table-striped table-bordered no-footer dataTable table-responsive" style="width:100%; height: 100%; border: 1px solid #d0d4d8">' +
      '<br><thead><tr class="bg-info">';

    tblData +=
      '<th class="bg-primary" style="background: #4480B2; color: white; font-size: 13px">LOB</th>';
    tblData +=
      '<th class="bg-primary" style="background: #4480B2; color: white; font-size: 13px">FE</th>';
    tblData +=
      '<th class="bg-primary" style="background: #4480B2; color: white; font-size: 13px">PPL</th>';
    tblData +=
      '<th class="bg-primary" style="background: #4480B2; color: white; font-size: 13px">PL</th>';
    tblData +=
      '<th class="bg-primary" style="background: #4480B2; color: white; font-size: 13px">Count</th>';
    tblData += "</tr></thead><tbody>";

    if (response.length > 1) {
      for (let j = 0; j < response.length; j++) {
        tat_data += "<tr>";
        {
          Object.entries(response[j]).map(
            ([key]) => (tat_data += `<td>${key}</td>`)
          );
        }
        tat_data += "</tr>";
      }
    }
    tblData += tat_data + "</tbody></table></div>";
    $("#fleet_report_data").html(tblData);
    $("#fleet-table").DataTable();

    const table = $("#fleet-table").DataTable();

    table.clear().draw();
    let count = 1;

    response.forEach((data) => {
      const rowValues = Object.values(data);
      table.row.add(rowValues).draw();
    });
  };

  const FleetTATDeatiled = async () => {
    const FormData = require("form-data");
    const data = new FormData();
    data.append("ARN-Number", localStorage.getItem("ARN-Number"));
    data.append("Clickindex", indextable);
    data.append("Vas-Type", localStorage.getItem("Vas-Type"));
    try {
      const response = await ApiInterface.getFleetTatdetailsData(data);
      if (response.status === 200) {
        setFleetData(data?.TotalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TotalFleetDeatiled = async () => {
    try {
      const body = {};
      const response = await ApiInterface.getTotalFleetDetailsData(body);
      if (response.status === 200) {
        const data = response.data;
        setFleetData(data?.data?.TotalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (title === "Total Active Vehicle Count Under Fleetedge") {
      setDataflagfirst(true);
    } else {
      setDataflagtwo(true);
    }
  }, []);

  useEffect(() => {
    if (Dataflagfirst === true) {
      TotalFleetDeatiled();
    } else if (Dataflagtwo === true) {
      FleetTATDeatiled();
    }
  }, [Dataflagfirst, Dataflagtwo]);

  return (
    <div>
      <div
        className="table-responsive"
        style={{ overflow: "scroll", height: "370px" }}
      >
        <table
          id="fleet-table"
          className="fleet-table table table-striped table-bordered no-footer dataTable table-responsive"
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.title}
                  onClick={() => console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnn")}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
export default BasicTable;
