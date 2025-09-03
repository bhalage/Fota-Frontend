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

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllModels());
      dispatch(getVariants());
    }
  }, [dispatch, isOpen]);

  return (
    <Drawer
      title="Create New Vehicle"
      width={480}
      onClose={onClose}
      open={isOpen}
      footer={
        <div className="flex justify-start gap-3">
          <Button type="primary" onClick={handleSubmit}>
            Create Vehicle
          </Button>
          <Button onClick={onClose} type="text" danger>
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Form.Item
          label="Select Model"
          required
        >
          <Select
            placeholder="Select a model"
            value={vehicle.modelId || undefined}
            onChange={(value) => setVehicle({ ...vehicle, modelId: value })}
          >
            {modelsData?.map((model) => (
              <Option key={model.modelId} value={model.modelId}>
                {model.modelName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Variant"
          required
        >
          <Select
            placeholder="Select a Variant"
            value={vehicle.variantId || undefined}
            onChange={(value) => setVehicle({ ...vehicle, variantId: value })}
          >
            {variantData?.map((variant) => (
              <Option key={variant.variantId} value={variant.variantId}>
                {variant.variantName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Name"
          required
        >
          <Input
            placeholder="Enter a display name"
            value={vehicle.vehicleName}
            onChange={(e) => setVehicle({ ...vehicle, vehicleName: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Year"
          required
        >
          <Input
            placeholder="Enter the Year"
            value={vehicle.year}
            onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewVehicleDrawer;
