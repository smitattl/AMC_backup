import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";

function FilterForFleetDetails() {
  const { arnList } = useSelector((state) => state.arn);
  const [selectArnType, setSelectArnType] = useState("");

  return (
    <div className="filter_wrapper">
      <div className="filter">
        <Form.Group className="form_group">
          <Form.Label>Account number</Form.Label>
          <Select
            options={arnList}
            value={selectArnType}
            onChange={(option) => setSelectArnType(option)}
            isSearchable
            placeholder="Select or enter a value..."
            noOptionsMessage={() => "Type to create a new value"}
            className="react-select"
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default FilterForFleetDetails;
