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
    title: "Total Number of Job Cards",
    accessor: "all_jobs",
  },
  {
    title: "Due for Scheduled Service",
    accessor: "Scheduled_service",
  },
  {
    title: "Schedule Services Availed",
    accessor: "Availed",
  },
  {
    title: "Adherence",
    accessor: "adherence",
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
    field: "DFE",
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
  {
    width: 140,
    title: "Contract End Date",
    field: "amc_end_Date",
    enableSearch: true,
    enableFilter: true,
  },
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
];

export const FleetTATData = [
  {
    chassis_no: "SCVPass",
    Jobcard_Created_Date: "10",
    Jobcard_Close_Date: "Ace Gold CNG",
    Vehicle_Reg_No: "Ace Gold CNG",
    Vas_Type: "135",
    amc_status: "",
    Application: "",
    amc_Start_date: "",
    amc_end_Date: "",
    Amc_Start_Kms: "",
    Amc_End_Kms: "",
    lob: "",
    ppl: "",
    pl: "",
  },
];
