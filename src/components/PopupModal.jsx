import React, { useEffect, useState, useMemo } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Modal } from "react-bootstrap";
import BasicDataTable from "./BasicTable/BasicDataTable";
// import CustomTable from "./Table/CustomTable"

const PopupModal = ({
  isOpen,
  onClose,
  indexClick,
  FleetDetailsColumns,
  fleetTil,
}) => {
  return (
    <div>
      <Modal show={isOpen !== false} onHide={onClose} className="modal_sec">
        <Modal.Header closeButton>
          <Modal.Title>Fleet Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {FleetDetailsData !== undefined ? (
                    // <Loading />
                    "loading"
                ) : (
                    <BasicDataTable columns={FleetDetailsColumns} data={FleetDetailsData}/>
                )} */}
          <BasicDataTable
            columns={FleetDetailsColumns}
            indextable={indexClick}
            title={fleetTil}
          />
          {/* <BasicTable columns={FleetDetailsColumns} data={FleetDetailsData}/> */}
          {/* <CustomTable columns={FleetDetailsColumns} data={FleetDetailsData}/> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        .modal_sec {
          display: flex;
          z-index: 9999;
          width: 100%;
          background-color: #ffffff1f !important;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default PopupModal;
