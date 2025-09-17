import { SearchOutlined } from "@ant-design/icons"; 
import React, { useMemo, useState } from "react";
import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const RolloutTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState("");
  
  const columns = [
   
    {
      title: "Rollout Name",
      dataIndex: "rolloutName",
      key: "rolloutName",
      fixed: "left",   // ✅ fixed second col
      width: 175,
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 100,
    },
    {
      title: "Binary Name",
      dataIndex: "binaryName",
      key: "binaryName",
      width: 200,
    },
    {
      title: "Model Name",
      dataIndex: "modelId",
      key: "modelId",
      width: 100,
    },
    {
      title: "VIN",
      dataIndex: "vin",
      key: "vin",
      width: 250,
    },
    {
      title: "Rollout Owner",
      dataIndex: "rolloutOwner",
      key: "rolloutOwner",
      width: 200,
    },
    {
      title: "Start Time",
      dataIndex: "createdAt",
      key: "createdAt",
      fixed: "right",  // ✅ last column fixed
      width: 200,
    },
  ];
const filteredData = useMemo(() => {
  // ✅ If search box is empty, show all rollouts
  if (!searchText || searchText.trim() === "") {
    return data;
  }

  const lower = searchText.toLowerCase();
  return data.filter(
    (item) =>
      (item.rolloutName && item.rolloutName.toLowerCase().includes(lower)) ||
      (item.vin && item.vin.toLowerCase().includes(lower))
  );
}, [data, searchText]);


  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        loading={loading}
        scroll={{ x: 1500 }} // ✅ enables horizontal scroll
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Search Input */}
            <Input
              placeholder="Search Rollout By Name"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RolloutTable;
