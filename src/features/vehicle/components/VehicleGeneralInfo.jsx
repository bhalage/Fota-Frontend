import { useLocation } from "react-router-dom";
import { Collapse, Row, Col, Typography, Tag, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { approveVehicle } from "../services/vehicleService";

const { Panel } = Collapse;
const { Text } = Typography;

const VehicleGeneralInfo = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;
  const dispatch = useDispatch();

  const [status, setStatus] = useState(vehicle.register);

  const handleStatusChange = () => {
    if (status !== "allow") {
      dispatch(approveVehicle(vehicle.vin)).then((res) => {
        if (res.type.endsWith("fulfilled")) {
          setStatus("allow");
        }
      });
    }
  };

  if (!vehicle) {
    return <p>No vehicle data found</p>;
  }

  // 🔹 Decide tag color & label based on status
  let color = "red";
  let label = "Pending";
  let tooltipText = "Click to onboard vehicle";

  if (status === "verified") {
    color = "orange";
    label = "Verified";
    tooltipText = "Awaiting final approval";
  } else if (status === "allow") {
    color = "green";
    label = "On Boarded";
    tooltipText = "Vehicle is onboarded";
  }

  return (
    <div style={{ paddingTop: "10px" }}>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        bordered={true}
        style={{ background: "#fafafa", borderRadius: "8px" }}
      >
        <Panel header="General Information" key="1">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Vehicle Name:</Text> {vehicle.vehicleName}
            </Col>
            <Col span={12}>
              <Text
                copyable={{
                  text: vehicle.vin,
                  tooltips: ["Click to copy", "Copied! ✅"],
                }}
                strong
              >
                VIN: {vehicle.vin}
              </Text>
            </Col>

            <Col span={12}>
              <Text strong>Year:</Text> {vehicle.year}
            </Col>
            <Col span={12}>
              <Text strong>Model:</Text>{" "}
              {vehicle.variantDto?.modelDto?.modelName || "-"}
            </Col>
            <Col span={12}>
              <Text strong>Variant:</Text>{" "}
              {vehicle.variantDto?.variantName || "-"}
            </Col>

            <Col span={12}>
              <Text strong>Registration Status:</Text>{" "}
              <Tooltip title={tooltipText}>
                <Tag
                  color={color}
                  style={{
                    minWidth: 100,
                    textAlign: "center",
                    cursor: status !== "allow" ? "pointer" : "default",
                  }}
                  onClick={handleStatusChange}
                >
                  {label}
                </Tag>
              </Tooltip>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};

export default VehicleGeneralInfo;
