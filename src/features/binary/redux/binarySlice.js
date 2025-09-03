import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BinaryService from "../service/binaryService";

export const uploadBinary = createAsyncThunk(
  "binary/upload",
  async ({ file, fileName }, thunkAPI) => {
    try {
      const response = await BinaryService.uploadFile(file, fileName);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Upload failed");
    }
  }
);

const binarySlice = createSlice({
  name: "binary",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadBinary.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadBinary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadBinary.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default binarySlice.reducer;
export const selectBinaryState = (state) => state.binary;