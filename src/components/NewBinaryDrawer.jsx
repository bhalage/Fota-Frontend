import React from 'react'
import UploadBinaryForm from './UploadBinaryForm';

const NewBinaryDrawer = ({ isOpen, onClose }) => {
      if (!isOpen) return null;
   return (<>
            <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Upload New Binary</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
        </div>
        <UploadBinaryForm />
        </div>
      {/* Drawer Panel */}
      
    </>
  );
}

export default NewBinaryDrawer