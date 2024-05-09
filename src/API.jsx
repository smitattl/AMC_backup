import axios from "axios";
import { API_ENDPOINT_URL } from "./Config";

export const instance = axios.create({
  baseURL: API_ENDPOINT_URL,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiCall = async ({
  method = "POST",
  url = "",
  params = {},
  data,
  timeOut = 120000,
  content_type = "application/json",
}) => {
  try {
    const headers = {
      "Content-Type": content_type,
      Authorization: "Basic YWRtaW4xOjEyMw==",
    };
    const options = { headers, timeOut };
    const response = await instance({
      method,
      url,
      params,
      data,
      ...options,
    });
    return response;
  } catch (error) {
    console.error("API Call Error:", error);
    return error?.response || {};
  }
};

export const ApiInterface = {
  getvasData: (body) =>
    apiCall({
      method: "POST",
      url: "/distinct-VAS",
      data: body,
    }),

  getTotalCountData: (body) =>
    apiCall({
      method: "POST",
      url: "/total-active-vehicles",
      data: body,
    }),

  getTermsandCondition: (body) =>
    apiCall({
      method: "POST",
      url: "/Terms-Condition",
      data: body,
    }),

  getTermsandConditionAcceptData: (body) =>
    apiCall({
      method: "POST",
      url: "/Terms-Condition/accept",
      data: body,
    }),
  getAMCCountDetails: (body) =>
    apiCall({
      method: "POST",
      url: "/AMC-count-details",
      data: body,
    }),
  getFleetUpTime: (body) =>
    apiCall({
      method: "POST",
      url: "/Fleet-uptime",
      data: body,
    }),

  getuserNameData: (body) =>
    apiCall({
      method: "POST",
      url: "/get-account-name",
      data: body,
    }),

  getARNByuserName: (body) =>
    apiCall({
      method: "POST",
      url: "/get-arnFrom-AccountName",
      data: body,
    }),

  getARNbyVehicleNumber: (body) =>
    apiCall({
      method: "POST",
      url: "/get_arn_by_vehicle_no",
      data: body,
    }),

  getARNPanByMobileNo: (body) =>
    apiCall({
      method: "POST",
      url: "/get-arn-pan-by-phoneno",
      data: body,
    }),

  // form data applications
  // homee pageapi

  getTotalFleetDetailsData: (formData) =>
    apiCall({
      method: "POST",
      url: "/total-fleet-detailed",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getVehicleDetails: (formData) =>
    apiCall({
      method: "POST",
      url: "/detailed-view",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getDecryptedData: (formData) =>
    apiCall({
      method: "POST",
      url: "/de-key",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getGenericInformation: (formData) =>
    apiCall({
      method: "POST",
      url: "/Genric-information",
      data: formData,
      content_type: "multipart/form-data",
    }),

  // fleet details
  getAmcCountData: (body) =>
    apiCall({
      method: "POST",
      url: "/amc_fms_count",
      data: body,
      content_type: "multipart/form-data",
    }),

  // key insight apis
  getFleetUptime: (formData) =>
    apiCall({
      method: "POST",
      url: "/Fleet-uptime",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getFleetTatDetails: (formData) =>
    apiCall({
      method: "POST",
      url: "/fleet-TAT-detailed",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getKeyInsightsData: (formData) =>
    apiCall({
      method: "POST",
      url: "/key-insights",
      data: formData,
      content_type: "multipart/form-data",
    }),

  getKeyInsightsDataByChasis: (formData) =>
    apiCall({
      method: "POST",
      url: "/get-chasis-bar-graph-data",
      data: formData,
    }),
  getVehicledataforCustomer: (formData) =>
    apiCall({
      method: "POST",
      url: "/",
      data: formData,
    }),
  checkLoginEntries: (formData) =>
    apiCall({
      method: "POST",
      url: "/LoginEntry",
      data: formData,
      content_type: "multipart/form-data",
    }),
  getLoginEntryCount: (formData) =>
    apiCall({
      method: "POST",
      url: "/checkLoginUserCountData",
      data: formData,
      content_type: "multipart/form-data",
    }),
};
