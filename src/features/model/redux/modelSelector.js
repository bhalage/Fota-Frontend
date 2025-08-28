// Root selector
export const selectModelState = (state) => state.model;

// Specific selectors
export const selectModels = (state) => state.model.models;
export const selectModelsLoading = (state) => state.model.loading;
export const selectModelsError = (state) => state.model.error;
