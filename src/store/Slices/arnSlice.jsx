import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arnList: [],
  arnNumber: "",
  activeAccordionItem: null,
  userMobile: "",
  userEntryCount: null,

  fleetData: {},
  showTableForAdminOne: false,
  showTableForAdminTwo: false,
  chasis_no: "",
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
    setUserEntryCount(state, action) {
      state.userEntryCount = action.payload;
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
    setChasisNo(state, action) {
      state.chasis_no = action.payload;
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
  setUserEntryCount,
  setArnNumber,
  setFleetData,
  setUserMobile,
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
  setChasisNo,
} = arnSlice.actions;
export default arnSlice.reducer;
