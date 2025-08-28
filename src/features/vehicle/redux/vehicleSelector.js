// ✅ selector always returns array
export const selectVehicles = (state) => state.vehicles?.vehicleList || [];
