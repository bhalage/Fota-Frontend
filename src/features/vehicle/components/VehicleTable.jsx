import React, { useState } from "react";
import { Table, Input } from "antd";

const { Search } = Input;

const VehicleTable = ({ data }) => {


  const columns = [
    {
      title: "Vehicle ID",
      dataIndex: "vehicleId",
      key: "vehicleId",
      sorter: (a, b) => a.vehicleId.localeCompare(b.vehicleId),
    },
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
