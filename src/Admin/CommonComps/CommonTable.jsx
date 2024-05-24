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
    enableColumnResizing: true,
    enableDensityToggle: false,
    initialState: { density: "comfortable" },
    muiTableHeadCellProps: {
      sx: {
        width: 100,
        textWrap: "wrap",
        whiteSpace: "wrap",
        border: "0.5px solid #dfe2ec8b",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        width: 100,
        textWrap: "wrap",
        border: "0.5px solid #dfe2ec8b",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
