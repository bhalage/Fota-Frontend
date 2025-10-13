import React, { useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Collapse, Row, Col, Typography, Tag, Tooltip, Button } from "antd";
import { useDispatch } from "react-redux";
import { approveVehicle } from "../services/vehicleService";

const { Panel } = Collapse;
const { Text } = Typography;

const VehicleGeneralInfo = React.memo(() => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;
  const dispatch = useDispatch();

  const [status, setStatus] = useState(vehicle?.register || "pending");
  const [loading, setLoading] = useState(false);

  
  if (!vehicle) {
    return <p>No vehicle data found</p>;
  }

  
  const { color, label, tooltipText } = useMemo(() => {
    switch (status) {
      case "verified":
        return {
          color: "orange",
          label: "Verified",
          tooltipText: "Awaiting final approval",
        };
      case "allow":
      case "approve":
        return {
          color: "green",
          label: "On Boarded",
          tooltipText: "Vehicle is onboarded",
        };
      case "cancel":
        return {
          color: "red",
          label: "Off Boarded",
          tooltipText: "Vehicle is off boarded",
        };
      default:
        return {
          color: "red",
          label: "Pending",
          tooltipText: "Waiting for verification",
        };
    }
  }, [status]);

  
  const handleStatusUpdate = useCallback(
    async (newStatus) => {
      setLoading(true);
      try {
        console.log(newStatus);
        
        dispatch(approveVehicle({ vin: vehicle.vin, status: newStatus })).unwrap().then((res) => {
          console.log(res);
          setStatus(newStatus);
        });
      } catch (error) {
        console.error(`Failed to update vehicle status:`, error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, vehicle.vin]
  );

  return (
    <div style={{ paddingTop: "10px" }}>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        bordered
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

            <Col
              span={12}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Text strong>Status:</Text>
              <Tooltip title={tooltipText}>
                <Tag color={color} style={{ fontWeight: "bold", fontSize: 14 }}>
                  {label}
                </Tag>
              </Tooltip>

             
              {status === "verified" && (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleStatusUpdate("approve")}
                    loading={loading}
                    style={{
                      backgroundColor: "#28a745",
                      borderColor: "#28a745",
                      fontWeight: "bold",
                    }}
                  >
                    Allow
                  </Button>

                  <Button
                    danger
                    onClick={() => handleStatusUpdate("cancel")}
                    loading={loading}
                  >
                    Reject
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
});

export default React.memo(VehicleGeneralInfo);
