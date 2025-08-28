import React from "react";

const TokenPopup = ({ isOpen, onClose, token }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    alert("Copied to clipboard!");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Popup Box */}
      <div className="fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Vehicle Access Token</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
        </div>

        {/* Token Display */}
        <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all max-h-40 overflow-y-auto">
          {token}
        </div>

        {/* Copy Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default TokenPopup;
