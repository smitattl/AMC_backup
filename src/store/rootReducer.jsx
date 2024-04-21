import { combineReducers } from "@reduxjs/toolkit";
import arnReducer from "./Slices/arnSlice";

const rootReducer = combineReducers({
  arn: arnReducer,
});

export default rootReducer;
