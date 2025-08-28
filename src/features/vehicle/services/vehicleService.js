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
