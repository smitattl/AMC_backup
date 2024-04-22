import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminKeyInsight from "./AdminKeyInsight";
import AdminFleetDetails from "./AdminFleetDetails";
import "./index.css";

function Admin() {
  return (
    <div>
      <div className="layout_wrapper">
        <Routes>
          <Route exact path="/" element={<AdminHome />} />
          <Route
            path="/admin/admin-key-insight"
            element={<AdminKeyInsight />}
          />
          <Route
            path="/admin/admin-fleet-details"
            element={<AdminFleetDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
