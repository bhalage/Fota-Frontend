import React, { useState, useMemo, useEffect, memo } from "react";
import { Drawer, Input, Button, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllEcus } from "@/features/ecu/services/ecuService";
import EcuList from "./EcuList";

const SelectEcuDrawer = ({ isOpen, onClose, handleSubmit }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedEcus, setSelectedEcus] = useState([]);
  const ecus = useSelector((state) => state.ecu.ecus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEcus());
  }, [dispatch]);

  const filteredEcus = useMemo(() => {
    return ecus?.filter(
      (ecu) =>
        ecu?.ecuName?.toLowerCase().includes(searchText.toLowerCase()) ||
        ecu?.componentId?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [ecus, searchText]);

  const handleToggle = (ecuId) => {
    setSelectedEcus((prev) =>
      prev.includes(ecuId) ? prev.filter((id) => id !== ecuId) : [...prev, ecuId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEcus(filteredEcus?.map((ecu) => ecu.ecuId));
  };

  const handleDeselectAll = () => {
    setSelectedEcus([]);
  };

  const handleSave = () => {
    const selected = ecus.filter((ecu) => selectedEcus.includes(ecu.ecuId));
    handleSubmit(selected);
    onClose();
  };

  return (
    <Drawer
      title="Select ECUs"
      placement="right"
      width={400}
      open={isOpen}
      onClose={onClose}
      footer={
        <div style={{ textAlign: "left" }}>
          <Button type="primary" style={{ marginRight: 8 }} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      }
    >
      <Input
        placeholder="Search ECU Model"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
        <span>Selected: {selectedEcus.length} ECUs</span>
        <span>
          <a onClick={handleSelectAll}>Select All</a> |{" "}
          <a onClick={handleDeselectAll}>Deselect All</a>
        </span>
      </div>

      <Divider style={{ margin: "8px 0" }} />

      <EcuList
        ecus={filteredEcus}
        selectedEcus={selectedEcus}
        onToggle={handleToggle}
      />
    </Drawer>
  );
};

export default memo(SelectEcuDrawer);
