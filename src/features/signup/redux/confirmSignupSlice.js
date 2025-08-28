import { createSlice } from "@reduxjs/toolkit";

const initialState={
    confirmData:null,
    loading:false,
    error:null,
};

const confirmSignupSlice=createSlice({
    name:"confirmSignup",
    initialState,
    reducers:{
        confirmSignUpStart:(state)=>{
            state.loading=true;
            state.error=null;

        },
        confirmSignUpSuccess:(state,action)=>{
            state.loading=false;
            state.confirmData=action.payload;
        },
        confirmSignupFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
});
export const{confirmSignUpStart, confirmSignUpSuccess, confirmSignupFailure}=confirmSignupSlice.actions;
export default confirmSignupSlice.reducer;