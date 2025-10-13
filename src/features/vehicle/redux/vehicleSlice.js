import { createSlice } from "@reduxjs/toolkit";
import { getAllVehicles, addNewVehicle, approveVehicle ,getAllRolloutsByVin} from "../services/vehicleService";
 const initialState= {
    vehicleList: null,
    rolloutList:null,
    loading: false,        
    error: null,
    vehicleDeleteStatus:null,

  }
const vehicleSlice = createSlice({
  name: "vehicles",
initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        
        state.vehicleList = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(addNewVehicle.fulfilled, (state, action) => {
  state.vehicleList.push(action.payload);  
})

      .addCase(approveVehicle.fulfilled, (state, action) => {
        const { vin } = action.payload;
        const index = state.vehicleList.findIndex((v) => v.vin === vin);
        if (index !== -1) {
          state.vehicleList[index].register = "allow"; 
        }
      })
      .addCase(getAllRolloutsByVin.pending,(state)=>{
        state.loading=true;
      })
      .addCase(getAllRolloutsByVin.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(getAllRolloutsByVin.fulfilled,(state,action)=>{
        state.loading=false;
        state.rolloutList=action.payload;
      })
      .addCase('vehicles/deleteVehicle/pending', (state) => {
        state.loading = true;
        state.vehicleDeleteStatus = null;
      })
      .addCase('vehicles/deleteVehicle/fulfilled', (state, action) => {
        state.loading = false;
        state.vehicleDeleteStatus = action.payload;
        state.vehicleList = state.vehicleList.filter(vehicle => vehicle.vehicleId !== action.payload.vehicleId);
        console.log(state.vehicleList);
      })
      .addCase('vehicles/deleteVehicle/rejected', (state, action) => {
        state.loading = false;
        state.vehicleDeleteStatus = 'failed';
        state.error = action.payload;
      });

  },
});

export default vehicleSlice.reducer;
