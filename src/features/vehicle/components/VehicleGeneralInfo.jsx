import { useLocation } from "react-router-dom";
import { Collapse, Row, Col, Typography, Tag, Tooltip, Button, Select } from "antd";
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

  if (!vehicle) {
    return <p>No vehicle data found</p>;
  }

  
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
  } else if (status === "cancel") {
    color = "red";
    label = "Off Boarded";
  }

  
  const allOptions = ["allow", "pending", "cancel"];

  const handleSelectChange = (value) => {
    
    console.log("New status selected:", value);

    // dispatch(approveVehicle(vehicle.vin, value))
    //  dispatch(approveVehicle(vehicle.vin,"approve"));

    if (status === "pending") {
      
      return;
    }
    
    if (status === "verified" && (value === "allow" || value === "cancel")) {
      setStatus(value);
      console.log(value)

      dispatch(approveVehicle({ vin: vehicle.vin, status: "approve" }));

    }


  };

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
              {/* <Tooltip title={tooltipText}> */}

              <Select
                value={status}
                onChange={handleSelectChange}
                style={{ width: "25%", textAlign: "center" }}
                disabled={status === "pending"} // disable when pending
              >
                {allOptions.map((opt) => (
                  <Select.Option key={opt} value={opt} >
                    {opt === "allow"
                      ? "On Boarded"
                      : opt === "cancel"
                        ? "Off Boarded"
                        : opt === "pending"
                          ? "Pending"
                          : opt}
                  </Select.Option>
                ))}
              </Select>

              {/* </Tooltip> */}
            </Col>


          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};

export default VehicleGeneralInfo;
