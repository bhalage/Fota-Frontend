import { useEffect, useState } from 'react';
import NewModelDrawer from '../components/NewModelDrawer';
import { addNewModel, getAllModels } from '@/features/model/services/modelService';
import { useDispatch, useSelector } from 'react-redux';
import { selectModels } from '@/features/model/redux/modelSelector';
import ModelTable from '../components/ModelTable';
import {Button} from 'antd';
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

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("Adding model:", name);
    dispatch(addNewModel({ modelName: name }));
    setDrawerOpen(false);
    setName("");
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">All Model</h1>
        
        <Button
          type="primary"
          onClick={() => setDrawerOpen(true)}
        >
          + New Vehicle Model
        </Button>
      </div>

      {/* {loading && <p>Loading models...</p>}
      {error && <p className="text-red-500">Error: {error}</p>} */}
      <ModelTable data={modelsData || []} loading={loading}/>

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
