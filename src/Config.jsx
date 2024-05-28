import toast from "react-hot-toast";

export const API_ENDPOINT_URL = process.env.REACT_APP_API_ENDPOINT_URL;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const successMsg = (text) => toast.success(text);
export const errorMsg = (text) => toast.error(text);
