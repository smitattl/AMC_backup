import React, { useState } from "react";
import FilterSection from "./FilterSection";
import FleetOverView from "./FleetOverView";
import QuickActions from "./QuickActions";
import CommonTable from "../CommonComps/CommonTable";
import "./index.css";
import AccordionTable from "./AccordionTable";

function AdminHome() {
  const [rowData, setRowData] = useState([]);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const handleClickActive = (element) => {
    if (element === "section1") {
      setActiveAccordionItem("0");
    } else if (element === "section2") {
      setActiveAccordionItem("1");
    }
  };
  return (
    <div className="">
      <FilterSection />
      <FleetOverView />
      <QuickActions handleClickActive={handleClickActive} />
      <AccordionTable
        Rowdata={rowData}
        activeAccordionItem={activeAccordionItem}
        setActiveAccordionItem={setActiveAccordionItem}
        serviceScheduleData={serviceScheduleData}
      />
    </div>
  );
}

export default AdminHome;
