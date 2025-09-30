import { createAsyncThunk } from "@reduxjs/toolkit";
import fleetUrl from "@/fleetUrl";

// Get all vehicles
export const getAllVehicles = createAsyncThunk(
  "vehicles/getAllVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.get("/api/v1/vehicle/getAllVehicle");
     console.log(resp.data)
      return resp.data?.data || resp.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch vehicles"
      );
    }
  }
);
//Add new Vehicle 
export const addNewVehicle = createAsyncThunk(
  "vehicles/addNewVehicle",
  async (vehicle, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.post(
        "/api/v1/vehicle/addVehicleAndcreatejwt",
        vehicle
      );
      return resp.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add new vehicle"
      );
    }
  }
);

// export const approveVehicle = createAsyncThunk(
//   "vehicles/approveVehicle",
//   async ({vin,status} ,{ rejectWithValue }) => {
//     try {
//       console.log("Approving vehicle with VIN:", vin);
//       const resp = await fleetUrl.post(`/api/v1/vehicle/${vin}/${status}`);
//       console.log(resp.data)
//       return { vin, message: resp.data }; 
//     } catch (error) {
//       console.error("Error approving vehicle:", error);
//       return rejectWithValue(
        
//         error.response?.data?.message || error.message || "Failed to approve vehicle"
        
//       );
//     }
//   }
// );

// vehiclesSlice.js
export const approveVehicle = createAsyncThunk(
  "vehicles/approveVehicle",
  async ({ vin, status }, { rejectWithValue }) => {
    try {
      console.log("Approving vehicle with VIN:", vin, "status:", status);
      const resp = await fleetUrl.post(`/api/v1/vehicle/${vin}/${status}`);
      return { vin, message: resp.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to approve vehicle"
      );
    }
  }
);

export const getAllRolloutsByVin= createAsyncThunk(
  "vehicles/getAllRolloutsByVin",
  async(vin,{rejectWithValue})=>{
    try {
      const resp=await fleetUrl.get(`/api/v1/getAllRollout/${vin}`);
      console.log(resp.data.data)
      return resp?.data?.data;
    } catch (error) {
      return rejectWithValue (error.response?.data?.message);
    }
  }
)
// Cancel / delete vehicle

// export const cancelVehicle=createAsyncThunk(
//   "vehicles/cancelVehicle",
//   async(vin,{rejectWithValue})=>{
//     try {
//       const resp= await fleetUrl.post( `/api/v1/vehicle/${vin}/cancel`);
//       console.log(resp.data)
//       return {vin,message: resp.data}
//     } catch (error) {
//       console.error("Error in cancelling vehicle :",error)
//       return rejectWithValue(
//         error.response || "failed to cancel vehicle"
//       )
//     }
//   }
// )