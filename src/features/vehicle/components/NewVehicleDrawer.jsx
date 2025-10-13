import { getAllModels, selectModels } from '@/features/model';
import { selectVariants } from '@/features/variants';
import { getVariants } from '@/features/variants/services/variantService';
import { Button, Drawer, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const NewVehicleDrawer = ({ isOpen, onClose, vehicle, setVehicle, handleSubmit }) => {
  const modelsData = useSelector(selectModels);
  const variantData = useSelector(selectVariants);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllModels());
      dispatch(getVariants());
      form.setFieldsValue(vehicle);
    }
  }, [dispatch, isOpen, vehicle, form]);

  const onFinish = () => {
    handleSubmit();
    onClose();
  };

  return (
    <Drawer
      title="Create New Vehicle"
      width={480}
      onClose={onClose}
      open={isOpen}
      footer={
        <div className="flex justify-start gap-3">
          <Button type="primary" onClick={() => form.submit()}>
            Create Vehicle
          </Button>
          <Button onClick={onClose} type="text" danger>
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={vehicle}>
        <Form.Item
          label="Select Model"
          name="modelId"
          rules={[{ required: true, message: 'Please select a model' }]}
        >
          <Select
            placeholder="Select a model"
            onChange={(value) => setVehicle({ ...vehicle, modelId: value })}
          >
            <Option value="" default>Select Model</Option> 
            {modelsData?.map((model) => (
              <Option key={model.modelId} value={model.modelId}>
                {model.modelName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Variant"
          name="variantId"
          rules={[{ required: true, message: 'Please select a variant' }]}
        >
          <Select
            placeholder="Select a Variant"
            onChange={(value) => setVehicle({ ...vehicle, variantId: value })}
          >
            <Option value="" default>Select Variant</Option>
            {variantData?.map((variant) => (
              <Option key={variant.variantId} value={variant.variantId}>
                {variant.variantName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Name"
          name="vehicleName"
          rules={[
            { required: true, message: 'Vehicle name is required' },
            { min: 2, max: 50, message: 'Vehicle name must be between 2 and 50 characters' },
            {
              pattern: /^[A-Za-z0-9 .\-/]+$/,
              message:
                'Vehicle name can only contain letters, numbers, spaces, hyphens, dots, and slashes',
            },
          ]}
        >
          <Input
            placeholder="Enter a display name"
            onChange={(e) => setVehicle({ ...vehicle, vehicleName: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Year"
          name="year"
          rules={[
            { required: true, message: 'Vehicle year is required' },
            {
              pattern: /^(19|20)\d{2}$/,
              message: 'Please enter a valid year (e.g. 2024)',
            },
          ]}
        >
          <Input
            placeholder="Enter the Year"
            onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewVehicleDrawer;
