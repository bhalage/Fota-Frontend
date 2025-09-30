import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchBinaries, uploadBinary } from "../redux/binarySlice";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const NewBinaryDrawer = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.binary);

  
  const handleSubmit = async (values) => {
  const fileObj = values.file?.[0]?.originFileObj;

  if (!fileObj) {
    message.error("Please select a file before submitting.");
    return;
  }

  try {
    await dispatch(
      uploadBinary({ file: fileObj, fileName: values.name || "CCU" })
    ).unwrap().then(()=>dispatch(fetchBinaries()));

    message.success("File uploaded successfully!");
    form.resetFields();
    onClose();
  } catch (err) {
    console.error("Upload failed:", err);
    message.error("Upload failed!");
  }
};

  return (
    <Drawer
      title="Upload New Binary"
      placement="right"
      width={400}
      onClose={onClose}
      open={isOpen}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: "" }}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter a display name" />
        </Form.Item>

        <Form.Item
          name="file"
          label="Upload File"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin size="small" /> : "Upload Binary"}
          </Button>
        </Form.Item>

        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </Form>
    </Drawer>
  );
};

export default NewBinaryDrawer;
