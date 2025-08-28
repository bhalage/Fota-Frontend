import { createSlice } from "@reduxjs/toolkit";
import { getAllVehicles, addNewVehicle } from "../services/vehicleService";
 const initialState= {
    vehicleList: null,        
    error: null,
  }
const vehicleSlice = createSlice({
  name: "vehicles",
initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get vehicles
      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ ensure payload is always array
        state.vehicleList = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(addNewVehicle.fulfilled, (state, action) => {
  state.vehicleList.push(action.payload);  // this should append
});

  },
});

export default vehicleSlice.reducer;
