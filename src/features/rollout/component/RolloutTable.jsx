import { SearchOutlined } from "@ant-design/icons"; 
import React, { useMemo, useState } from "react";
import { Input, Table, Tag } from "antd";
import VehicleLogs from "@/features/vehicle/components/VehicleLogs";


const RolloutTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
   
    {
      title: "Rollout Name",
      dataIndex: "rolloutName",
      key: "rolloutName",
      fixed: "left",   
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
      fixed: "right",  
      width: 200,
    },
    {
    title: "Status",
    dataIndex: "zipFileStatus",
    key: "zipFileStatus",
    fixed: "right",
    width: 200,
    render: (status) => {
      let color = "";

      switch (status?.toLowerCase()) {
        case "in_progress":
          color = "blue";
          break;
        case "created":
          color = "gold";
          break;
        case "uploaded":
          color = "green";
          break;
        case "failed":
          color = "red";
          break;
        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
  ];
const filteredData = useMemo(() => {
  
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

const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        loading={loading}
        scroll={{ x: 1500 }} 
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            
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

export default React.memo(RolloutTable);
