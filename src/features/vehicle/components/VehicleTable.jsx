import React from "react";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const VehicleTable = ({ data }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Vehicle ID",
      dataIndex: "vehicleId",
      key: "vehicleId",
      sorter: (a, b) => a.vehicleId - b.vehicleId,
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
      sorter: (a, b) => a.vehicleName.localeCompare(b.vehicleName),
    },
    // {
    //   title: "VIN",
    //   dataIndex: "vin",
    //   key: "vin",
    //   sorter: (a, b) => a.vin.localeCompare(b.vin),
    //   render: (vin, record) => (
    //     <a onClick={() => navigate(`/vehicles/${record.vin}`)}>{vin}</a>
    //   ),
    // },
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

    {
      title: "Model Name",
      key: "modelName",
      render: (record) => record.variantDto?.modelDto?.modelName || "-",
      sorter: (a, b) =>
        (a.variantDto?.modelDto?.modelName || "").localeCompare(
          b.variantDto?.modelDto?.modelName || ""
        ),
    },
    {
      title: "Variant Name",
      key: "variantName",
      render: (record) => record.variantDto?.variantName || "-",
      sorter: (a, b) =>
        (a.variantDto?.variantName || "").localeCompare(
          b.variantDto?.variantName || ""
        ),
    },
  //   {
  //     title: "Status",
  //     key: "register",
  //    render: (record) => (
  //   <Tag color={record.register === "allow" ? "green" : "red"}  style={{ minWidth: 75, textAlign: "center" }}>
  //     {record.register === "allow" ? "On Boarded" : "Pending"}
  //   </Tag>
  // ),
  //     sorter: (a, b) =>
  //       (a.variantDto?.variantName || "").localeCompare(
  //         b.variantDto?.variantName || ""
  //       ),
  //   },

  {
  title: "Status",
  key: "register",
  render: (record) => {
    let color = "red";
    let label = "Pending";

    if (record.register === "verified") {
      color = "orange";
      label = "Verified";
    } else if (record.register === "allow") {
      color = "green";
      label = "On Boarded";
    }

    return (
      <Tag
        color={color}
        style={{ minWidth: 90, textAlign: "center" }}
      >
        {label}
      </Tag>
    );
  },
  sorter: (a, b) =>
    (a.variantDto?.variantName || "").localeCompare(
      b.variantDto?.variantName || ""
    ),
},

    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => (a.year || 0) - (b.year || 0),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="vehicleId"
        pagination={{ pageSize: 10 }}
        bordered
        locale={{ emptyText: "No vehicles found" }}
      />
    </div>
  );
};

export default VehicleTable;
