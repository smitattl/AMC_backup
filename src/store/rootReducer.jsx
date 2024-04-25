import { combineReducers } from "@reduxjs/toolkit";
import arnReducer from "./Slices/arnSlice";
import homeAPIReducer from "./Slices/homeAPISlice";

const rootReducer = combineReducers({
  arn: arnReducer,
  homeApi: homeAPIReducer,
});

export default rootReducer;
