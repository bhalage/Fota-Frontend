import Breadcrumbs from "@/components/BreadCrumbs";
import { getAllModels } from "@/features/model/services/modelService";
import { selectModels } from "@/features/model/redux/modelSelector";
import { Button, Card, Col, Input, Row, Select, Typography } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "@/features/vehicle/services/vehicleService";
import { selectVehicles } from "@/features/vehicle";
import { fetchBinaries } from "@/features/binary/redux/binarySlice";
import { createRollout, getRollouts } from "../services/rollOutService";
import { useNavigate } from "react-router-dom";
import { resetNewRollout } from "../redux/rolloutSlice";

const { Title } = Typography;
const { Option } = Select;

const NewRollout = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels);
  const vehiclesData = useSelector(selectVehicles);
  const { binaries } = useSelector((state) => state.binary);
  const newRollout=useSelector((state)=>state.rollout.newRollout);
 const loading=useSelector((state)=>state.rollout.loading);
 const navigate=useNavigate();
 useEffect(() => {
  if (newRollout?.status) {
    
    dispatch(getRollouts()); 
    navigate("/rollout"); 
  dispatch(resetNewRollout());  
  }
}, [newRollout, dispatch, navigate]);
  useEffect(() => {
    dispatch(getAllModels());
    dispatch(getAllVehicles());
    dispatch(fetchBinaries());
  }, [dispatch]);

  
  const validationSchema = Yup.object({
    rolloutName: Yup.string().required("Rollout Name is required"),
    version: Yup.string().required("Version is required"),
    binaryName: Yup.string().required("Please select a Binary"),
    modelId: Yup.number().required("Please select a Model"),
    vin: Yup.string().required("Please select a Vehicle"),
  });

  const initialValues = {
    rolloutName: "",
    version: "",
    binaryName: "",
    modelId: "",
    vin: "",
  };
  

  const handleSubmit = (values) => {
    const payload = {
      rolloutName: values.rolloutName,
      type: "ECU", 
      version: values.version,
      binaryName: values.binaryName,
      modelId: values.modelId,
      vin: values.vin,
    };

    console.log("🚀 Final Payload:", payload);

    dispatch(createRollout(payload));
    
  };
  

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-10 shadow mb-4">
        <Breadcrumbs />
        <div className="px-4 py-4">
          <h1 className="text-2xl font-semibold">Create New Rollout</h1>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Card
              bordered={true}
              style={{ borderRadius: "8px" }}
              title={<Title level={4}>Rollout Details</Title>}
              headStyle={{ backgroundColor: "#f5f5f5" }}
            >
              <Row gutter={16}>
                <Col span={24}>
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
              </Row>

              <Row gutter={16} style={{ marginTop: "15px" }}>
                <Col span={24}>
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

              <Row gutter={16} style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <label>Rollout Name</label>
                  <Field
                    as={Input}
                    name="rolloutName"
                    placeholder="Enter Rollout Name"
                  />
                  {errors.rolloutName && touched.rolloutName && (
                    <div className="text-red-500">{errors.rolloutName}</div>
                  )}
                </Col>
              </Row>
            </Card>

            <Card
              bordered={true}
              style={{ borderRadius: "8px", marginTop: "20px" }}
              title={<Title level={4}>Package Details</Title>}
              headStyle={{ backgroundColor: "#f5f5f5" }}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <label>Select Binary</label>
                  <Select
                    placeholder="Select Binary"
                    value={values.binaryName}
                    onChange={(val) => setFieldValue("binaryName", val)}
                    style={{ width: "100%" }}
                  >
                    {binaries?.map((binary) => (
                      <Option key={binary.binaryId} value={binary.name}>
                        {binary.name}
                      </Option>
                    ))}
                  </Select>
                  {errors.binaryName && touched.binaryName && (
                    <div className="text-red-500">{errors.binaryName}</div>
                  )}
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <label>Enter Version</label>
                  <Field as={Input} name="version" placeholder="Enter Version" />
                  {errors.version && touched.version && (
                    <div className="text-red-500">{errors.version}</div>
                  )}
                </Col>
              </Row>
            </Card>

            <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }} loading={loading}>
              Create Rollout
            </Button>
            <Button style={{ marginTop: "20px", marginLeft: "10px" }}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(NewRollout);
