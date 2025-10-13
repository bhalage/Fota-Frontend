import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRollouts = createAsyncThunk(
    "rollout/getRollouts",
    async (_, { rejectWithValue }) => {
      try {
        const resp = await fleetUrl.get("/api/v1/getAllRollout");
        return resp.data?.data || resp.data || [];
      } catch (error) {
        return rejectWithValue(error);
      }
    })
export const createRollout = createAsyncThunk(
    "rollout/createRollout", 
    async (rolloutData, { rejectWithValue }) => {
      try {
        const resp = await fleetUrl.post("/api/v1/createRollout", rolloutData);
        console.log("Response from createRollout:", resp.data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create rollout");
      }
    })    