import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRolloutByUserId=createAsyncThunk(
  "admin/getAllRolloutByUserId",
  async (userId,{rejectWithValue})=>{   
    try{   
       
        const response=await fleetUrl(`/api/v1/getAllRolloutByUser/${userId}`);
        
        return response.data.data || [];
    }
    catch(error){
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch rollouts"
          );
    }});

    export const approveRollout=createAsyncThunk(
      "admin/approveRollout",
      async ({userId,rolloutId},{rejectWithValue})=>{
        try{
          const response=await fleetUrl.post(`/api/v1/approveRollout/${userId}/${rolloutId}`);
          
          return response.data;
        }catch(error){
            return rejectWithValue(
                 error.response?.data?.message || error.message || "Failed to fetch rollouts"
          );
    }});

    export const disapproveRollout=createAsyncThunk(
      "admin/disapproveRollout",
      async ({userId,rolloutId},{rejectWithValue})=>{   
        try{
            const response=await fleetUrl.post(`/api/v1/rejectRollout/${userId}/${rolloutId}`);
           
            return response.data;
        }catch(error){
            return rejectWithValue(
                 error.response?.data?.message || error.message || "Failed to fetch rollouts"
          );
    }});