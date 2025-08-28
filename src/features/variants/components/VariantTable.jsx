import React from "react";
import DataTable from "react-data-table-component";

const VariantTable = ({ data }) => {
  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1, 
      sortable: false,
      width: "100px",
    },
    {
      name: "Variant ID",
      selector: row => row.variantId,
      sortable: true,
    },
    {
      name: "Variant Name",
      selector: row => row.variantName,
      sortable: true,
    },
    {
      name: "Model Name",
      selector: row => row.modelDto.modelName,
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

export default VariantTable;
