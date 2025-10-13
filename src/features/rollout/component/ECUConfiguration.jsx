import React from "react";
import { Card, Col, Row, Input, Select, Typography, Button, Switch } from "antd";
import { Field } from "formik";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const ECUConfiguration = ({ binaries, values, errors, setFieldValue }) => {
  const onChange = (checked, index) => {
    setFieldValue(`ecus[${index}].deltaUpdate`, checked);
  };

  return (
    <Card
      bordered
      style={{ borderRadius: 8, marginTop: 20 }}
      title={
        <div className="flex justify-between items-center">
          <Title level={4} style={{ margin: 0 }}>
            ECU Configuration
          </Title>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() =>
              setFieldValue("ecus", [
                ...values.ecus,
                { ecu: "", binaryName: "", deltaUpdate: false, version: "" },
              ])
            }
          >
            Add ECU
          </Button>
        </div>
      }
      headStyle={{ backgroundColor: "#f5f5f5" }}
    >
      {values.ecus.map((ecuItem, index) => (
        <Row
          gutter={16}
          key={index}
          style={{
            marginBottom: 15,
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: 10,
          }}
        >
          <Col span={6}>
            <label>ECU Name</label>
            <Field as={Input} name={`ecus[${index}].ecu`} placeholder="Enter ECU Name" />
            {errors.ecus?.[index]?.ecu && (
              <div className="text-red-500">{errors.ecus[index].ecu}</div>
            )}
          </Col>

          <Col span={6}>
            <label>Select Binary</label>
            <Select
              placeholder="Select Binary"
              value={ecuItem.binaryName}
              onChange={(val) => setFieldValue(`ecus[${index}].binaryName`, val)}
              style={{ width: "100%" }}
            >
              {binaries?.map((binary) => (
                <Option key={binary.binaryId} value={binary.name}>
                  {binary.name}
                </Option>
              ))}
            </Select>
            {errors.ecus?.[index]?.binaryName && (
              <div className="text-red-500">{errors.ecus[index].binaryName}</div>
            )}
          </Col>

          <Col span={6}>
            <label>Version</label>
            <Field
              as={Input}
              name={`ecus[${index}].version`}
              placeholder="Enter Version"
            />
            {errors.ecus?.[index]?.version && (
              <div className="text-red-500">{errors.ecus[index].version}</div>
            )}
          </Col>

          <Col span={4}>
            <label>Delta Update</label>
            <Switch
              checked={ecuItem.deltaUpdate}
              onChange={(checked) => onChange(checked, index)}
            />
          </Col>

          <Col span={2}>
            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => {
                const updated = values.ecus.filter((_, i) => i !== index);
                setFieldValue("ecus", updated);
              }}
            />
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default React.memo(ECUConfiguration);
