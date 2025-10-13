import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewModel, getAllModels, getAllModelsWithcount } from '@/features/model/services/modelService';
import { selectModelWithCount } from '@/features/model/redux/modelSelector';

import ModelHeader from '../components/ModelHeader';
import ModelList from '../components/ModelList';
import ModelFormDrawer from '../components/ModelFormDrawer';

const Model = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const modelsData = useSelector(selectModelWithCount);
  const loading = useSelector((state) => state.model.loading);
  const error = useSelector((state) => state.model.error);

  useEffect(() => {
    dispatch(getAllModelsWithcount());
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(addNewModel({ modelName: name }))
    .unwrap()
    .then(()=> dispatch(getAllModelsWithcount()))
    setDrawerOpen(false);
    setName('');
   
  }, [dispatch, name]);

  return (
    <div className="relative">
      <ModelHeader onAddClick={() => setDrawerOpen(true)} />
      <ModelList data={modelsData} loading={loading} error={error} />
      <ModelFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Model;
