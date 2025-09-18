import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllEcus = createAsyncThunk(
    "ecu/getAllEcus",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await fleetUrl.get("/api/v1/ecu/getAllEcu");

            return resp.data || [];
        } catch (error) {
            console.error("API error:", error);
            
            return rejectWithValue(error.message);
        }
    }
);

export const addNewEcu = createAsyncThunk(
    "ecu/addNewEcu",
    async (ecu, { rejectWithValue }) => {
        try {
            const resp = await fleetUrl.post("/api/v1/ecu/addEcu", ecu)

            return resp.data;
        } catch (error) {
            console.error("API error:", error);
            return rejectWithValue(error.message);
        }
    });
export const getEcusByModelId = createAsyncThunk(
    "ecu/getEcusByModelId",
    async (modelId, { rejectWithValue }) => {
        try {
            const resp = await fleetUrl.get(`/api/v1/ecu/${modelId}`);

           
            if (Array.isArray(resp.data)) {
                return resp.data.filter(
                    ecu => ecu.ecuName && ecu.ecuName.trim() !== "" 
                );
            }
            return [];
        }
        catch (error) {
            console.error("API error:", error);
            throw new Error("Failed to fetch ECUs for the model.");
            return rejectWithValue(error.message);
        }
    })
export const attachEcuToModel = createAsyncThunk(
    "ecu/attachEcuToModel",
    async ({ modelId, ecuIds }, { rejectWithValue }) => {
        try {
            const resp = await fleetUrl.post(`/api/v1/ecu/attach/${modelId}`, { ecuIds});
            return resp.data;
        } catch (error) {
            console.error("API error:", error);
            return rejectWithValue(error.message);
        }
    })