import { useState } from "react";

export const tableheaderOne = [
  {
    title: "Total Active Vehicle Count Under Fleetedge",
    accessor: "active_vehicles",
  },
  {
    title: "Average Fleet Mileage",
    accessor: "Fleet_Mileage",
  },
  {
    title: "Average running per vehicle per day",
    accessor: "Avg_running_per_vehicle",
  },
];

export const chasistableHeader = [
  {
    title: "Adherence chassis (%) ",
    accessor: "Chassis_Count",
  },
];

export const barGraphData = [
  {
    x: [
      "Jan 2023",
      "Feb 2023",
      "Mar 2023",
      "Apr 2023",
      "May 2023",
      "Jun 2023",
      "Jul 2023",
      "Aug 2023",
      "Sep 2023",
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
    ],
    y: [100, 150, 70, 250, 300, 200, 350, 200, 450, 250, 340, 200],
    type: "bar",
  },
];

export const tableheaderTwo = [
  {
    title: "Vehicle Due for Service",
    accessor: "Due_last_month",
  },
  {
    title: "Service Availed",
    accessor: "Availed",
  },
];
export const tableheaderThree = [
  {
    title: "All Jobs",
    accessor: "all_jobs",
  },
  {
    title: "Due for Scheduled Service",
    accessor: "Due_for_Schedule_Service",
  },
  {
    title: "Schedule Services Availed",
    accessor: "Availed",
  },
  {
    title: "Adherence",
    accessor: "Adherence",
  },
];
export const tableheaderFour = [
  {
    title: "&lt;24(Hrs)",
    accessor: "lessthan24",
  },
  {
    title: "24-48(Hrs)",
    accessor: "btw24_48",
  },
  {
    title: ">48(Hrs)",
    accessor: "greaterthan48",
  },
];

export const adherenceTableHeading = [
  {
    title: "Adherence chassis (%) ",
    accessor: "Chassis_Count",
  },
];

export const FleetDetailsColumns = [
  {
    width: 130,
    title: "PL",
    field: "PL",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 140,
    title: "LOB",
    field: "LOB",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "FE",
    field: "FE",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "DEF",
    field: "DEF",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 140,
    title: "PPL",
    field: "PPL",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "Count",
    field: "Count",
    enableSearch: true,
    enableFilter: true,
  },
];

export const FleetTATColumns = [
  {
    width: 130,
    title: "PL",
    field: "pl",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 140,
    title: "Chassis No",
    field: "chassis_no",
    enableSearch: true,
    enableFilter: true,
  },
  {
    title: "Vehical Reg. No.",
    field: "Vehicle_Reg_No",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "VAS",
    field: "Vas_Type",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "AMC/FMS Type",
    field: "amc_type",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "Job Card Start Date",
    field: "Jobcard_Created_Date",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "Job Card End Date",
    field: "Jobcard_Close_Date",
    enableSearch: true,
    enableFilter: true,
  },
  // {
  //   width: 130,
  //   title: "Contract start Date",
  //   field: "amc_Start_date",
  //   enableSearch: true,
  //   enableFilter: true,
  // },
  {
    width: 140,
    title: "Contract End Date",
    field: "amc_end_Date",
    enableSearch: true,
    enableFilter: true,
  },
  // {
  //   width: 130,
  //   title: "Start Kms",
  //   field: "Amc_Start_Kms",
  //   enableSearch: true,
  //   enableFilter: true,
  // },
  {
    width: 130,
    title: "Contract End KMs",
    field: "Amc_End_Kms",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 130,
    title: "PPL",
    field: "ppl",
    enableSearch: true,
    enableFilter: true,
  },
  {
    width: 140,
    title: "LOB",
    field: "lob",
    enableSearch: true,
    enableFilter: true,
  },
  // {
  //   width: 140,
  //   title: "Current Status",
  //   field: "amc_status",
  //   enableSearch: true,
  //   enableFilter: true,
  // },
  // {
  //   width: 130,
  //   title: "Application Type",
  //   field: "Application",
  //   enableSearch: true,
  //   enableFilter: true,
  // },
];

export const FleetTATData = [
  { chassis_no: "SCVPass",Jobcard_Created_Date: "10",Jobcard_Close_Date: "Ace Gold CNG",Vehicle_Reg_No: "Ace Gold CNG",Vas_Type: "135",amc_status:"",Application:"",amc_Start_date:"",amc_end_Date:"",Amc_Start_Kms:"",Amc_End_Kms:"",lob:"",ppl:"",pl:""},
];

// export const FleetDetailsData = [
//   { LOB: "SCVPass",FE: "10",PPL: "Ace Gold CNG",PL: "Ace Gold CNG",Count: "135",},
//   { LOB: "ICV Trucks", FE: "15", PPL: "Ace Gold Diesel", PL: "", Count: "6" },
//   {LOB: "MCV Trucks",FE: "20",PPL: "Ace Gold Petrol CX",PL: "",Count: "33",},
//   { LOB: "ScPass", FE: "25", PPL: "Intra V10", PL: "", Count: "6" },
//   { LOB: "HCV Cargo", FE: "30", PPL: "Intra V20", PL: "", Count: "1" },
//   { LOB: "HCV Const", FE: "35", PPL: "Intra V30", PL: "", Count: "70" },
//   {
//     LOB: "Buses",
//     FE: "40",
//     PPL: "Pickup Large",
//     PL: "Pickup Large",
//     Count: "6",
//   },
//   { LOB: "LCV", FE: "45", PPL: "Tata Ace", PL: "", Count: "1" },
//   { LOB: "SCV Cargo", FE: "50", PPL: "Yodha", PL: "Yodha", Count: "1100" },
//   { LOB: "Pickups", FE: "55", PPL: "Yodha1", PL: "Yodha", Count: "1100" },
// ];

// const [LOBOptions, setLOBOptions] = useState([
//   {
//     label: "LOB1",
//     value: "LOB1",
//   },
//   {
//     label: "LOB2",
//     value: "LOB2",
//   },
//   {
//     label: "LOB3",
//     value: "LOB3",
//   },
//   {
//     label: "LOB4",
//     value: "LOB4",
//   },
// ]);
// const [PPLOptions, setPPLOptions] = useState([
//   {
//     label: "PPL1",
//     value: "PPL1",
//   },
//   {
//     label: "PPL2",
//     value: "PPL2",
//   },
//   {
//     label: "PPL3",
//     value: "PPL3",
//   },
//   {
//     label: "PPL4",
//     value: "PPL4",
//   },
// ]);
// const [PLOptions, setPLOptions] = useState([
//   {
//     label: "PL1",
//     value: "PL1",
//   },
//   {
//     label: "PL2",
//     value: "PL2",
//   },
//   {
//     label: "PL3",
//     value: "PL3",
//   },
//   {
//     label: "PL4",
//     value: "PL4",
//   },
// ]);
// const [StateOptions, setStateOptions] = useState([
//   {
//     label: "State1",
//     value: "State1",
//   },
//   {
//     label: "State2",
//     value: "State2",
//   },
//   {
//     label: "State3",
//     value: "State3",
//   },
//   {
//     label: "State4",
//     value: "State4",
//   },
// ]);
// const [DistOptions, setDistOptions] = useState([
//   {
//     label: "Dist1",
//     value: "Dist1",
//   },
//   {
//     label: "Dist2",
//     value: "Dist2",
//   },
//   {
//     label: "Dist3",
//     value: "Dist3",
//   },
//   {
//     label: "Dist4",
//     value: "Dist4",
//   },
// ]);
