import React, { useState } from "react";
import FilterSection from "./FilterSection";
import FleetOverView from "./FleetOverView";
import "./index.css";
import AccordionTable from "./AccordionTable";
import { useDispatch, useSelector } from "react-redux";
import { setActiveAccordionItem } from "../../store/Slices/arnSlice";
import { useHandleClickActive } from "../../utils";

function AdminHome() {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [serviceScheduleData, setServiceScheduleData] = useState([]);

  const { activeAccordionItem } = useSelector((state) => state.arn);

  return (
    <div className="">
      <FilterSection />
      <FleetOverView />
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
