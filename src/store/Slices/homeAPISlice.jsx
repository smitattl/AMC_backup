import { createSlice } from "@reduxjs/toolkit";
import { searchOptions } from "../../StaticTableData";

const initialState = {
  arnNumber: {},
  fleetData: {},
  selectedUser: {},
  arnListForAdmin: [],
  searchType: searchOptions[0],
  vehicleNumber: "",
  panNumber: "",
  mobileNo: "",
};

const homeApiSlice = createSlice({
  name: "homeApi",
  initialState,
  reducers: {
    setArnNumber(state, action) {
      state.arnNumber = action.payload;
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
    resetFields(state) {
      state.arnNumber = initialState.arnNumber;
      state.fleetData = initialState.fleetData;
      state.selectedUser = initialState.selectedUser;
      state.arnListForAdmin = initialState.arnListForAdmin;
      state.vehicleNumber = initialState.vehicleNumber;
      state.panNumber = initialState.panNumber;
      state.mobileNo = initialState.mobileNo;
    },
  },
});

export const {
  setArnNumber,
  setFleetData,
  setSelectedUser,
  setArnListForAdmin,
  setSearchType,
  setVehicleNumber,
  setPanNumber,
  setMobileNo,
  resetFields,
} = homeApiSlice.actions;
export default homeApiSlice.reducer;
