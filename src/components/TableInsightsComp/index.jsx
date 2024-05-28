import React, { useState } from "react";
import he from "he";
import { Tooltip } from "react-tooltip";
import { setIndexTAT } from "../../store/Slices/customerSlice";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import "./index.css";

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
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [FleetTitle, setFleetTitel] = useState();

  const handleTdClick = (headerresp, header) => {
    if (headerresp === null) return;
    if (headerresp !== 0 && tableheader[0].title !== "All Jobs") {
      dispatch(setIndexTAT(header));
      setIsModalOpen(true);
      setFleetTitel(tableheader[0].title);
    }
  };

  return (
    <React.Fragment>
      <div className="insight_wrapper">
        {heading && (
          <div className="card_heading gap-3">
            <div className="image_section">
              <img src={image} alt="" />
            </div>
            <h5 className="key_insight_table_title">{heading}</h5>
          </div>
        )}
        <div className="icon_and_table">
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
                        {tableheader.map((header, cellIndex) => {
                          return (
                            <td
                              key={cellIndex}
                              onClick={() => {
                                if (
                                  header.accessor === "Fleet_Mileage" ||
                                  fleetTurn
                                ) {
                                  handleTdClick(
                                    row[header.accessor],
                                    cellIndex
                                  );
                                } else if (
                                  header.accessor === "active_vehicles"
                                )
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
                              {header.accessor === "active_vehicles" ? (
                                <>
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
                                    {row[header.accessor] === null
                                      ? 0
                                      : row[header.accessor || 0]}
                                  </span>
                                  <Tooltip
                                    id="fleetedge_link"
                                    style={{ zIndex: "10" }}
                                  />
                                </>
                              ) : row[header.accessor] === null ? (
                                0
                              ) : (
                                row[header.accessor || 0]
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    {tableheader.map((header, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={
                          header.accessor === "active_vehicles"
                            ? "fleet_link position-relative"
                            : "position-relative"
                        }
                      >
                        {header.accessor === "active_vehicles" ? (
                          <>
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
                            <Tooltip
                              id="fleetedge_link"
                              style={{ zIndex: "10" }}
                            />
                          </>
                        ) : (
                          0
                        )}
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
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          FleetDetailsColumns={FleetDetailsColumns}
          fleetTil={FleetTitle}
        />
      )}
      {/* <PopupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        FleetDetailsColumns={FleetDetailsColumns}
        fleetTil={FleetTitle}
      /> */}
    </React.Fragment>
  );
}

export default TableInSightsComp;
