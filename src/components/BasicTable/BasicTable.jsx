import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./BasicTable.module.css";

const BasicTable = ({
  columns,
  data,
  noOfEmptyRows = 0,
  tableRowHeight = "35px",
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popoverVal, setPopoverVal] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event, val) => {
    if (event.currentTarget.scrollWidth > event.currentTarget.clientWidth) {
      setPopoverVal(val);
      setIsPopupOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setIsPopupOpen(false);
    setAnchorEl(null);
  };

  const noOfPaddedRowsRequired = Math.max(noOfEmptyRows - data.length, 0);
  const paddedData = [
    ...data,
    ...[...Array(noOfPaddedRowsRequired).keys()].map(() => ({
      isPaddingRow: true,
      id: Math.floor(Math.random() * 99999),
    })),
  ];

  const renderColumn = (row, column) => {
    if (row.isPaddingRow) return <span />;
    return column.render ? column.render(row) : row[column.field];
  };

  return (
    <div className="table-responsive">
      <table
        className={styles.table}
        border="0"
        cellPadding="0"
        cellSpacing="0"
      >
        <thead>
          <tr style={{ position: "sticky", top: 0, height: tableRowHeight }}>
            {columns.map((column) => (
              <th
                style={{
                  textAlign: "center",
                  ...column.style,
                  ...column.headerStyle,
                  width: column.width,
                }}
                key={column.title}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paddedData.map((row) => (
            <tr
              key={row.id}
              style={{ minHeight: tableRowHeight, height: tableRowHeight }}
            >
              {columns.map((column) => (
                <td
                  key={column.field}
                  style={{
                    textAlign: "center",
                    ...column.style,
                    ...column.cellStyle,
                    width: column.width,
                    maxWidth: column.width,
                  }}
                  className={styles.tableCell}
                  onMouseEnter={(e) => handlePopoverOpen(e, row[column.field])}
                  onMouseLeave={(e) => handlePopoverClose(e)}
                >
                  {renderColumn(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Popover
        open={isPopupOpen}
        anchorEl={anchorEl}
        onClose={() => setIsPopupOpen(false)}
        style={{
          pointerEvents: "none",
        }}
        classes={{
          paper: styles.popoverPaper,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {popoverVal}
      </Popover>
    </div>
  );
};

BasicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      width: PropTypes.number,
      style: PropTypes.object,
      headerStyle: PropTypes.object,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.any.isRequired })),
  noOfEmptyRows: PropTypes.number,
  tableRowHeight: PropTypes.number,
};

export default BasicTable;
