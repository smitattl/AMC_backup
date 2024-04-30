import toast, { useToasts } from "react-hot-toast";

export const API_ENDPOINT_URL = process.env.REACT_APP_API_ENDPOINT_URL;
export const apiDecryptionKey = process.env.DJANGO_SECRET_KEY;

export const successMsg = (text) => toast.success(text);
export const errorMsg = (text) => toast.error(text);
