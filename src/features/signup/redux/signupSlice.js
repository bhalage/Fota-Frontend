import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:null,
    loading: false,
    error:null,
};
const signupSlice=createSlice({
    name:"signup",
    initialState,
    reducers:{
        signupStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signupSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        },
        signupFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
});
export const{signupStart,signupSuccess,signupFailure}=signupSlice.actions;
export default signupSlice.reducer;