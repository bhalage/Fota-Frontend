import { getAllModels, selectModels } from '@/features/model';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NewVariantDrawer = ({ isOpen, onClose, variant, setVariant, handleSubmit }) => {
  const modelsData = useSelector(selectModels);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) dispatch(getAllModels());
  }, [dispatch, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Create New Variant</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-sm">Select Model</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                required
                value={variant.modelId || ""}
                onChange={(e) => setVariant({ ...variant, modelId: e.target.value })}
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
              <label className="block font-medium text-sm">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                required
                placeholder="Enter variant name"
                value={variant.name}
                onChange={(e) => setVariant({ ...variant, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-sm">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2 mt-1 h-32 resize-none"
                required
                placeholder="Enter variant description"
                value={variant.description}
                onChange={(e) => setVariant({ ...variant, description: e.target.value })}
              />
            </div>

           
          </form>
        </div>

        <div className="border-t p-4 flex justify-start gap-3">
           <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Create Variant
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
    </>
  );
};

export default NewVariantDrawer;
