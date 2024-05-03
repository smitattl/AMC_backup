import React, { useEffect, useState, useMemo } from "react";
import he from "he";
import PopupModal from "../../components/PopupModal";
import CommonModal from "../CommonModal";
import { Tooltip } from "react-tooltip";

function TableInSightsComp({
  heading = "",
  image = "",
  tabledata = [],
  tableheader = [],
  FleetDetailsColumns,
  tabledataTwo = [],
  tableheaderForTwo = [],
  tabledataFive = [],
  tableheaderForFive = [],
  fleetTurn = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [FleetTitle, setFleetTitel] = useState();
  const [indexTAT, setindexTAT] = useState();

  const handleTdClick = (headerresp, header) => {
    if (headerresp !== 0 && tableheader[0].title !== "All Jobs") {
      setindexTAT(header);
      setIsModalOpen(true);
      setFleetTitel(tableheader[0].title);
    }
  };

  return (
    <>
      <div className="insight_wrapper">
        {heading && <div className="card_heading">{heading}</div>}
        <div className="icon_and_table">
          <div className="image_section">
            <img src={image} alt="" />
          </div>
          <div className="insight_table_wrapper">
            <table className="insight_table">
              <thead>
                <tr>
                  {tableheader.map((item, index) => (
                    <th key={index}>{he.decode(item.title)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabledata.length > 0 ? (
                  tabledata.map((row, rowIndex) => {
                    return (
                      <tr key={rowIndex}>
                        {tableheader.map((header, cellIndex) => (
                          <td
                            key={cellIndex}
                            onClick={() => {
                              if (
                                header.accessor === "Fleet_Mileage" ||
                                fleetTurn
                              ) {
                                handleTdClick(row[header.accessor], cellIndex);
                              } else if (header.accessor === "active_vehicles")
                                setShowLink(!showLink);
                            }}
                            className={
                              header.accessor === "Fleet_Mileage" ||
                              header.accessor === "active_vehicles" ||
                              fleetTurn
                                ? "fleet_link position-relative"
                                : "position-relative"
                            }
                          >
                            <span
                              data-tooltip-id="fleetedge_link"
                              data-tooltip-content="Click here for Fleetedge"
                              data-tooltip-place="bottom"
                              onClick={() =>
                                window.open(
                                  "https://fleetedge.home.tatamotors/auth/login"
                                )
                              }
                            >
                              {row[header.accessor || "0"]}
                            </span>
                            <Tooltip id="fleetedge_link" />
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    {tableheader.map((header, cellIndex) => (
                      <td
                        key={cellIndex}
                        // onClick={() => {
                        //   if (header.accessor === "active_vehicles") {
                        //     setShowLink(!showLink);
                        //   }
                        // }}
                        className={
                          header.accessor === "active_vehicles"
                            ? "fleet_link position-relative"
                            : "position-relative"
                        }
                      >
                        <span
                          data-tooltip-id="fleetedge_link"
                          data-tooltip-content="Click here for Fleetedge"
                          data-tooltip-place="bottom"
                          onClick={() =>
                            window.open(
                              "https://fleetedge.home.tatamotors/auth/login"
                            )
                          }
                        >
                          0
                        </span>
                        <Tooltip id="fleetedge_link" />
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {tableheaderForTwo.length > 0 && (
            <div className="insight_table_wrapper">
              {tableheaderForTwo.length > 0 && (
                <table className="insight_table">
                  <thead>
                    <tr>
                      {tableheaderForTwo?.map((item, index) => (
                        <th key={index}>{he.decode(item.title)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tabledataTwo.length > 0 ? (
                      tabledataTwo.map((row, rowIndex) => {
                        return (
                          <tr key={rowIndex}>
                            {tableheaderForTwo.map((header, cellIndex) => (
                              <td key={cellIndex}>
                                <a
                                  onClick={() =>
                                    handleTdClick(
                                      row[header.accessor],
                                      cellIndex
                                    )
                                  }
                                >
                                  {row[header.accessor] || "0"}
                                </a>
                              </td>
                            ))}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        {tableheaderForTwo.map((header, cellIndex) => (
                          <td key={cellIndex}>0</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {tableheaderForFive.length > 0 && (
            <div className="insight_table_wrapper">
              {tableheaderForFive.length > 0 && (
                <table className="insight_table">
                  <thead>
                    <tr>
                      {tableheaderForFive?.map((item, index) => (
                        <th key={index}>{he.decode(item.title)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tabledataFive.length > 0 ? (
                      tabledataFive.map((row, rowIndex) => {
                        return (
                          <tr key={rowIndex}>
                            {tableheaderForFive.map((header, cellIndex) => (
                              <td key={cellIndex}>
                                <a
                                  onClick={() =>
                                    handleTdClick(
                                      row[header.accessor],
                                      cellIndex
                                    )
                                  }
                                >
                                  {row[header.accessor || "0"]}
                                </a>
                              </td>
                            ))}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        {tableheaderForFive.map((header, cellIndex) => (
                          <td key={cellIndex}>0</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
      <PopupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        FleetDetailsColumns={FleetDetailsColumns}
        fleetTil={FleetTitle}
        indexClick={indexTAT}
      />
      {/* {showLink && (
        <CommonModal
          setCloseModal={setShowLink}
          children={
            <React.Fragment>
              <p>
                You can redirect to FleetEdge, our comprehensive fleet
                management platform
              </p>

              <button
                onClick={() =>
                  window.open("https://fleetedge.home.tatamotors/auth/login")
                }
              >
                Redirect to FLeetedge
              </button>
            </React.Fragment>
          }
        />
      )} */}
    </>
  );
}

export default TableInSightsComp;
