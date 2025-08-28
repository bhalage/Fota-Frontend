import React, { useState } from 'react'
import NewBinaryDrawer from '../components/NewBinaryDrawer';

const UploadBinary = () => {
  const [isDrawerOpen, setDrawerOpen] = useState (false);
  return (
  <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Available Binaries</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setDrawerOpen(true)}
        >
          + New Binary
        </button>
      </div>
      <NewBinaryDrawer isOpen={isDrawerOpen} onClose={()=>setDrawerOpen(false)}/>
</div>
  )
}

export default UploadBinary