import { createSlice } from "@reduxjs/toolkit";
import { searchOptions } from "../../StaticTableData";

const initialState = {
  arnNumber: {},
  fleetData: {},
  selectedUser: {},
  arnListForAdmin: [],
  searchType: searchOptions[0],
  vehicleNumber: null,
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
  },
});

export const {
  setArnNumber,
  setFleetData,
  setSelectedUser,
  setArnListForAdmin,
  setSearchType,
  setVehicleNumber,
} = homeApiSlice.actions;
export default homeApiSlice.reducer;
