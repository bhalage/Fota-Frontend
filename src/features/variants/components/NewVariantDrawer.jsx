import { getAllModels, selectModels } from '@/features/model';
import { Button, Drawer, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const NewVariantDrawer = ({ isOpen, onClose, variant, setVariant, handleSubmit }) => {
  const modelsData = useSelector(selectModels);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllModels());
      form.setFieldsValue(variant); // preload variant values if editing
    }
  }, [dispatch, isOpen, variant, form]);

  const onFinish = () => {
    handleSubmit();
    onClose();
  };

  return (
    <Drawer
      title="Create New Variant"
      open={isOpen}
      onClose={onClose}
      width={420}
      destroyOnClose
      footer={
        <div style={{ textAlign: 'left' }}>
          <Button type="primary" onClick={() => form.submit()} style={{ marginRight: 8 }}>
            Create Variant
          </Button>
          <Button onClick={onClose} danger type="text">
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={variant}
      >
        {/* Model Selection */}
        <Form.Item
          label="Select Model"
          name="modelId"
          rules={[
            { required: true, message: 'Please select a model' }
          ]}
        >
          <Select
            placeholder="Select a model"
            onChange={(value) => setVariant({ ...variant, modelId: value })}
          >
            {modelsData?.map((model) => (
              <Option key={model.modelId} value={model.modelId}>
                {model.modelName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Variant Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Variant name is required' },
            { min: 2, max: 50, message: 'Variant name must be between 2 and 50 characters' },
            {
              pattern: /^[A-Za-z0-9 .\-/]+(?: [A-Za-z0-9 .\-/]+)*$/,
              message: 'Only letters, numbers, spaces, hyphens, dots, and slashes are allowed',
            },
          ]}
        >
          <Input
            placeholder="Enter variant name"
            onChange={(e) => setVariant({ ...variant, name: e.target.value })}
          />
        </Form.Item>

        {/* Variant Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Variant description is required' },
            { min: 2, max: 100, message: 'Description must be between 2 and 100 characters' },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter variant description"
            onChange={(e) =>
              setVariant({ ...variant, description: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewVariantDrawer;
