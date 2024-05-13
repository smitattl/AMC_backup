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
  clearArnNumber,
  setVasType,
  setVasOptions,
  setArnValues,
} from "../../store/Slices/homeAPISlice";
import { searchOptions } from "../../StaticTableData";
import { useLocation } from "react-router-dom";

function FilterSection({ searchFilterhandler = () => {} }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    arnNumber,
    selectedUser,
    arnListForAdmin,
    searchType,
    vehicleNumber,
    panNumber,
    vasType,
    mobileNo,
    vasOptions,
    arnValues,
  } = useSelector((state) => state.homeApi);

  useEffect(() => {
    if (arnNumber.value === "all") {
      const values = arnListForAdmin
        .filter((option) => option.value !== "all")
        .map((option) => option.value);
      dispatch(setArnValues(values));
    } else {
      dispatch(setArnValues(arnNumber.value));
    }
  }, [arnNumber, arnListForAdmin, dispatch]);
  const [searchUserName, setSearchUserName] = useState(null);
  const [accountNameList, setAccountNameList] = useState([]);

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

  let previousSelectedUser = null;

  useEffect(() => {
    previousSelectedUser = selectedUser;
  }, [selectedUser]);

  const getArnByuserHandler = async () => {
    if (!selectedUser) return;
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

  useEffect(() => {
    if (selectedUser && searchType?.value === "account_name")
      getArnByuserHandler(selectedUser);
  }, [selectedUser]);

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

  useEffect(() => {
    if (vehicleNumber) getARNNumbersByVehicleHandler();
  }, [vehicleNumber]);

  useEffect(() => {
    if (searchUserName) handleInputChange();
  }, [searchUserName]);

  useEffect(() => {
    if (mobileNo) getARNPanHandler();
  }, [mobileNo]);

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
    dispatch(setVasType({}));
    dispatch(setVasOptions([]));
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
              onChange={(e) => dispatch(setVehicleNumber(e.target.value))}
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
              onChange={(option) => {
                dispatch(setArnNumber(option));
              }}
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
                onChange={(option) => dispatch(setVasType(option))}
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
