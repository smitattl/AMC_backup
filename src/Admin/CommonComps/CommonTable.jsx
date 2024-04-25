import React, { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonTable = ({ columns = [], data = [] }) => {
  const table = useMaterialReactTable({
    columns,
    data,

    enableColumnResizing: true,
    columnResizeMode: "onEnd",
    enableDensityToggle: false,
    initialState: { density: "compact" },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "Bold",
        fontSize: "12px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "12px",
      },
    },
  });

  return (
    <div className="custom-table">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default CommonTable;
