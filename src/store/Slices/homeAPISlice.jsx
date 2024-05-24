import { createSlice } from "@reduxjs/toolkit";
import { searchOptions } from "../../StaticTableData";

const initialState = {
  arnNumber: { label: "", value: "" },
  fleetData: {},
  selectedUser: {},
  arnListForAdmin: [],
  searchType: searchOptions[0],
  vehicleNumber: "",
  panNumber: "",
  mobileNo: "",
  arnValues: null,
  vasType: {},
  vasOptions: [],
  serviceScheduleData: [],
  renewalData: [],
};

const homeApiSlice = createSlice({
  name: "homeApi",
  initialState,
  reducers: {
    setArnNumber(state, action) {
      if (action.payload) {
        const { label, value } = action.payload;
        if (label && value) {
          state.arnNumber = { label, value };
        }
      }
    },
    clearArnNumber: (state) => {
      state.arnNumber.label = "";
      state.arnNumber.value = "";
    },
    setFleetData(state, action) {
      state.fleetData = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setArnListForAdmin(state, action) {
      state.arnListForAdmin = action.payload;
    },
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
    setVehicleNumber(state, action) {
      state.vehicleNumber = action.payload;
    },
    setPanNumber(state, action) {
      state.panNumber = action.payload;
    },
    setMobileNo(state, action) {
      state.mobileNo = action.payload;
    },
    setArnValues(state, action) {
      state.arnValues = action.payload;
    },
    setVasType(state, action) {
      if (action.payload) {
        const { label, value } = action.payload;
        if (label && value) {
          state.vasType = { label, value };
        }
      }
    },
    setVasOptions(state, action) {
      state.vasOptions = action.payload;
    },
    setServiceScheduleData(state, action) {
      state.serviceScheduleData = action.payload;
    },
    setRenewalData(state, action) {
      state.renewalData = action.payload;
    },
    resetFields(state) {
      state.arnNumber = initialState.arnNumber;
      state.fleetData = initialState.fleetData;
      state.selectedUser = initialState.selectedUser;
      state.arnListForAdmin = initialState.arnListForAdmin;
      state.vehicleNumber = initialState.vehicleNumber;
      state.panNumber = initialState.panNumber;
      state.mobileNo = initialState.mobileNo;
      state.vasType = initialState.vasType;
      state.vasOptions = initialState.vasOptions;
    },
  },
});

export const {
  setArnNumber,
  clearArnNumber,
  setFleetData,
  setSelectedUser,
  setArnListForAdmin,
  setSearchType,
  setVehicleNumber,
  setPanNumber,
  setMobileNo,
  resetFields,
  setArnValues,
  setVasType,
  setVasOptions,
  setServiceScheduleData,
  setRenewalData,
} = homeApiSlice.actions;
export default homeApiSlice.reducer;
