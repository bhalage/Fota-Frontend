import React from "react";
import DataTable from "react-data-table-component";

const VehicleTable = ({ data }) => {
  const columns = [
    
    {
      name: "Vehicle ID",
      selector: (row) => row.vehicleId,
      sortable: true,
    },
    {
      name: "Vehicle Name",
      selector: (row) => row.vehicleName,
      sortable: true,
    },
    {
      name: "VIN",
      selector: (row) => row.vin,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(data) ? data : []} // ✅ safe fallback
      pagination
      highlightOnHover
      striped
      noDataComponent="No vehicles found"
    />
  );
};

export default VehicleTable;
