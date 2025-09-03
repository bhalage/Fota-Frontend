

import React, { useState } from "react";
import { Input, Table } from "antd";

const ModelTable = ({ data }) => {
   const [searchText, setSearchText] = useState("");

  // Filtered data based on search
  // const filteredData = data.filter(
  //   (item) =>
  //     // item.modelId.includes(searchText.toLowerCase()) ||
  //     // item.modelName.toLowerCase().includes(searchText.toLowerCase())
  // );
  const columns = [
    // {
    //   title: "Sr. No.",
    //   key: "index",
    //   render: (text, record, index) => index + 1,
    //   width: 100,
    // },
    {
      title: "Model ID",
      dataIndex: "modelId",
      key: "modelId",
      sorter: (a, b) => a.modelId.localeCompare(b.modelId),
    },
    {
      title: "Model Name",
      dataIndex: "modelName",
      key: "modelName",
      sorter: (a, b) => a.modelName.localeCompare(b.modelName),
    },
  ];

  return (<div>
     <Input
        placeholder="Search by Model ID or Model Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
  
    <Table
      columns={columns}
      dataSource={data}
      rowKey="modelId"
      pagination={{ pageSize: 10 }}
      bordered
    />
    </div>
  );
};

export default ModelTable;
