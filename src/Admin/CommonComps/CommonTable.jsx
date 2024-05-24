import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import "./index.css";
const CommonTable = ({ columns = [], data = [] }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableDensityToggle: false,
    initialState: { density: "spacious" },
    muiTableHeadCellProps: {
      sx: {
        width: "300px",
        textWrap: "nowrap",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        width: "300px",
        textWrap: "nowrap",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
