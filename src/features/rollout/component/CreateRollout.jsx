import { useState } from "react";

const CreateRollout = () => {
  const [vehicleModel, setVehicleModel] = useState("");
  const [rolloutName, setRolloutName] = useState("");
  const [packageVersion, setPackageVersion] = useState("");
  const [targetVehicle, setTargetVehicle] = useState("");
  const [rolloutOwner, setRolloutOwner] = useState("");
  const [approver, setApprover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Rollout Created Successfully!");
  };

  return (
    <div className=" h-full flex flex-col ">
      {/* ✅ Fixed Header */}
      <div className="sticky top-0 bg-white z-10 py-4 px-6 border-b border-gray-300">
        <h2 className="text-2xl font-semibold">Create New Rollout</h2>
      </div>

      {/* ✅ Scrollable Content */}
      <div className="flex-1 overflow-auto p-6 scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Rollout Details */}
          <div className="border border-gray-300 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 border-b border-gray-300 pb-1 ">Rollout Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Vehicle Model</label>
                <select
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                >
                  <option value="">Select Model</option>
                  <option value="CEER_CAR">CEER_CAR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Rollout Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  value={rolloutName}
                  onChange={(e) => setRolloutName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rollout Type</label>
                <div className="flex gap-4">
                  <label>
                    <input type="radio" name="type" className="mr-1" /> Software Update
                  </label>
                  <label>
                    <input type="radio" name="type" className="mr-1" /> Log Config
                  </label>
                  <label>
                    <input type="radio" name="type" className="mr-1" /> Platform Config
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className="border border-gray-300 bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2 border-b border-gray-300 pb-1">Package Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Package Group</label>
                <select className="w-full border border-gray-300 rounded p-2 bg-white">
                  <option value="FRS3">FRS3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Package Version</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter version"
                  value={packageVersion}
                  onChange={(e) => setPackageVersion(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Targeting Strategy */}
          <div className="border border-gray-300 bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2 border-b border-gray-300 pb-1">Targeting Strategy</h3>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="target" className="mr-1" /> Vehicle Groups
              </label>
              <label>
                <input type="radio" name="target" className="mr-1" /> Single Vehicle
              </label>
            </div>
            <label className="block mt-3 text-sm font-medium">Vehicle</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Select vehicle"
              value={targetVehicle}
              onChange={(e) => setTargetVehicle(e.target.value)}
            />
          </div>

          {/* Delivery Media */}
          <div className="border border-gray-300 bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2 border-b border-gray-300 pb-1">Delivery Media</h3>
            <select className="w-full border border-gray-300 rounded p-2 bg-white">
              <option>Any supported media</option>
            </select>
          </div>

          {/* Rollout Owner and Approvers */}
          <div className="border border-gray-300 bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2 border-b border-gray-300 pb-1">Rollout Owner and Approvers</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Rollout Owner</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter owner"
                  value={rolloutOwner}
                  onChange={(e) => setRolloutOwner(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Approvers</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter approver"
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Rollout
            </button>
            <button
              type="reset"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset Fields
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRollout;
