import { useEffect, useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./Table.css";

const DeatiledTable = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const coldata = props.ColData;
  const data = props.Tbldata;

  useEffect(() => {
    if (data.length !== 0) {
      setIsOpen(false);
    }
  }, [data]);

  const columns = useMemo(() => coldata, []);

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

export default DeatiledTable;
