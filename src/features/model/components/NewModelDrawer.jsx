import React, { memo } from "react";
import { Drawer, Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewModelDrawer = ({ isOpen, onClose, name, setName, handleSubmit }) => {
  const formik = useFormik({
    initialValues: { name: name || "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(5, "Name must be at least 2 characters")
        .max(30,"Model name must be at most 30 characters")
        .matches(/^[A-Za-z0-9\- ]+$/, "Only letters, numbers, spaces, and hyphens are allowed"),
    }),
    onSubmit: (values) => {
      setName(values.name);
      handleSubmit(values);
      console.log(values);
    },
  });

  return (
    <Drawer
      title="Create New Model"
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={400}
      footer={
        <div style={{ textAlign: "left" }}>
          <Button
            type="primary"
            onClick={formik.handleSubmit}
             style={{ marginRight: 8 }}
          >
            Create Model
          </Button>
          <Button onClick={onClose} type="text" danger>
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Name"
          validateStatus={formik.touched.name && formik.errors.name ? "error" : ""}
          help={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
        >
          <Input
            id="name"
            placeholder="Enter a model name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              setName(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(NewModelDrawer);
