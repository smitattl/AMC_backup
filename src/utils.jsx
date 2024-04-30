import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveAccordionItem } from "./store/Slices/arnSlice";
import CryptoJS from "crypto-js";
import { apiDecryptionKey } from "./Config";

export const LogoutSession = () => {
  const navigate = useLocation();
  localStorage.removeItem("ARN-Number");
  localStorage.removeItem("ARN-Name");
  navigate("/thank-you");
  window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
};

export const useHandleClickActive = () => {
  const dispatch = useDispatch();

  const handleClickActive = (element) => {
    if (element === "section1") {
      dispatch(setActiveAccordionItem("0"));
    } else if (element === "section2") {
      dispatch(setActiveAccordionItem("1"));
    }
  };

  return handleClickActive;
};

export const maskEmail = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return email;
  const maskedPart = email.slice(0, atIndex).replace(/./g, "*");
  const domainPart = email.slice(atIndex);
  return maskedPart + domainPart;
};

const encryptionKey = apiDecryptionKey;

export const encryptMobileNo = (mobileNo) => {
  const encryptedMobileNo = CryptoJS.AES.encrypt(
    mobileNo,
    encryptionKey
  ).toString();
  return encryptedMobileNo;
};

export const encryptPan = (pan) => {
  const encryptedPan = CryptoJS.AES.encrypt(pan, encryptionKey).toString();
  return encryptedPan;
};

export const decrypt = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};
