import { createSlice } from "@reduxjs/toolkit";
import { customerSelectOptions } from "../../StaticTableData";
const initialState = {
  arnListForCustomer: [],
  arnForCustomer: "",
  selectSearchType: customerSelectOptions[0],
  arnValuesForCustomer: [],
  chasisNumber: "",
  vehicleRegistrationNo: "",
  customerVasType: {},
  customerVasList: [],
  indexTAT: [],
  isOpen: false,
  showFilterOptions: false,
  activeAccordionItem: "",
  showTableForCustomerOne: false,
  showTableForCustomerTwo: false,
  params: {},
  customerData: [],
  preventApiCalling: true,
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
    setCustomerVasType(state, action) {
      state.customerVasType = action.payload;
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
    setCustomerVasList(state, action) {
      state.customerVasList = action.payload;
    },
    setParams(state, action) {
      state.params = action.payload;
    },
    setCustomerData(state, action) {
      state.customerData = action.payload;
    },
    setPreventApiCalling(state, action) {
      state.preventApiCalling = action.payload;
    },
  },
});

export const {
  setArnListForCustomer,
  setArnForCustomer,
  setSelectSearchType,
  setArnValuesForCustomer,
  setChasisNumber,
  setCustomerVasType,
  setIndexTAT,
  setIsOpen,
  setShowFilterOptions,
  setActiveAccordionItem,
  setShowCustomerTable,
  setShowTableForCustomerTwo,
  setShowTableForCustomerOne,
  setCustomerVasList,
  setParams,
  setCustomerData,
  setPreventApiCalling,
} = customerSlice.actions;
export default customerSlice.reducer;
