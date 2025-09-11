import React, { useState, useMemo, useEffect } from "react";
import { Drawer, Input, Checkbox, Button, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllEcus } from "@/features/ecu/services/ecuService";

const SelectEcuDrawer = ({ isOpen, onClose, handleSubmit }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedEcus, setSelectedEcus] = useState([]);
    const ecus = useSelector((state) => state.ecu.ecus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEcus());
    } , [dispatch]);
    useEffect(() => {
        console.log("All ECUs from Redux:", ecus);
    }, [ecus]);
    const filteredEcus = useMemo(() => {
        return ecus?.filter(
            (ecu) =>
                ecu?.ecuName?.toLowerCase().includes(searchText.toLowerCase()) ||
                ecu?.componentId?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [ecus, searchText]);

    // Handle checkbox toggle
    const handleToggle = (ecuId) => {
        setSelectedEcus((prev) =>
            prev.includes(ecuId) ? prev.filter((id) => id !== ecuId) : [...prev, ecuId]
        );
    };

    // Handle select all / deselect all
    const handleSelectAll = () => {
        setSelectedEcus(filteredEcus?.map((ecu) => ecu.ecuId));
    };
    const handleDeselectAll = () => {
        setSelectedEcus([]);
    };

    const handleSave = () => {
        const selected = ecus.filter((ecu) => selectedEcus.includes(ecu.ecuId));
        console.log("Selected ECUs to submit:", selected);
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
                    <Button onClick={onClose} >
                        Cancel
                    </Button>
                </div>
            }
        >
            {/* Search bar */}
            <Input
                placeholder="Search ECU Model"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />

            {/* Selected info */}
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                <span>
                    Selected: {selectedEcus.length} ECUs
                </span>
                <span>
                    <a onClick={handleSelectAll}>Select All</a> |{" "}
                    <a onClick={handleDeselectAll}>Deselect All</a>
                </span>
            </div>

            <Divider style={{ margin: "8px 0" }} />

            {/* ECU List with checkboxes */}
            <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 8 }}>
                {filteredEcus?.map((ecu) => (
                    <div
                        key={ecu.ecuId}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        <Checkbox
                            checked={selectedEcus.includes(ecu.ecuId)}
                            onChange={() => handleToggle(ecu.ecuId)}
                        >
                            <b>{ecu.ecuName}</b> ({ecu.componentId})
                        </Checkbox>
                        <span style={{ color: "gray", fontSize: 12 }}>
                            Updateable: {ecu.updateable ? "True" : "False"}
                        </span>
                    </div>
                ))}
                {filteredEcus?.length === 0 && (
                    <p style={{ textAlign: "center", color: "gray" }}>No ECUs found</p>
                )}
            </div>
        </Drawer>
    );
};

export default SelectEcuDrawer;
