import React from 'react';
import { Button } from 'antd';

const ModelHeader = ({ onAddClick }) => (
  <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
    <h1 className="text-2xl font-semibold">All Model</h1>
    <Button type="primary" onClick={onAddClick}>
      + New Vehicle Model
    </Button>
  </div>
);

export default React.memo(ModelHeader);
