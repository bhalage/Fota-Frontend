import { createAsyncThunk } from "@reduxjs/toolkit";
import fleetUrl from "@/fleetUrl";

// Get all vehicles
export const getAllVehicles = createAsyncThunk(
  "vehicles/getAllVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.get("/api/v1/vehicle/getAllVehicle");
      // ✅ unwrap data properly
      return resp.data?.data || resp.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch vehicles"
      );
    }
  }
);

// Add new vehicle
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
export const approveVehicle = createAsyncThunk(
  "vehicles/approveVehicle",
  async (vin, { rejectWithValue }) => {
    try {
      console.log("Approving vehicle with VIN:", vin);
      const resp = await fleetUrl.post(`/api/v1/vehicle/${vin}/approve`);
      return { vin, message: resp.data }; // keep vin in payload
    } catch (error) {
      console.error("Error approving vehicle:", error);
      return rejectWithValue(
        
        error.response?.data?.message || error.message || "Failed to approve vehicle"
        
      );
    }
  }
);