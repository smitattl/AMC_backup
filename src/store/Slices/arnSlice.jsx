import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arnList: [],
  activeAccordionItem: null,
  userData: [],
  userEntryCount: null,
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
  },
});

export const {
  setArnList,
  setActiveAccordionItem,
  setUserData,
  setUserEntryCount,
} = arnSlice.actions;
export default arnSlice.reducer;
