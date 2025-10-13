import { Button, Drawer, Form, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const NewEcuDrawer = ({ isOpen, onClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ecuName: "",
      componentId: "",
      abbreviation: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      ecuName: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      componentId: Yup.string()
        .required("Component ID is required")
        .min(3, "Component ID must be at least 3 characters"),
      abbreviation: Yup.string()
        .required("Abbreviation is required")
        .min(2, "Abbreviation must be at least 2 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);   
      resetForm();
      onClose();              
    },
  });

  return (
    <Drawer
      title="Create New ECU"
      placement="right"
      width={400}
      open={isOpen}
      onClose={onClose}
      footer={
        <div style={{ textAlign: "left" }}>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={formik.handleSubmit}
          >
            Create ECU
          </Button>
          <Button onClick={onClose} type="text" danger>
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Enter ECU Name"
          validateStatus={
            formik.touched.ecuName && formik.errors.ecuName ? "error" : ""
          }
          help={
            formik.touched.ecuName && formik.errors.ecuName
              ? formik.errors.ecuName
              : ""
          }
        >
          <Input
            name="ecuName"
            placeholder="Enter ECU Name"
            value={formik.values.ecuName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Enter Component ID"
          validateStatus={
            formik.touched.componentId && formik.errors.componentId
              ? "error"
              : ""
          }
          help={
            formik.touched.componentId && formik.errors.componentId
              ? formik.errors.componentId
              : ""
          }
        >
          <Input
            name="componentId"
            placeholder="Enter Component ID"
            value={formik.values.componentId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Enter Abbreviation"
          validateStatus={
            formik.touched.abbreviation && formik.errors.abbreviation
              ? "error"
              : ""
          }
          help={
            formik.touched.abbreviation && formik.errors.abbreviation
              ? formik.errors.abbreviation
              : ""
          }
        >
          <Input
            name="abbreviation"
            placeholder="Enter Abbreviation"
            value={formik.values.abbreviation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewEcuDrawer;
