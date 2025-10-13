import { createAsyncThunk } from "@reduxjs/toolkit";
import fleetUrl from "@/fleetUrl";

export const getAllVehicles = createAsyncThunk(
  "vehicles/getAllVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.get("/api/v1/vehicle/getAllVehicle");
      return resp.data?.data || resp.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch vehicles"
      );
    }
  }
);

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
  async ({ vin, status }, { rejectWithValue }) => {
    try {
  
      const resp = await fleetUrl.post(`/api/v1/vehicle/${vin}/${status}`);
      console.log(resp.data);
      return { vin, message: resp.data };
    } catch (error) {
      return rejectWithValue(
        console.log(error),
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
      return resp?.data?.data;
    } catch (error) {
      return rejectWithValue (error.response?.data?.message);
    }
  }
)
export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (vehicleId, { rejectWithValue }) => { 
    try {
      console.log("Deleting vehicle with ID:", vehicleId);
      const resp = await fleetUrl.delete("/api/v1/dynamic/delete",{data:{vehicleId}});
      return resp.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete vehicle"
      );
    } }
  )
