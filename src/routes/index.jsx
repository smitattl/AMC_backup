import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Logout from "../components/Logout/Logout";
import Admin from "../Admin";
import LandingPage from "../pages/LandingPage";
import KeyInsights from "../pages/KeyInsights";
import FleetDetails from "../pages/FleetDetails";

const IndexRoute = () => {
  return (
    <Routes>
      <Route path="/Home/:param1/:param2" element={<LandingPage />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/Home/Fleet-details" element={<FleetDetails />} />
        <Route path="/Home/Key-insights" element={<KeyInsights />} />
        <Route path="/thank-you" element={<Logout />} />
      </Route>
      <Route path="*" element={<Logout />} />
    </Routes>
  );
};

export default IndexRoute;
