import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import DeatiledTable from "../../components/Table/Table";
import {
  dueForScheduleServiceColums,
  dueforRenewalColumns,
} from "../../StaticTableData";
import { Element } from "react-scroll";
import CommonTable from "../CommonComps/CommonTable";

function AccordionTable({
  activeAccordionItem,
  setActiveAccordionItem = () => {},
  serviceScheduleData = [],
  Rowdata = [],
}) {
  return (
    <div className="container_wrapper">
      <div name="section1">
        <div className="d-flex gap-3 align-items-center my-4">
          <div className="left_line" />
          <h3 className="text_blue m-0">Due for Schedule Service</h3>
        </div>
        <div className="box-body p-0">
          <div className="js-plotly-plot">
            <CommonTable
              ColData={dueForScheduleServiceColums}
              Tbldata={serviceScheduleData}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 align-items-center my-4" name="section2">
        <div className="left_line" />
        <h3 className="text_blue m-0">Due for Renewal</h3>
      </div>
      <div className="box-body p-0">
        <div className="js-plotly-plot">
          <DeatiledTable ColData={dueforRenewalColumns} Tbldata={Rowdata} />
        </div>
      </div>
      <Accordion
        defaultActiveKey={["0"]}
        activeKey={activeAccordionItem}
        onSelect={setActiveAccordionItem}
      >
        {/* {serviceScheduleData.length !== 0 && ( */}
        {/* <Element name="section1" className="element">
          <Accordion.Item
            eventKey="0"
            style={{ marginBottom: "10px" }}
            active={activeAccordionItem === "0"}
          >
            <Accordion.Header>Due for Schedule Service</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Element> */}
        {/* )} */}
        {/* {Rowdata.length !== 0 && ( */}
        {/* <Element name="section2" className="element">
          <Accordion.Item eventKey="1">
            <Accordion.Header></Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Element> */}
        {/* )} */}
      </Accordion>
    </div>
  );
}

export default AccordionTable;
