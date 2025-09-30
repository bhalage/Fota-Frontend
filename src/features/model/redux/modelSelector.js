
export const selectModelState = (state) => state.model;

export const selectModels = (state) => state.model.models;
export const selectModelWithCount=(state)=>state.model.modelsWithCount;
export const selectModelsLoading = (state) => state.model.loading;
export const selectModelsError = (state) => state.model.error;
export const selectVehiclesByModelId=(state)=>state.model.vehiclesByModelId;
export const selectErrorVehiclesByModelId=(state)=>state.model.errorVehiclesByModelId;