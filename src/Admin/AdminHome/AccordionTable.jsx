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
      <Accordion
        defaultActiveKey={["0"]}
        activeKey={activeAccordionItem}
        onSelect={setActiveAccordionItem}
      >
        {serviceScheduleData.length !== 0 && (
          <Element name="section1" className="element">
            <Accordion.Item
              eventKey="0"
              style={{ marginBottom: "10px" }}
              active={activeAccordionItem === "0"}
            >
              <Accordion.Header>Due for Schedule Service</Accordion.Header>
              <Accordion.Body>
                <div className="">
                  <div className="box-body p-0">
                    <div className="js-plotly-plot">
                      <CommonTable
                        ColData={dueForScheduleServiceColums}
                        Tbldata={serviceScheduleData}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
        {Rowdata.length !== 0 && (
          <Element name="section2" className="element">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Due for Renewal</Accordion.Header>
              <Accordion.Body>
                <div className="">
                  <div className="box-body p-0">
                    <div className="js-plotly-plot">
                      <DeatiledTable
                        ColData={dueforRenewalColumns}
                        Tbldata={Rowdata}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
      </Accordion>
    </div>
  );
}

export default AccordionTable;
