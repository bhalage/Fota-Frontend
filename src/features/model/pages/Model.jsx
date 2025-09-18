import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { addNewModel, getAllModels } from '@/features/model/services/modelService';
import { useDispatch, useSelector } from 'react-redux';
import { selectModels } from '@/features/model/redux/modelSelector';
import { Button } from 'antd';

// Lazy load heavy components
const NewModelDrawer = lazy(() => import('../components/NewModelDrawer'));
const ModelTable = lazy(() => import('../components/ModelTable'));

const Model = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');

  const modelsData = useSelector(selectModels);
  const loading = useSelector((state) => state.model.loading);
  const error = useSelector((state) => state.model.error);

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getAllModels());
  }, [dispatch]);

  
  useEffect(() => {
    console.log('Models updated:', modelsData);
  }, [modelsData]);

  
  const handleSubmit = useCallback(() => {
    console.log('Adding model:', name);
    dispatch(addNewModel({ modelName: name }));
    setDrawerOpen(false);
    setName('');
  }, [dispatch, name]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">All Model</h1>

        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          + New Vehicle Model
        </Button>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <Suspense fallback={<div>Loading models...</div>}>
        <ModelTable data={modelsData || []} loading={loading} />
      </Suspense>

      <Suspense fallback={<div>Loading drawer...</div>}>
        <NewModelDrawer
          isOpen={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
      </Suspense>
    </div>
  );
};

export default Model;
