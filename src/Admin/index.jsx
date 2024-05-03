import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminKeyInsight from "./AdminKeyInsight";
import AdminFleetDetails from "./AdminFleetDetails";
import "./index.css";

function Admin() {
  return (
    <div className="layout_wrapper">
      <Routes>
        <Route exact path="/" element={<AdminHome />} />
        <Route path="/admin-fleet-details" element={<AdminFleetDetails />} />
        <Route path="/admin-key-insight" element={<AdminKeyInsight />} />
      </Routes>
    </div>
  );
}

export default Admin;
