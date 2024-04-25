import React from "react";
import DeatiledTable from "../../components/Table/Table";
import {
  dueForScheduleServiceColums,
  dueforRenewalColumns,
} from "../../StaticTableData";
import CommonTable from "../CommonComps/CommonTable";

function AccordionTable({
  activeAccordionItem,
  setActiveAccordionItem = () => {},
  serviceScheduleData = [],
  renewalData = [],
}) {
  return (
    <div className="container_wrapper">
      <div name="section1">
        <div className="d-flex gap-3 align-items-center my-4">
          <div className="left_line" />
          <h3 className="text_blue m-0">Due for Schedule Service</h3>
        </div>
        <div className="box-body p-0">
          <div className="js-plotly-plot">
            <CommonTable
              columns={dueForScheduleServiceColums}
              data={serviceScheduleData}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 align-items-center my-4" name="section2">
        <div className="left_line" />
        <h3 className="text_blue m-0">Due for Renewal</h3>
      </div>
      <div className="box-body p-0">
        <div className="js-plotly-plot">
          <CommonTable columns={dueforRenewalColumns} data={renewalData} />
        </div>
      </div>
    </div>
  );
}

export default AccordionTable;
