import React, { useEffect, useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ApiInterface } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import {
  setArnListForAdmin,
  setArnNumber,
  setPanNumber,
  setSearchType,
  setSelectedUser,
  setVehicleNumber,
  setMobileNo,
  resetFields,
} from "../../store/Slices/homeAPISlice";
import { searchOptions } from "../../StaticTableData";
import { errorMsg } from "../../Config";

function FilterSection({ searchFilterhandler = () => {} }) {
  const dispatch = useDispatch();
  const {
    arnNumber,
    selectedUser,
    arnListForAdmin,
    searchType,
    vehicleNumber,
    panNumber,
    mobileNo,
  } = useSelector((state) => state.homeApi);

  const [searchUserName, setSearchUserName] = useState(null);
  const [accountNameList, setAccountNameList] = useState([]);

  const handleInputChange = async () => {
    try {
      const body = {
        ac_name: searchUserName,
      };
      const response = await ApiInterface.getuserNameData(body);
      if (response.status === 200) {
        const names = response.data.account_names.map((name) => ({
          value: name,
          label: name,
        }));
        setAccountNameList(names);
      }
    } catch (error) {
      console.error("Error fetching account names:", error);
    }
  };

  const getArnByuserHandler = async () => {
    if (
      Object.keys(selectedUser).length === 0 &&
      selectedUser.constructor === Object
    ) {
      return;
    }
    try {
      const body = {
        account_name: selectedUser.value,
      };
      const response = await ApiInterface.getARNByuserName(body);
      if (response.status === 200) {
        const arnData = response.data.arn_no.map((name) => ({
          value: name,
          label: name,
        }));
        const allOption = { value: "all", label: "ALL" };
        const arnListWithAll = [allOption, ...arnData];
        dispatch(setArnListForAdmin(arnListWithAll));
      }
    } catch (error) {
      console.error("Error fetching account names:", error);
    }
  };

  const getARNNumbersByVehicleHandler = async (e) => {
    if (!vehicleNumber) {
      return null;
    }
    try {
      const body = {
        vehicle_no: vehicleNumber,
      };
      const response = await ApiInterface.getARNbyVehicleNumber(body);
      if (response.status === 200) {
        const arnData = response.data.arn_no.map((name) => ({
          value: name,
          label: name,
        }));
        const allOption = { value: "all", label: "ALL" };
        const arnListWithAll = [allOption, ...arnData];
        dispatch(setArnListForAdmin(arnListWithAll));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getARNPanHandler = async () => {
    try {
      const body = {
        phone_no: mobileNo,
      };
      const response = await ApiInterface.getARNPanByMobileNo(body);
      if (response.status === 200) {
        const arnData = response.data.arn_no.map((name) => ({
          value: name,
          label: name,
        }));
        const allOption = { value: "all", label: "ALL" };
        const arnListWithAll = [allOption, ...arnData];
        dispatch(setPanNumber(response.data.pan));
        dispatch(setArnListForAdmin(arnListWithAll));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vehicleNumber) getARNNumbersByVehicleHandler();
  }, [vehicleNumber]);

  useEffect(() => {
    if (selectedUser.value) getArnByuserHandler();
  }, [selectedUser]);

  useEffect(() => {
    if (searchUserName) handleInputChange();
  }, [searchUserName]);

  useEffect(() => {
    if (mobileNo) getARNPanHandler();
  }, [mobileNo]);

  return (
    <Form className="filter_wrapper">
      <div className="d-flex align-items-end  gap-3 filter">
        <Form.Group className="form_group">
          <Form.Label>Search Type</Form.Label>
          <Select
            options={searchOptions}
            value={searchType}
            onChange={(selectedOption) => {
              dispatch(setSearchType(selectedOption));
              dispatch(resetFields());
            }}
            placeholder="Select or enter a value..."
            noOptionsMessage={() => "Type to create a new value"}
            className="react-select"
          />
        </Form.Group>
        {searchType?.value === "account_name" ? (
          <Form.Group className="form_group">
            <Form.Label>Account Name</Form.Label>
            <Select
              options={accountNameList}
              value={selectedUser}
              onChange={(option) => dispatch(setSelectedUser(option))}
              onInputChange={setSearchUserName}
              inputValue={searchUserName}
              isSearchable
              placeholder="Type to search..."
              noOptionsMessage={() => "No options found"}
            />
            {/* {!selectedUser && <span>{error}</span>} */}
          </Form.Group>
        ) : searchType?.value === "mobile_no" ? (
          <>
            <Form.Group className="form_group">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                placeholder="Add mobile number here"
                onChange={(e) => dispatch(setMobileNo(e.target.value))}
                value={mobileNo}
              />
            </Form.Group>
            <Form.Group className="form_group">
              <Form.Label>Pan Card number</Form.Label>
              <Form.Control
                placeholder="Add pan number here"
                value={panNumber}
                readOnly
              />
            </Form.Group>
          </>
        ) : searchType?.value === "arn_number" ? (
          <Form.Group className="form_group">
            <Form.Label className="text-capitalize">
              {searchType?.label}
            </Form.Label>
            <Form.Control
              value={arnNumber.value}
              placeholder="Add value here"
              onChange={(e) =>
                dispatch(
                  setArnNumber({
                    value: e.target.value,
                    label: e.target.value,
                  })
                )
              }
            />
          </Form.Group>
        ) : searchType?.value === "vehicle_registration_no" ? (
          <Form.Group className="form_group">
            <Form.Label className="text-capitalize">
              {searchType.label}
            </Form.Label>
            <Form.Control
              value={vehicleNumber}
              placeholder="Add value here"
              onChange={(e) => dispatch(setVehicleNumber(e.target.value))}
            />
            {/* {!vehicleNumber && <span>{error}</span>} */}
          </Form.Group>
        ) : null}
        {searchType?.value === "arn_number" ? (
          <Form.Group className="form_group">
            <Form.Label>ARN Number</Form.Label>
            <Form.Control
              placeholder="ARN Number"
              value={arnNumber.value}
              readOnly
            />
          </Form.Group>
        ) : (
          <Form.Group className="form_group">
            <Form.Label>ARN Number</Form.Label>
            <Select
              value={arnNumber}
              options={arnListForAdmin}
              onChange={(option) => dispatch(setArnNumber(option))}
              isSearchable
              placeholder="Type to search..."
              noOptionsMessage={() => "No options found"}
            />
            {/* {!arnNumber && <span>{error}</span>} */}
          </Form.Group>
        )}
        <button
          className="search_button"
          type="button"
          onClick={searchFilterhandler}
        >
          Search
        </button>
      </div>
    </Form>
  );
}

export default FilterSection;
