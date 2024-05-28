import React from "react";
import {
  dueForScheduleServiceColums,
  dueforRenewalColumns,
} from "../../StaticTableData";
import CommonTable from "../../Admin/CommonComps/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowTableForCustomerOne,
  setShowTableForCustomerTwo,
} from "../../store/Slices/customerSlice";

function TableAccordion({ serviceScheduleData = [], renewalData }) {
  const dispatch = useDispatch();
  const { showTableForCustomerOne, showTableForCustomerTwo } = useSelector(
    (state) => state.customer
  );

  return (
    <div className="mb-5">
      <div
        name="section1"
        className="d-flex gap-3 align-items-center my-4 accordion_title"
        onClick={() => {
          dispatch(setShowTableForCustomerOne(!showTableForCustomerOne));
          dispatch(setShowTableForCustomerTwo(false));
        }}
      >
        <div className="left_line" />
        <h3 className="m-0 title_second">
          Vehicles Due For Scheduled Service In Next 30 Days
        </h3>
      </div>
      {showTableForCustomerOne && (
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
          dispatch(setShowTableForCustomerOne(false));
          dispatch(setShowTableForCustomerTwo(!showTableForCustomerTwo));
        }}
      >
        <div className="left_line" />
        <h3 className="m-0 title_second">
          Vehicles Due For Contract Renewal in Next 30 Days
        </h3>
      </div>
      {showTableForCustomerTwo && (
        <div className="box-body p-0">
          <div className="js-plotly-plot">
            <CommonTable columns={dueforRenewalColumns} data={renewalData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TableAccordion;
