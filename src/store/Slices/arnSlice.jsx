import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arnList: [],
  arnNumber: "",
  activeAccordionItem: null,
  userData: [],
  userMobile: "",
  userEntryCount: null,
  params: {},
  fleetData: {},
  showTableForAdminOne: false,
  showTableForAdminTwo: false,
};

const arnSlice = createSlice({
  name: "arn",
  initialState,
  reducers: {
    setArnList(state, action) {
      state.arnList = action.payload;
    },
    setActiveAccordionItem(state, action) {
      state.activeAccordionItem = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setUserEntryCount(state, action) {
      state.userEntryCount = action.payload;
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    setArnNumber(state, action) {
      state.arnNumber = action.payload;
    },
    setFleetData(state, action) {
      state.fleetData = action.payload;
    },
    setUserMobile(state, action) {
      state.userMobile = action.payload;
    },
    setShowTableForAdminOne(state, action) {
      state.showTableForAdminOne = action.payload;
    },
    setShowTableForAdminTwo(state, action) {
      state.showTableForAdminTwo = action.payload;
    },
  },
});

export const {
  setArnList,
  setActiveAccordionItem,
  setUserData,
  setUserEntryCount,
  setParams,
  setArnNumber,
  setFleetData,
  setUserMobile,
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
} = arnSlice.actions;
export default arnSlice.reducer;
