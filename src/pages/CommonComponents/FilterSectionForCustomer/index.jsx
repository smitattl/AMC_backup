import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useLocation } from "react-router-dom";
import {
  setArnForCustomer,
  setChasisNumber,
  setSelectVasType,
  setShowFilterOptions,
} from "../../../store/Slices/customerSlice";
import downArrowIcon from "../../../images/down-arrow.png";

function FilterSectionForCustomer({ searchData, vasOptions }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    arnListForCustomer,
    arnForCustomer,
    selectSearchType,
    chasisNumber,
    selectVasType,
    showFilterOptions,
  } = useSelector((state) => state.customer);

  const [vehicleRegNo, setVehicleRegNo] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="filter_Section_accordion my-3">
      <div
        onClick={() => dispatch(setShowFilterOptions(!showFilterOptions))}
        className="title_of_search"
      >
        <div>Search Filter</div>
        <img
          src={downArrowIcon}
          alt=""
          className={`downarrow ${showFilterOptions ? "rotate" : ""}`}
        />
      </div>
      {showFilterOptions && (
        <Form className="d-flex gap-3 flex-wrap align-items-end filter_option_wrapper">
          {/* {(pathname === "/Home/Fleet-details" ||
                pathname === "/Home/Key-insights") && (
                <Form.Group className="form_group">
                  <Form.Label>Search Type</Form.Label>
                  <Select
                    value={selectSearchType}
                    options={customerSelectOptions}
                    onChange={(selectedOption) => {
                      dispatch(setSelectSearchType(selectedOption));
                    }}
                    placeholder="Select or enter a value..."
                    noOptionsMessage={() => "Type to create a new value"}
                    className="react-select"
                    classNamePrefix="mySelect"
                    isSearchable={false}
                  />
                </Form.Group>
              )} */}
          {selectSearchType?.value === "arn_number" && (
            <React.Fragment>
              <Form.Group className="form_group">
                <Form.Label>{selectSearchType?.label}</Form.Label>
                <Select
                  options={arnListForCustomer}
                  value={arnForCustomer}
                  onChange={(selectedOption) => {
                    dispatch(setArnForCustomer(selectedOption));
                  }}
                  placeholder="Select or enter a value..."
                  noOptionsMessage={() => "Type to create a new value"}
                  className="react-select"
                  classNamePrefix="mySelect"
                  isSearchable={false}
                />
              </Form.Group>
              {vasOptions?.length > 0 && pathname === "/Home/Key-insights" && (
                <Form.Group className="form_group">
                  <Form.Label>Vas Type</Form.Label>
                  <Select
                    options={vasOptions}
                    value={selectVasType}
                    onChange={(selectedOption) => {
                      dispatch(setSelectVasType(selectedOption));
                    }}
                    placeholder="Select or enter a value..."
                    noOptionsMessage={() => "Type to create a new value"}
                    className="react-select"
                    classNamePrefix="mySelect"
                    isSearchable={false}
                  />
                </Form.Group>
              )}
            </React.Fragment>
          )}
          {selectSearchType?.value === "chassis_name" && (
            <Form.Group className="form_group">
              <Form.Label>{selectSearchType?.label}</Form.Label>
              <Form.Control
                value={chasisNumber}
                placeholder="Enter Chasis number here"
                onChange={(e) => dispatch(setChasisNumber(e.target.value))}
              />
            </Form.Group>
          )}
          {selectSearchType?.value === "vehicle_registration_no" && (
            <Form.Group className="form_group">
              <Form.Label>{selectSearchType?.label}</Form.Label>
              <Form.Control
                value={vehicleRegNo}
                placeholder="Enter Chasis number here"
                onChange={(e) => setVehicleRegNo(e.target.value)}
              />
            </Form.Group>
          )}
          <button
            className="search_button_customer"
            type="button"
            onClick={searchData}
          >
            Search
          </button>
        </Form>
      )}
    </div>
  );
}

export default FilterSectionForCustomer;
