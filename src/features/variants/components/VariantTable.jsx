import React, { useState } from "react";
import { Table,Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const VariantTable = ({ data ,loading}) => {
  const [searchText, setSearchText] = useState("");
  const baseColumns = [
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
      title: "Description",
      dataIndex: "description",
      key: "variantName",
      sorter: (a, b) => a.variantName.localeCompare(b.variantName),
    },
    
  ];
  const hasModelName = Array.isArray(data) && data.some(d => d.modelDto?.modelName);

  
  const columns = hasModelName
    ? [
        ...baseColumns,
        {
          title: "Model Name",
          dataIndex: ["modelDto", "modelName"],
          key: "modelName",
          sorter: (a, b) =>
            (a.modelDto?.modelName || "").localeCompare(b.modelDto?.modelName || ""),
        },
      ]
    : baseColumns;

  return (
    <Table
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      rowKey="variantId"
      pagination={{ pageSize: 10 }}
      bordered
      loading={loading}  
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
           
            <Input
              placeholder="Search Variant"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </div>
        )}
    />
  );
};

export default VariantTable;
