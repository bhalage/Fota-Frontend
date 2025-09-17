import { message } from "antd";
import {createRollout, getRollouts} from "../services/rollOutService";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  rollouts: [],
  loading: false,
  error: null,
  message:"",
  newRollout:null
};

const rolloutSlice = createSlice({
  name: "rollout",
    initialState,
    reducers: {
      resetNewRollout: (state) => {
      state.newRollout = null;
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getRollouts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getRollouts.fulfilled, (state, action) => {
          state.loading = false;
          state.rollouts = action.payload;
        })
        .addCase(getRollouts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch rollout data";
        })
        .addCase(createRollout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createRollout.fulfilled, (state, action) => {
          state.newRollout = action.payload;
          state.loading = false;
        })
        .addCase(createRollout.rejected, (state, action) => {
          state.error = action.payload || "Failed to create rollout";
          state.loading = false;
        })
        

    },})
export const { resetNewRollout } = rolloutSlice.actions;
    export default rolloutSlice.reducer;