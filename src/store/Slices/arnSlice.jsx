import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arnList: [],
  activeAccordionItem: null,
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
  },
});

export const { setArnList, setActiveAccordionItem } = arnSlice.actions;
export default arnSlice.reducer;
