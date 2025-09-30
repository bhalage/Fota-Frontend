import React, { useState } from "react";
import { Input, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined} from "@ant-design/icons";
import { useSelector } from "react-redux";
const VehicleTable = ({ data }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
const loading=useSelector((state)=>state.vehicles.loading);

const columns = [
  {
    title: "Vehicle Name",
    dataIndex: "vehicleName",
    key: "vehicleName",
    sorter: (a, b) => a.vehicleName.localeCompare(b.vehicleName),
  },
  {
    title: "VIN",
    dataIndex: "vin",
    key: "vin",
    sorter: (a, b) => a.vin.localeCompare(b.vin),
    render: (vin, record) => (
      <a
        onClick={() =>
          navigate(`/vehicles/${record.vin}`, { state: { vehicle: record } })
        }
        style={{ color: "#1890ff" }}
      >
        {vin}
      </a>
    ),
  },
  // Only add these columns if at least one record has data
  ...(data.some(item => item.variantDto?.modelDto?.modelName)
    ? [{
        title: "Model Name",
        key: "modelName",
        render: record => record.variantDto?.modelDto?.modelName,
        sorter: (a, b) =>
          (a.variantDto?.modelDto?.modelName || "").localeCompare(
            b.variantDto?.modelDto?.modelName || ""
          ),
      }]
    : []),
  ...(data.some(item => item.variantDto?.variantName)
    ? [{
        title: "Variant Name",
        key: "variantName",
        render: record => record.variantDto?.variantName,
        sorter: (a, b) =>
          (a.variantDto?.variantName || "").localeCompare(
            b.variantDto?.variantName || ""
          ),
      }]
    : []),
  {
    title: "Status",
    key: "register",
    render: record => {
      let color = "red";
      let label = "Pending";

      if (record.register === "verified" || record.status==="verified") {
        color = "orange";
        label = "Verified";
      } else if (record.register=== "allow" || record.status==="allow") {
        color = "green";
        label = "On Boarded";
      } else if (record.register === "cancel" || record.status==="cancel") {
        color = "red";
        label = "Off Boarded";
      }

      return <Tag color={color} style={{ minWidth: 90, textAlign: "center" }}>{label}</Tag>;
    },
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    sorter: (a, b) => (a.year || 0) - (b.year || 0),
  },
];
const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.auditInfoDto?.createdAt);
    const dateB = new Date(b.auditInfoDto?.createdAt);
    return dateB - dateA; 
  });

  return (
    <div>
      <Table
        columns={columns}
        dataSource={sortedData}
        rowKey="vehicleId"
        loading={loading}
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
            placeholder="Search Vehicles"
            prefix={<SearchOutlined/>}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />

          
        </div>
      )}
        pagination={{ pageSize: 10 }}
        bordered
        locale={{ emptyText: "No vehicles found" }}
      />
    </div>
  );
};

export default VehicleTable;
