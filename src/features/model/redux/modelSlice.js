import { createSlice } from "@reduxjs/toolkit";
import { getAllModels, addNewModel, getAllModelsWithcount, getAllVehicleByModelId } from "../services/modelService";

const initialState = {
  models: null,
  loading: false,
  error: null,
  modelsWithCount:null,
  vehiclesByModelId:[],
  errorVehiclesByModelId:null
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
      })
      .addCase(getAllModelsWithcount.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(getAllModelsWithcount.fulfilled,(state,action) =>{
        state.loading=false;
        state.modelsWithCount=action.payload;
      })
      .addCase(getAllModelsWithcount.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(getAllVehicleByModelId.pending,(state)=>{
        state.loading=true;
      })
      .addCase(getAllVehicleByModelId.fulfilled,(state,action)=>{
        state.loading=false;
        console.log(action.payload)
        state.vehiclesByModelId=action.payload;
      })
      .addCase(getAllVehicleByModelId.rejected,(state,action)=>{
        state.loading=false;
        state.errorVehiclesByModelId=action.payload;
      });
  },
});

export default modelSlice.reducer;
