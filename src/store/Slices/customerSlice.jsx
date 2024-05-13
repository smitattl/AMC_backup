import { createSlice } from "@reduxjs/toolkit";
import { customerSelectOptions } from "../../StaticTableData";
const initialState = {
  arnListForCustomer: [],
  arnForCustomer: "",
  selectSearchType: customerSelectOptions[0],
  arnValuesForCustomer: null,
  chasisNumber: "",
  vehicleRegistrationNo: "",
  selectVasType: {},
  indexTAT: [],
  isOpen: true,
  showFilterOptions: false,
  activeAccordionItem: "",
  showTableForCustomerOne: false,
  showTableForCustomerTwo: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setArnListForCustomer(state, action) {
      state.arnListForCustomer = action.payload;
    },
    setArnForCustomer(state, action) {
      state.arnForCustomer = action.payload;
    },
    setSelectSearchType(state, action) {
      state.selectSearchType = action.payload;
    },
    setArnValuesForCustomer(state, action) {
      state.arnValuesForCustomer = action.payload;
    },
    setChasisNumber(state, action) {
      state.chasisNumber = action.payload;
    },
    setVehicleRegistrationNo(state, action) {
      state.vehicleRegistrationNo = action.payload;
    },
    setSelectVasType(state, action) {
      state.selectVasType = action.payload;
    },
    setIndexTAT(state, action) {
      state.indexTAT = action.payload;
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setShowFilterOptions(state, action) {
      state.showFilterOptions = action.payload;
    },
    setActiveAccordionItem(state, action) {
      state.activeAccordionItem = action.payload;
    },
    setShowTableForCustomerOne(state, action) {
      state.showTableForCustomerOne = action.payload;
    },
    setShowTableForCustomerTwo(state, action) {
      state.showTableForCustomerTwo = action.payload;
    },
  },
});

export const {
  setArnListForCustomer,
  setArnForCustomer,
  setSelectSearchType,
  setArnValuesForCustomer,
  setChasisNumber,
  setSelectVasType,
  setIndexTAT,
  setIsOpen,
  setShowFilterOptions,
  setActiveAccordionItem,
  setShowCustomerTable,
  setShowTableForCustomerTwo,
  setShowTableForCustomerOne,
} = customerSlice.actions;
export default customerSlice.reducer;
