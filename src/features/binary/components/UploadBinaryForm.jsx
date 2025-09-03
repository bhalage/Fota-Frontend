// UploadBinaryForm.jsx
import React, { useState } from "react";

const UploadBinaryForm = () => {
  const [formData, setFormData] = useState({
    vehicleModel: "",
    modelVariant: "",
    vin: "",
    name: "",
    make: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a file before submitting.");
      return;
    }

    const data = new FormData();
    data.append("vehicleModel", formData.vehicleModel);
    data.append("modelVariant", formData.modelVariant);
    data.append("vin", formData.vin);
    data.append("name", formData.name);
    data.append("make", formData.make);
    data.append("file", formData.file);

    // Example API call (replace with your endpoint)
    fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Upload successful:", result);
        alert("Vehicle created and file uploaded successfully!");
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Upload failed!");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 max-w-lg mx-auto rounded shadow"
    >
      {/* <div>
        <label className="block font-medium text-sm">
          Vehicle Model <span className="text-red-500">*</span>
        </label>
        <select
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        >
          <option value="">Select a vehicle model</option>
          <option value="Model X">Model X</option>
          <option value="Model Y">Model Y</option>
        </select>
      </div> */}

      {/* <div>
        <label className="block font-medium text-sm">
          Model Variant <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="modelVariant"
          value={formData.modelVariant}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Select model variant"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm">
          VIN <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="vin"
          value={formData.vin}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Enter VIN"
          required
        />
      </div> */}

      <div>
        <label className="block font-medium text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Enter a display name"
        />
      </div>

      {/* <div>
        <label className="block font-medium text-sm">Make</label>
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Select or enter the make"
        />
      </div> */}

     <div>
  <label className="block font-medium text-sm">
    Upload File <span className="text-red-500">*</span>
  </label>

  <label
    htmlFor="fileUpload"
    className="w-full border border-green-400 border-dashed h-20 flex items-center justify-center rounded cursor-pointer text-gray-500 hover:bg-blue-50"
  >
    {formData.file ? formData.file.name : "Choose File"}
  </label>

  <input
    id="fileUpload"
    type="file"
    name="file"
    onChange={handleChange}
    className="hidden"
    required
  />
</div>


      <div className="pt-6 flex justify-end gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
         Upload Binary
        </button>
      </div>
    </form>
  );
};

export default UploadBinaryForm;
