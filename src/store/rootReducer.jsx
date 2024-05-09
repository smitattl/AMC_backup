import { combineReducers } from "@reduxjs/toolkit";
import arnReducer from "./Slices/arnSlice";
import homeAPIReducer from "./Slices/homeAPISlice";
import customerReducer from "./Slices/customerSlice";

const rootReducer = combineReducers({
  arn: arnReducer,
  homeApi: homeAPIReducer,
  customer: customerReducer,
});

export default rootReducer;
