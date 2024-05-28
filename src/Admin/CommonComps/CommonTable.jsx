import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import "./index.css";
const CommonTable = ({ columns = [], data = [] }) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    enableDensityToggle: false,
    initialState: { density: "compact" },
    muiTableHeadCellProps: {
      sx: {
        textWrap: "nowrap",
        whiteSpace: "nowrap",
        border: "0.5px solid #dfe2ec8b",
        background: " #dfe2ec8b",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        paddingRight: "10px",
        border: "0.5px solid #dfe2ec8b",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
