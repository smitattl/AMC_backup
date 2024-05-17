import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  clearArnNumber,
  setArnValues,
  setVasType,
  setVasOptions,
} from "../../store/Slices/homeAPISlice";
import { searchOptions } from "../../StaticTableData";
import { setPreventApiCalling } from "../../store/Slices/customerSlice";

function FilterSection({ searchFilterhandler = () => {} }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [searchUserName, setSearchUserName] = useState(null);
  const [accountNameList, setAccountNameList] = useState([]);
  const {
    arnNumber,
    selectedUser,
    arnListForAdmin,
    searchType,
    vehicleNumber,
    panNumber,
    vasType,
    vasOptions,
    mobileNo,
  } = useSelector((state) => state.homeApi);

  useEffect(() => {
    if (searchUserName) handleInputChange();
  }, [searchUserName]);

  const handleInputChange = async () => {
    try {
      const body = {
        ac_name: searchUserName.toUpperCase(),
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

  const getArnByuserHandler = async (selectedUser) => {
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
        let arnListWithAll;
        if (arnData.length > 1) {
          arnListWithAll = [allOption, ...arnData];
        } else if (arnData?.length === 1) {
          arnListWithAll = arnData;
        }
        dispatch(setArnListForAdmin(arnListWithAll));
        dispatch(setArnNumber(arnListWithAll[0]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getARNNumbersByVehicleHandler = async (value) => {
    try {
      const body = {
        vehicle_no: value,
      };
      const response = await ApiInterface.getARNbyVehicleNumber(body);
      if (response.status === 200) {
        const arnData = response.data.arn_no.map((name) => ({
          value: name,
          label: name,
        }));
        let arnListWithAll;
        const allOption = { value: "all", label: "ALL" };
        if (arnData?.length > 1) {
          arnListWithAll = [allOption, ...arnData];
        } else {
          arnListWithAll = arnData;
        }
        dispatch(setArnListForAdmin(arnListWithAll));
        dispatch(setArnNumber(arnListWithAll[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getARNPanHandler = async (value) => {
    try {
      const body = {
        phone_no: value,
      };
      const response = await ApiInterface.getARNPanByMobileNo(body);
      if (response.status === 200) {
        const arnData = response.data.arn_no.map((name) => ({
          value: name,
          label: name,
        }));
        let arnListWithAll;
        const allOption = { value: "all", label: "ALL" };
        if (arnData?.length > 1) {
          arnListWithAll = [allOption, ...arnData];
        } else {
          arnListWithAll = arnData;
        }
        dispatch(setPanNumber(response.data.pan));
        dispatch(setArnNumber(arnListWithAll[0]));
        dispatch(setArnListForAdmin(arnListWithAll));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    dispatch(
      setArnNumber({
        value: newValue,
        label: newValue,
      })
    );
    if (newValue === "") {
      dispatch(clearArnNumber());
    }
  };

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
            classNamePrefix="mySelect"
            isSearchable={false}
          />
        </Form.Group>
        {searchType?.value === "account_name" ? (
          <Form.Group className="form_group">
            <Form.Label>Account Name</Form.Label>
            <Select
              options={accountNameList}
              value={selectedUser}
              onChange={(option) => {
                dispatch(setSelectedUser(option));
                getArnByuserHandler(option);
              }}
              onInputChange={setSearchUserName}
              inputValue={searchUserName}
              isSearchable
              placeholder="Type to search..."
              noOptionsMessage={() => "No options found"}
            />
          </Form.Group>
        ) : searchType?.value === "mobile_no" ? (
          <>
            <Form.Group className="form_group">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                placeholder="Add mobile number here"
                onChange={(e) => {
                  dispatch(setMobileNo(e.target.value));
                  dispatch(setPanNumber(""));
                  dispatch(setArnListForAdmin([]));
                  dispatch(setArnNumber({ label: "", value: "" }));
                  getARNPanHandler(e.target.value);
                }}
                value={mobileNo}
                type="number"
              />
            </Form.Group>
            <Form.Group className="form_group">
              <Form.Label>Pan Card number</Form.Label>
              <Form.Control
                placeholder="Add pan number here"
                value={panNumber ? panNumber : ""}
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
              onChange={handleChange}
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
              onChange={(e) => {
                dispatch(setVehicleNumber(e.target.value));
                getARNNumbersByVehicleHandler(e.target.value);
              }}
            />
          </Form.Group>
        ) : null}
        {searchType?.value === "arn_number" ? (
          <Form.Group className="form_group">
            <Form.Label>ARN Number</Form.Label>
            <Form.Control
              placeholder="ARN Number"
              value={arnNumber.value}
              readOnly
              maxLength={23}
            />
          </Form.Group>
        ) : (
          <Form.Group className="form_group">
            <Form.Label>ARN Number</Form.Label>
            <Select
              value={arnNumber}
              options={arnListForAdmin}
              onChange={(option) => dispatch(setArnNumber(option))}
              isSearchable={false}
              placeholder="Type to search..."
              noOptionsMessage={() => "No options found"}
              isDisabled={arnListForAdmin.length === 1}
              maxLength={23}
            />
          </Form.Group>
        )}
        {pathname === "/admin/admin-key-insight" &&
          vasOptions?.length !== 0 && (
            <Form.Group className="form_group">
              <Form.Label>Vas Type</Form.Label>
              <Select
                options={vasOptions}
                value={vasType}
                onChange={(option) => {
                  dispatch(setVasType(option));
                }}
                className="react-select"
                isSearchable={false}
              />
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
