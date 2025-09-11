import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/redux/authSlice'
import signupReducer from '../features/signup/redux/signupSlice'
import confirmSignUpReducer from '../features/signup/redux/confirmSignupSlice';
import {modelReducer} from '@/features/model'
import { variantReducer } from "@/features/variants";
import { vehicleReducer } from "@/features/vehicle";
import binaryReducer from '@/features/binary/redux/binarySlice'
import ecuReducer from "../features/ecu/redux/ecuSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        signup:signupReducer,
        confirmSignup:confirmSignUpReducer,
        model:modelReducer,
        variant:variantReducer,
        vehicles:vehicleReducer,
        binary:binaryReducer,
        ecu:ecuReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store