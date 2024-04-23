import React, { useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const searchOptions = [
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "ARN Number",
    value: "arn_number",
  },
  {
    label: "Vehicle Registration Number",
    value: "vehicle_registration_no",
  },
  {
    label: "Mobile Number",
    value: "mobile_no",
  },
];

function FilterSection() {
  const [searchType, setSearchType] = useState(searchOptions[0]);
  const [selectTypeValue, setSelectTypeValue] = useState("");
  const [accountNameList, setAccountNameList] = useState([
    {
      label: "Account Name",
      value: "account_name",
    },
    {
      label: "ARN Number",
      value: "arn_number",
    },
    {
      label: "Vehicle Registration Number",
      value: "vehicle_registration_no",
    },
    {
      label: "Mobile Number",
      value: "mobile_no",
    },
  ]);
  const [accountName, setAccountName] = useState(null);
  const [arnNumber, setArnNumber] = useState(null);
  const [vehicleRegiValue, setValueRegiValue] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [panCardNo, setPanCardNo] = useState(null);
  return (
    <Form className="filter_wrapper">
      <div className="d-flex justify-content-between gap-3 filter">
        <Form.Group className="form_group">
          <Form.Label>Search Type</Form.Label>
          <Select
            options={searchOptions}
            value={searchType}
            onChange={(selectedOption) => setSearchType(selectedOption)}
            placeholder="Select or enter a value..."
            noOptionsMessage={() => "Type to create a new value"}
            className="react-select"
          />
        </Form.Group>
        {searchType?.value === "account_name" ? (
          <Form.Group className="form_group">
            <Form.Label>Account number</Form.Label>
            <Select
              options={accountNameList}
              value={selectTypeValue}
              onChange={(option) => setSelectTypeValue(option)}
              isSearchable
              placeholder="Select or enter a value..."
              noOptionsMessage={() => "Type to create a new value"}
              className="react-select"
            />
          </Form.Group>
        ) : searchType?.value === "mobile_no" ? (
          <>
            <Form.Group className="form_group">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                placeholder="Add mobile number here"
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobileNo}
              />
            </Form.Group>
            <Form.Group className="form_group">
              <Form.Label>Pan Card number</Form.Label>
              <Form.Control
                placeholder="Add pan number here"
                onChange={(e) => setPanCardNo(e.target.value)}
                value={panCardNo}
              />
            </Form.Group>
          </>
        ) : searchType?.value === "account_name" ? (
          <Form.Group className="form_group">
            <Form.Label className="text-capitalize">
              {searchType?.label}
            </Form.Label>
            <Form.Control
              value={accountName}
              placeholder="Add value here"
              onChange={(e) => setAccountName(e.target.value)}
            />
          </Form.Group>
        ) : (
          <Form.Group className="form_group">
            <Form.Label className="text-capitalize">
              {searchType?.label}
            </Form.Label>
            <Form.Control
              value={vehicleRegiValue}
              placeholder="Add value here"
              onChange={(e) => setValueRegiValue(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group className="form_group">
          <Form.Label>ARN Number</Form.Label>
          <Form.Control placeholder="ARN Number" value={arnNumber} readOnly />
        </Form.Group>
      </div>
    </Form>
  );
}

export default FilterSection;
