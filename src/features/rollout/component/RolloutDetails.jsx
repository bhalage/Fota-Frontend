
import React from "react";
import { Card, Col, Row, Input, Select, Typography } from "antd";
import { Field } from "formik";

const { Title } = Typography;
const { Option } = Select;

const RolloutDetails = ({ models, vehiclesData, errors, touched, setFieldValue, values }) => {
  return (
    <Card
      bordered
      style={{ borderRadius: 8 }}
      title={<Title level={4}>Rollout Details</Title>}
      headStyle={{ backgroundColor: "#f5f5f5" }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <label>Rollout Name</label>
          <Field as={Input} name="rolloutName" placeholder="Enter Rollout Name" />
          {errors.rolloutName && touched.rolloutName && (
            <div className="text-red-500">{errors.rolloutName}</div>
          )}
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 15 }}>
        <Col span={12}>
          <label>Select Model</label>
          <Select
            placeholder="Select Model"
            value={values.modelId}
            onChange={(val) => setFieldValue("modelId", val)}
            style={{ width: "100%" }}
          >
            {models?.map((model) => (
              <Option key={model.modelId} value={model.modelId}>
                {model.modelName}
              </Option>
            ))}
          </Select>
          {errors.modelId && touched.modelId && (
            <div className="text-red-500">{errors.modelId}</div>
          )}
        </Col>

        <Col span={12}>
          <label>Select Vehicle</label>
          <Select
            placeholder="Select Vehicle"
            value={values.vin}
            onChange={(val) => setFieldValue("vin", val)}
            style={{ width: "100%" }}
          >
            {vehiclesData?.map((vehicle) => (
              <Option key={vehicle.vin} value={vehicle.vin}>
                {vehicle.vin}
              </Option>
            ))}
          </Select>
          {errors.vin && touched.vin && (
            <div className="text-red-500">{errors.vin}</div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default React.memo(RolloutDetails);
