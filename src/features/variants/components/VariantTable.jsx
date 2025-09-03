import React from "react";
import { Table } from "antd";

const VariantTable = ({ data }) => {
  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "Variant ID",
      dataIndex: "variantId",
      key: "variantId",
      sorter: (a, b) => a.variantId.localeCompare(b.variantId),
    },
    {
      title: "Variant Name",
      dataIndex: "variantName",
      key: "variantName",
      sorter: (a, b) => a.variantName.localeCompare(b.variantName),
    },
    {
      title: "Model Name",
      dataIndex: ["modelDto", "modelName"], // ✅ nested object access
      key: "modelName",
      sorter: (a, b) =>
        (a.modelDto?.modelName || "").localeCompare(b.modelDto?.modelName || ""),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      rowKey="variantId"
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default VariantTable;
