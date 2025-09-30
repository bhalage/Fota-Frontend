import React from "react";
import { Checkbox } from "antd";

const EcuList = ({ ecus, selectedEcus, onToggle }) => {
  return (
    <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 8 }}>
      {ecus?.map((ecu) => (
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
            onChange={() => onToggle(ecu.ecuId)}
          >
            <b>{ecu.ecuName}</b> ({ecu.componentId})
          </Checkbox>
          <span style={{ color: "gray", fontSize: 12 }}>
            Updateable: {ecu.updateable ? "True" : "False"}
          </span>
        </div>
      ))}
      {ecus?.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No ECUs found</p>
      )}
    </div>
  );
};

export default EcuList;
