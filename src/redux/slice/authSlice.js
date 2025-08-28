import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    user:null,
    loading:false,
    error:null
};

export const loginUser=(credentials)=>async(dispatch)=>{
    dispatch(loginStart());
    try {
        const response=await axios.post('http://localhost:8088/api/v1/um/signIn',credentials);
        console.log(response.data)
         const { accessToken, idToken, refreshToken } = response.data.extras;

    // Optional: Save to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch(loginSuccess({ accessToken, idToken, refreshToken }));
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Login Failed'));
    }
};

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            console.log(action.payload)
        },
        loginFailure:(state,action)=>{
            state.loading=null;
            state.error=action.payload;
        },
        logout:(state)=>{
            state.user=null;
            state.error=null;

 localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
          

        }
    }
});

export const{loginStart,loginSuccess,loginFailure,logout}=authSlice.actions;
export default authSlice.reducer;
  

// src/redux/slice/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   loading: false,
//   error: null
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.error = null;
//       localStorage.clear();
//     }
//   }
// });

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;
