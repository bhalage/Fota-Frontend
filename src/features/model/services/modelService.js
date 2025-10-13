import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllModels = createAsyncThunk(
  "model/getAllModels",
  async (_, { rejectWithValue }) => {
    try {    
      const resp = await fleetUrl.get("/api/v1/model/getAllModel");
      
      return resp.data?.data || resp.data || [];
    } catch (error) {
      
      return rejectWithValue(error);
    }
  }
);
export const getAllModelsWithcount=createAsyncThunk(
  "model/getAllModelsWithCount",
  async(_,{rejectWithValue})=>{
    try {
      const resp= await fleetUrl.get("/api/v1/model/getAllModelwithCount")
     
      return resp.data?.data;
    } catch (error) {
     
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


export const addNewModel = createAsyncThunk(
  "model/addNewModel",
  async (model, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.post("/api/v1/model/addModel", model);
     
      return resp.data?.data;
    } catch (error) {
     
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllVehicleByModelId=createAsyncThunk(
  "model/getAllVehicleByModelId",
  async(id,{rejectWithValue})=>{
    try {
      const resp=await fleetUrl.get(`/api/v1/vehicle/getAllVehicleByModelId/${id}`);
     
      return resp.data;
    } catch (error) {
      
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

