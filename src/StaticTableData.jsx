import moment from "moment/moment";
import React from "react";

export const dueForScheduleServiceColums = [
  {
    accessorKey: "pl",
    header: "PL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "chassis_no",
    header: "Chassis No.",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "Vehicle_Reg_No",
    header: "Vehicle Registration Number",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "next_service_due_date",
    header: "Next Service Due Date",
    Header: ({ column }) => (
      <a>
        {column.columnDef.header} &nbsp;
        <span className="text-sm">(YYYY-MM-DD)</span>
      </a>
    ),
    Cell: ({ value }) => {
      const formattedDate = moment(value).format("YYYY-MM-DD");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "contract_end_kms",
    header: "Contract End KMs",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "contract_end_date",
    header: "Contract End Date",
    Header: ({ column }) => (
      <a>
        {column.columnDef.header} &nbsp;
        <span className="text-sm">(YYYY-MM-DD)</span>
      </a>
    ),
    Cell: ({ value }) => {
      const formattedDate = moment(value).format("YYYY-MM-DD");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "ppl",
    header: "PPL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "lob",
    header: "LOB",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
];

export const dueforRenewalColumns = [
  {
    accessorKey: "pl",
    header: "PL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "chassis_no",
    header: "Chassis No.",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "Vehicle_Reg_No",
    header: "Vehicle Registration Number",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "Contract_renewal_Date",
    header: "Next renewal Date",
    Header: ({ column }) => (
      <a>
        {column.columnDef.header}&nbsp;
        <span className="text-sm">(YYYY-MM-DD)</span>
      </a>
    ),
    Cell: ({ value }) => {
      const formattedDate = moment(value).format("YYYY-MM-DD");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "contract_end_kms",
    header: "Contract End KMs  ",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "ppl",
    header: "PPL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "lob",
    header: "LOB",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
];

export const fleetTableColumns = [
  {
    accessorKey: "pl",
    header: "PL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "chassis_no",
    header: "Chassis No.",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "vehicle_reg_no",
    header: "Vehical Reg. No.",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "vas_type",
    header: "VAS",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "contract_type",
    header: "AMC/FMS Type",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "contract_start_Date",
    header: "Contract start date ",
    Header: ({ column }) => (
      <a>
        {column.columnDef.header}&nbsp;
        <span className="text-sm">(YYYY-MM-DD)</span>
      </a>
    ),
    Cell: ({ value }) => {
      const formattedDate = moment(value).format("YYYY-MM-DD");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "contract_end_Date",
    header: "Contract end date ",
    Header: ({ column }) => (
      <a className="columnHeader">
        {column.columnDef.header}&nbsp;
        <span className="text-sm">(YYYY-MM-DD)</span>
      </a>
    ),
    Cell: ({ value }) => {
      const formattedDate = moment(value).format("YYYY-MM-DD");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "contract_start_kms",
    header: "Contract Start KMs",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "contract_end_kms",
    header: "Contract End KMs ",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "current_status",
    header: "Current Status ",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "application",
    header: "Application Type",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "ppl",
    header: "PPL",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
  {
    accessorKey: "lob",
    header: "LOB",
    Header: ({ column }) => <a>{column.columnDef.header}</a>,
  },
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const searchOptions = [
  {
    label: "ARN Number",
    value: "arn_number",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "Vehicle Registration Number",
    value: "vehicle_registration_no",
  },
  {
    label: "Mobile Number",
    value: "mobile_no",
  },
];

export const customerSelectOptions = [
  {
    label: "ARN Number",
    value: "arn_number",
  },
  {
    label: "Chassis Number",
    value: "chassis_name",
  },
  {
    label: "Vehicle Registration Number",
    value: "vehicle_registration_no",
  },
];
