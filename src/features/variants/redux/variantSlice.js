import { createSlice } from "@reduxjs/toolkit";
import { getVariants, addNewVariant } from "../services/variantService";

const initialState = {
  variant: [],
  loading: false,
  error: null,
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ fetch all variants
    builder
      .addCase(getVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload; // replace with fetched list
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ add new variant
    builder
      .addCase(addNewVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.variant.push(action.payload); // append new variant
      })
      .addCase(addNewVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default variantSlice.reducer;


