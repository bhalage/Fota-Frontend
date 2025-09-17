import { SearchOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ModelTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const columns = [
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
      render: (modelName, record) => (
    <a
      onClick={() =>
        navigate(`/models/${record.modelName}`, { state: { model: record } })
      }
      style={{ color: "#1890ff" }}
    >
      {modelName}
    </a>
      )


    },
  ];
const filteredData=useMemo(()=>{
  if(!searchText || searchText.trim()===""){
    return data;
  }
  const lower=searchText.toLowerCase();

  return data.filter((item)=>(item.modelName.toLowerCase().includes(lower)));
},[data,searchText]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="modelId"
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
            {/* Search Input */}
            <Input
              placeholder="Search Model"
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

export default ModelTable;
