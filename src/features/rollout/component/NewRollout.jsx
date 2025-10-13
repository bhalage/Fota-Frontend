import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Button, Space, Card, Col, Row, Input, Select, Typography, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { getAllModels, getAllVehicleByModelId } from "@/features/model/services/modelService";
import { selectModels, selectVehiclesByModelId } from "@/features/model/redux/modelSelector";
import { fetchBinaries } from "@/features/binary/redux/binarySlice";
import { createRollout, getRollouts } from "../services/rollOutService";
import { getAllUsers } from "@/features/auth";
import { getEcusByModelId } from "@/features/ecu/services/ecuService";

const { Title } = Typography;
const { Option } = Select;

const NewRollout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels) || [];
  const vehiclesData = useSelector(selectVehiclesByModelId) || [];
  const { binaries = [] } = useSelector((state) => state.binary || {});
  const { users = [] } = useSelector((state) => state.auth || {});
  const ecus = useSelector((state) => state.ecu.ecusByModelId);
  useEffect(() => {
    dispatch(getAllModels());
   
    dispatch(fetchBinaries());
    dispatch(getAllUsers());
  }, [dispatch]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        rolloutName: Yup.string().required("Rollout Name is required"),
        modelId: Yup.number().required("Please select a Model"),
        vin: Yup.string().required("Please select a Vehicle"),
        ecus: Yup.array().of(
          Yup.object().shape({
            ecu: Yup.string().required("ECU name is required"),
            binaryName: Yup.string().required("Binary is required"),
            deltaUpdate: Yup.boolean(),
            version: Yup.string().required("Version is required"),
          })
        ),
        approver: Yup.string().required("Please select an Approver"),
      }),
    []
  );

  const initialValues = useMemo(
    () => ({
      rolloutName: "",
      modelId: "",
      vin: "",
      ecus: [{ ecu: "", binaryName: "", deltaUpdate: false, version: "" }],
      approver: "",
    }),
    []
  );

  const handleSubmit = useCallback(
    async (values,{resetForm}) => {
      const payload = {
        rolloutName: values.rolloutName,
        vin: values.vin,
        modelId: values.modelId,
        binaryData: values.ecus.map((ecu) => ({
          type: ecu.ecu,
          version: ecu.version,
          binaryName: ecu.binaryName,
          delta: ecu.deltaUpdate,
        })),
        approver: values.approver,
        approveStatus: "NOT_APPROVED",
      };
      
      try {
      await dispatch(createRollout(payload)).unwrap();
      dispatch(getRollouts());
      resetForm();     
       
      onClose();         
    } catch (error) {
      console.error("Rollout creation failed:", error);
    }
    },
    [dispatch, onClose]
  );
  const getVehiclesByModel = useCallback((modelId) => {
    if (modelId) {
      dispatch(getAllVehicleByModelId(modelId));
      dispatch(getEcusByModelId(modelId));
    }
  }, [dispatch])
  return (
    <Drawer title="Create New Rollout" placement="right" onClose={onClose} open={isOpen} width={750}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Card bordered style={{ borderRadius: 8 }} title={<Title level={4}>Rollout Details</Title>} headStyle={{ backgroundColor: "#f5f5f5" }}>
              <Row gutter={16}>
                <Col span={24}>
                  <label>Rollout Name</label>
                  <Field as={Input} name="rolloutName" placeholder="Enter Rollout Name" />
                  {errors.rolloutName && touched.rolloutName && <div className="text-red-500">{errors.rolloutName}</div>}
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 15 }}>
                <Col span={12}>
                  <label>Select Model</label>
                  <Select placeholder="Select Model" value={values.modelId}
                    onChange={(val) => { getVehiclesByModel(val), setFieldValue("modelId", val) }}

                    style={{ width: "100%" }}>
                    <Option value="">Select Model</Option>
                    {models.map((model) => (
                      <Option key={model.modelId} value={model.modelId}>
                        {model.modelName}
                      </Option>
                    ))}
                  </Select>
                  {errors.modelId && touched.modelId && <div className="text-red-500">{errors.modelId}</div>}
                </Col>
                <Col span={12}>
                  <label>Select Vehicle</label>
                  <Select placeholder="Select Vehicle" value={values.vin} onChange={(val) => setFieldValue("vin", val)} style={{ width: "100%" }}>
                    <Option value="">Select Vehicle</Option>
                    {vehiclesData.map((vehicle) => (
                      <Option key={vehicle.vin} value={vehicle.vin}>
                        {vehicle.vin}
                      </Option>
                    ))}
                  </Select>
                  {errors.vin && touched.vin && <div className="text-red-500">{errors.vin}</div>}
                </Col>
              </Row>
            </Card>

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
                    onClick={() => setFieldValue("ecus", [...values.ecus, { ecu: "", binaryName: "", deltaUpdate: false, version: "" }])}
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
                  style={{ marginBottom: 15, alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: 10 }}
                >

                  <Col span={6}>
                    <label>Select ECU</label>
                    <Select
                      placeholder="Select ECU"
                      value={ecuItem.ecu}
                      onChange={(val) => setFieldValue(`ecus[${index}].ecu`, val)}
                      style={{ width: "100%" }}
                    >
                      <Option value="">Select ECU</Option>
                      {ecus && ecus.length > 0 ? (
                        ecus.map((ecu) => (
                          <Option key={ecu.ecuId} value={ecu.ecuName}>
                            {ecu.ecuName}
                          </Option>
                        ))
                      ) : (
                        <Option disabled>No ECUs Found</Option>
                      )}
                    </Select>

                    {errors.ecus?.[index]?.ecu && (
                      <div className="text-red-500">{errors.ecus[index].ecu}</div>
                    )}
                  </Col>

                  <Col span={6}>
                    <label>Select Binary</label>
                    <Select placeholder="Select Binary" value={ecuItem.binaryName} onChange={(val) => setFieldValue(`ecus[${index}].binaryName`, val)} style={{ width: "100%" }}>
                      <Option value="">Select Binary</Option>
                      {binaries.map((binary) => (
                        <Option key={binary.binaryId} value={binary.name}>
                          {binary.name}
                        </Option>
                      ))}
                    </Select>
                    {errors.ecus?.[index]?.binaryName && <div className="text-red-500">{errors.ecus[index].binaryName}</div>}
                  </Col>
                  <Col span={6}>
                    <label>Enter Version</label>
                    <Field as={Input} name={`ecus[${index}].version`} placeholder="Enter Version" />
                    {errors.ecus?.[index]?.version && <div className="text-red-500">{errors.ecus[index].version}</div>}
                  </Col>
                  <Col span={4}>
                    <label>Delta Update</label>
                    <Switch checked={ecuItem.deltaUpdate} onChange={(checked) => setFieldValue(`ecus[${index}].deltaUpdate`, checked)} />
                  </Col>
                  <Col span={2}>
                    <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => setFieldValue("ecus", values.ecus.filter((_, i) => i !== index))} />
                  </Col>
                </Row>
              ))}
            </Card>

            <Card bordered style={{ borderRadius: 8, marginTop: 20 }} headStyle={{ backgroundColor: "#f5f5f5" }} title={<Title level={4}>Approver</Title>}>
              <Col span={24}>
                <label>Select Approver</label>
                <Select value={values.approver || ""} onChange={(val) => setFieldValue("approver", val)} style={{ width: "100%" }}>
                  <Option value="" disabled style={{ color: "gray" }}>
                    Select Approver
                  </Option>
                  {users.map((user) => (
                    <Option key={user.userId} value={user.userId}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Card>

            <Space style={{ marginTop: 20 }}>
              <Button htmlType="submit" type="primary">
                Create Rollout
              </Button>
              <Button onClick={onClose} type="default">
                Cancel
              </Button>
            </Space>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default React.memo(NewRollout);
