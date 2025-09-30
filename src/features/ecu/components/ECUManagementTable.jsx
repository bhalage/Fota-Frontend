import React, { useMemo, useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";

const ECUManagementTable = ({data,loading}) => {
  const [searchText, setSearchText] = useState("");


  

  const columns = [
    { title: "ECU ID", dataIndex: "ecuId", key: "ecuId" },
    { title: "Component ID", dataIndex: "componentId", key: "componentId" },
    { title: "ECU Name", dataIndex: "ecuName", key: "ecuName" },
    { title: "Abbreviation", dataIndex: "abbreviation", key: "abbreviation" },
  ];

  const variantColumns = [
    { title: "Usage ID", dataIndex: "usageId", key: "usageId" },
    { title: "Assembly ID", dataIndex: "assemblyId", key: "assemblyId" },
    { title: "PCB ID", dataIndex: "pcbId", key: "pcbId" },
    { title: "ECU Variant Name", dataIndex: "ecuVariantName", key: "ecuVariantName" },
  ];

  const filteredData=useMemo(()=>{
    if (!searchText||searchText.trim()===""){
      return data;
    }
    return data.filter(item=>
    item.ecuName.toLowerCase().includes(searchText.toLowerCase())
  )
  }, [data, searchText]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={filteredData}
      rowKey="componentId"
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
            placeholder="Search ECUs"
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

export default React.memo(ECUManagementTable);
