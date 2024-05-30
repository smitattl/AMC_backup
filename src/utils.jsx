import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import jwtEncode from "jwt-encode";
import {
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
} from "./store/Slices/arnSlice";
import {
  setShowTableForCustomerOne,
  setShowTableForCustomerTwo,
} from "./store/Slices/customerSlice";
import { SECRET_KEY } from "./Config";

export const LogoutSession = () => {
  const navigate = useLocation();
  localStorage.clear();
  navigate("/thank-you");
  window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
};

export const useHandleClickActive = () => {
  const dispatch = useDispatch();
  const handleClickActive = (element) => {
    if (element === "section1") {
      dispatch(setShowTableForCustomerOne(true));
    } else if (element === "section2") {
      dispatch(setShowTableForCustomerTwo(true));
    }
  };

  return handleClickActive;
};
export const useHandleClickActiveForAdmin = () => {
  const dispatch = useDispatch();
  const handleClickActiveForAdmin = (element) => {
    if (element === "section1") {
      dispatch(setShowTableForAdminOne(true));
      dispatch(setShowTableForAdminTwo(false));
    } else if (element === "section2") {
      dispatch(setShowTableForAdminTwo(true));
      dispatch(setShowTableForAdminOne(false));
    }
  };

  return handleClickActiveForAdmin;
};
export const maskEmail = (email) => {
  if (email === null) return "No Email Registered";
  else {
    const atIndex = email?.indexOf("@");
    if (atIndex === -1) return email;
    const maskedPart = email?.slice(0, atIndex)?.replace(/./g, "*");
    const domainPart = email?.slice(atIndex);
    return email?.slice(0, 2) + maskedPart + domainPart;
  }
};

export const NameInitials = ({ names }) => {
  const trimmedNames = names?.trimStart();
  const words = trimmedNames.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const initials = firstTwoWords
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return <div>{initials}</div>;
};

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const generateToken = (arn_no) => {
  const payload = {
    arn_no,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
  };
  const token = jwtEncode(payload, SECRET_KEY);
  return token;
};
