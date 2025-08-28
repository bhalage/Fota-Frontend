import { useEffect, useState } from 'react';
import NewModelDrawer from '../components/NewModelDrawer';
import { addNewModel, getAllModels } from '@/features/model/services/modelService';
import { useDispatch, useSelector } from 'react-redux';
import { selectModels } from '@/features/model/redux/modelSelector';
import ModelTable from '../components/ModelTable';

const Model = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState("");

  const modelsData = useSelector(selectModels);
  const loading = useSelector(state => state.model.loading);
  const error = useSelector(state => state.model.error);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching models...");
    dispatch(getAllModels());
    console.log(modelsData)
  }, [dispatch]);

  useEffect(() => {
    console.log("Models updated:", modelsData);
  }, [modelsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding model:", name);
    dispatch(addNewModel({ modelName: name }));
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Model</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setDrawerOpen(true)}
        >
          + New Model
        </button>
      </div>

      {loading && <p>Loading models...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ModelTable data={modelsData || []} />

      <NewModelDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Model;
