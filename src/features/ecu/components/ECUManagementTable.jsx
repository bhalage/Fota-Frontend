import React, { useMemo, useState, useCallback } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ECUManagementTable = ({ data = [], loading }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  
  const filteredData = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return data;
    return data.filter((item) =>
      item.ecuName?.toLowerCase().includes(query)
    );
  }, [data, searchText]);

  
  const columns = useMemo(
    () => [
      { title: "ECU ID", dataIndex: "ecuId", key: "ecuId" },
      { title: "Component ID", dataIndex: "componentId", key: "componentId" },
      { title: "ECU Name", dataIndex: "ecuName", key: "ecuName" },
      { title: "Abbreviation", dataIndex: "abbreviation", key: "abbreviation" },
    ],
    []
  );

  return (
    <Table
      bordered
      columns={columns}
      dataSource={filteredData}
      rowKey="componentId"
      loading={loading}
      pagination={{ pageSize: 10 }}
      title={() => (
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search ECUs"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearchChange}
            allowClear
            style={{ width: 300 }}
          />
        </div>
      )}
    />
  );
};

export default React.memo(ECUManagementTable);
