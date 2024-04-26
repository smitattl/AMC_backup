import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveAccordionItem } from "./store/Slices/arnSlice";

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
