import React, { useState } from "react";
import { Input, Table, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, SearchOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicle } from "../services/vehicleService";
const VehicleTable = ({ data }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
const loading=useSelector((state)=>state.vehicles.loading);
const dispatch=useDispatch();
const handleDelete = (vehicleId) => {
    console.log("Delete vehicle with ID:", vehicleId);
   
    if(vehicleId){
       const payload={
      vehicleId:vehicleId
    }
      dispatch(deleteVehicle(vehicleId))
    }
  };

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
    width:350,
    sorter: (a, b) => a.vin.localeCompare(b.vin),
    render: (vin, record) => (
      <a
        onClick={() =>
          navigate(`/vehicles/${record.vin}`, { state: { vehicle: record } })
        }
        // style={{ color: "#1890ff" ,width:"20px"}}
      >
        {vin}
      </a>
    ),
  },
   
  ...(data.some(item => item.variantDto?.modelDto?.modelName)
    ? [{
        title: "Model Name",
        key: "modelName",
        width:150,
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
    title: "Year",
    dataIndex: "year",
    key: "year",
    sorter: (a, b) => (a.year || 0) - (b.year || 0),
  },
    {
    title: "Status",
    key: "register",
    width:100,
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
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <Tooltip title="Delete Vehicle">
          <DeleteFilled       
            onClick={() => handleDelete(record.vehicleId)}
            style={{ color: "#ff6347", fontSize: "18px", cursor: "pointer" }}
          />
        </Tooltip>
      ),
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

export default React.memo(VehicleTable);
