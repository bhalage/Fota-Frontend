import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ fetch all models
export const getAllModels = createAsyncThunk(
  "model/getAllModels",
  async (_, { rejectWithValue }) => {
    try {    
      const resp = await fleetUrl.get("/api/v1/model/getAllModel");
      console.log("API response:", resp.data);
      return resp.data?.data || resp.data || [];
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ add new model
export const addNewModel = createAsyncThunk(
  "model/addNewModel",
  async (model, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.post("/api/v1/model/addModel", model);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
