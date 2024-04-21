import React from "react";
import FilterSection from "./FilterSection";
import FleetOverView from "./FleetOverView";
import QuickActions from "./QuickActions";
import CommonTable from "../CommonComps/CommonTable";

function AdminHome() {
  return (
    <div className="">
      <FilterSection />
      <FleetOverView />
      <QuickActions />
      <CommonTable />
    </div>
  );
}

export default AdminHome;
