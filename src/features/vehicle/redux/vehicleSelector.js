import { createSelector } from "@reduxjs/toolkit";

const selectVehicleState = (state) => state.vehicles;

export const selectVehicles = createSelector(
  [selectVehicleState],
  (vehiclesState) => vehiclesState.vehicleList || []
);
