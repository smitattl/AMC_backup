import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setActiveAccordionItem,
  setShowTableForAdmin,
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
} from "./store/Slices/arnSlice";
import { apiDecryptionKey } from "./Config";

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
      dispatch(setActiveAccordionItem("0"));
    } else if (element === "section2") {
      dispatch(setActiveAccordionItem("1"));
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
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return email;
  const maskedPart = email.slice(0, atIndex).replace(/./g, "*");
  const domainPart = email.slice(atIndex);
  return maskedPart + domainPart;
};

export const NameInitials = ({ names }) => {
  const words = names?.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const initials = firstTwoWords
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return <React.Fragment>{initials}</React.Fragment>;
};
