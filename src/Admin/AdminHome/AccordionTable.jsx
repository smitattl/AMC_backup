import React from "react";
import {
  dueForScheduleServiceColums,
  dueforRenewalColumns,
} from "../../StaticTableData";
import CommonTable from "../CommonComps/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
} from "../../store/Slices/arnSlice";

function AccordionTable({ serviceScheduleData = [], renewalData = [] }) {
  const { showTableForAdminOne, showTableForAdminTwo } = useSelector(
    (state) => state.arn
  );
  const dispatch = useDispatch();

  return (
    <div className="container_wrapper">
      <div
        name="section1"
        className="d-flex gap-3 align-items-center my-4 accordion_title"
        onClick={() => {
          dispatch(setShowTableForAdminOne(!showTableForAdminOne));
          dispatch(setShowTableForAdminTwo(false));
        }}
      >
        <div className="left_line" />
        <h3 className="m-0 title_second">
          Vehicles Due For Scheduled Service In Next 30 Days
        </h3>
      </div>
      {showTableForAdminOne && (
        <div className="box-body p-0">
          <div className="js-plotly-plot">
            <CommonTable
              columns={dueForScheduleServiceColums}
              data={serviceScheduleData}
            />
          </div>
        </div>
      )}
      <div
        className="d-flex gap-3 align-items-center my-4 accordion_title"
        name="section2"
        onClick={() => {
          dispatch(setShowTableForAdminOne(false));
          dispatch(setShowTableForAdminTwo(!showTableForAdminTwo));
        }}
      >
        <div className="left_line" />
        <h3 className="m-0 title_second">
          Vehicles Due For Contract Renewal in Next 30 Days
        </h3>
      </div>
      {showTableForAdminTwo && (
        <div className="box-body p-0">
          <div className="js-plotly-plot">
            <CommonTable columns={dueforRenewalColumns} data={renewalData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AccordionTable;
