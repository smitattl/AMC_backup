import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arnList: [],
};

const arnSlice = createSlice({
  name: "arn",
  initialState,
  reducers: {
    setArnList(state, action) {
      state.arnList = action.payload;
    },
  },
});

export const { setArnList } = arnSlice.actions;
export default arnSlice.reducer;
