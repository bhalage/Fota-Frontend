import fleetUrl from "@/fleetUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ fetch all variants
export const getVariants = createAsyncThunk(
  "variant/getVariants",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.get("/api/v1/variant/getAllVariant");
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch variant data");
    }
  }
);

// ✅ add new variant
export const addNewVariant = createAsyncThunk(
  "variant/addNewVariant",
  async (variant, { rejectWithValue }) => {
    try {
      const resp = await fleetUrl.post("/api/v1/variant/addVariant", variant);
      return resp.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  }
);
