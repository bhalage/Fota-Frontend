import React from 'react';

const NewModelDrawer = ({ isOpen, onClose ,name,setName,handleSubmit}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer Panel */}
            {/* Drawer Panel */}
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Create New Model</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
        </div>

        {/* Content fills remaining space */}
        <div className="flex-1 p-4 overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-sm">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                required
                placeholder="Enter a model name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="border-t p-4 flex justify-end gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"  onClick={handleSubmit}>
            Create Model
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

export default NewModelDrawer;
