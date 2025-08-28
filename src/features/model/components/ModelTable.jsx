import React from "react";
import DataTable from "react-data-table-component";

const ModelTable = ({ data }) => {
  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1, 
      sortable: false,
      width: "100px",
    },
    {
      name: "Model ID",
      selector: row => row.modelId,
      sortable: true,
    },
    {
      name: "Model Name",
      selector: row => row.modelName,
      sortable: true,
    },
  ];

  return (
    <DataTable
      
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
    />
  );
};

export default ModelTable;
