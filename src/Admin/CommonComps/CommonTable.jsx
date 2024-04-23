import React, { useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonTable = () => {
  const columns = [
    { id: 1, accessorKey: "name", header: "Name", width: 150 },
    { id: 2, accessorKey: "age", header: "Age", width: 100 },
    { id: 3, accessorKey: "city", header: "City", width: 150 },
    { id: 1, accessorKey: "name", header: "Name", width: 150 },
    { id: 2, accessorKey: "age", header: "Age", width: 100 },
    { id: 3, accessorKey: "city", header: "City", width: 150 },
    { id: 1, accessorKey: "name", header: "Name", width: 150 },
    { id: 2, accessorKey: "age", header: "Age", width: 100 },
    { id: 3, accessorKey: "city", header: "City", width: 150 },
  ];

  const data = [
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
    { id: 1, name: "Alice", age: 30, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "San Francisco" },
    { id: 3, name: "Charlie", age: 35, city: "Los Angeles" },
  ];

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
