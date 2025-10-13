
import { createSlice } from "@reduxjs/toolkit";
import { approveRollout, disapproveRollout, getAllRolloutByUserId } from "../services/adminService";

const initialState = {
    rollouts: null,
    loading: false,
    error: null,
    approvalStatus:null,
    approvalLoading:false,
    approvalError:null,
    disApprovalStatus:null,
    disApprovalLoading:false,
    disApprovalError:null
}
const adminSlice = createSlice(
    {
        name: "admin",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getAllRolloutByUserId.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getAllRolloutByUserId.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(getAllRolloutByUserId.fulfilled, (state, action) => {
                    state.loading = false;
                    state.rollouts = action.payload;
                   
                })
                .addCase(approveRollout.pending, (state) => {
                    state.approvalLoading = true;
                }).addCase(approveRollout.rejected, (state, action) => {
                    state.approvalLoading = false;
                    state.approvalError = action.payload;
                }).addCase(approveRollout.fulfilled, (state, action) => {
                    state.approvalLoading = false;
                    state.approvalStatus = action.payload;
                })
                .addCase(disapproveRollout.pending,(state)=>{
                    state.disApprovalLoading=true;
                }
                )
                .addCase(disapproveRollout.rejected,(state,action)=>{
                    state.disApprovalLoading=false;
                    state.disApprovalError=action.payload;
                })
                .addCase(disapproveRollout.fulfilled,(state,action)=>{
                    state.disApprovalLoading=false;
                    state.disApprovalStatus=action.payload;
                })
        }});
        export default adminSlice.reducer;