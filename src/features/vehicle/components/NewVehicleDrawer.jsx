import { getAllModels, selectModels } from '@/features/model';
import {  selectVariants } from '@/features/variants';
import { getVariants } from '@/features/variants/services/variantService';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const NewVehicleDrawer = ({ isOpen, onClose, vehicle, setVehicle, handleSubmit }) => {
  if (!isOpen) return null;
  const modelsData = useSelector(selectModels);
  const variantData = useSelector(selectVariants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllModels())
      dispatch(getVariants())
    };
  }, [dispatch, isOpen]);
  useEffect(() => {
    console.log(modelsData)
    console.log(variantData)
  }, [isOpen])
  return (<>
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      onClick={onClose}
    />
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Create New Vehicle</h2>
        <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <form className='space-y-4'>
          <div>
            <label className="block font-medium text-sm">Select Model</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              required
              value={vehicle.modelId || ""}
              onChange={(e) => setVehicle({ ...vehicle, modelId: e.target.value })}
            >
              <option value="" disabled>Select a model</option>
              {modelsData?.map((model) => (
                <option key={model.modelId} value={model.modelId}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm">Select Veriant</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              required
              value={vehicle.variantId || ""}
              onChange={(e) => setVehicle({ ...vehicle, variantId: e.target.value })}
            >
              <option value="" disabled>Select a Variant</option>
              {variantData?.map((variant) => (
                <option key={variant.variantId} value={variant.variantId}>
                  {variant.variantName}
                </option>
              ))}
            </select>
          </div>



          <div>
            <label className="block font-medium text-sm">Name <span className="text-red-500">*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Enter a display name" value={vehicle.name} onChange={(e) => setVehicle({ ...vehicle, vehicleName: e.target.value })} />
          </div>

          <div>
            <label className="block font-medium text-sm">Year <span className="text-red-500">*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Enter the Year" value={vehicle.year} onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} />
          </div>
        </form></div>

      <div className="border-t p-4 flex justify-start gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSubmit}>
          Create Vehicle
        </button>
        <button
          onClick={onClose}
          type="button"
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>

      </div>
    </div>
    {/* Drawer Panel */}

  </>
  );
};

export default NewVehicleDrawer;
