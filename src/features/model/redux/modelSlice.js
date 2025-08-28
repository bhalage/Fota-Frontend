import { createSlice } from "@reduxjs/toolkit";
import { getAllModels, addNewModel } from "../services/modelService";

const initialState = {
  models: null,
  loading: false,
  error: null,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(getAllModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewModel.fulfilled, (state, action) => {
        state.loading = false;
        if (state.models) {
          state.models.push(action.payload);
        } else {
          state.models = [action.payload];
        }
      })
      .addCase(addNewModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default modelSlice.reducer;
