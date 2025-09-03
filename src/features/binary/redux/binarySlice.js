import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BinaryService from "../service/binaryService";

// export const uploadBinary = createAsyncThunk(
//   "binary/upload",
//   async ({ file, fileName }, thunkAPI) => {
//     try {
//       const response = await BinaryService.uploadFile(file, fileName);
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || "Upload failed");
//     }
//   }
// );


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
export const fetchBinaries = createAsyncThunk(
  "binary/fetchAll", 
  async (_, thunkAPI) => {
    try {
      const response = await BinaryService.getAllFiles();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Fetch failed");
    }
  })
const binarySlice = createSlice({
  name: "binary",
  initialState: {
    loading: false,
    success: false,
    error: null,
    binaries: [],
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
      })
      .addCase(fetchBinaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBinaries.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  // Transform API array of strings into objects with key + name
  state.binaries = action.payload.map((item, index) => ({
    key: index,
    name: item,
  }));
})

      .addCase(fetchBinaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default binarySlice.reducer;
export const selectBinaryState = (state) => state.binary;