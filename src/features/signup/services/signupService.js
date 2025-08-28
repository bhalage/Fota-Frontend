import axios from "axios";
import { signupFailure, signupStart, signupSuccess } from "../redux/signupSlice"
import { confirmSignupFailure, confirmSignUpStart, confirmSignUpSuccess } from "../redux/confirmSignupSlice";

export const signUpUser=(userData)=>async(dispatch)=>{
    dispatch(signupStart());
    try {
        const response= await axios.post("http://localhost:8088/api/v1/um/signup",userData);
        const {message,success}=response.data;
        console.log(response.data)
        dispatch(signupSuccess({message,success}));
        return {message,success};
    } catch (error) {
        dispatch(signupFailure(error.message || "Signup failed"));
    }
}
export const confirm=(confirmData)=>async(dispatch)=>{
  dispatch(confirmSignUpStart)
    try {
     const response=await axios.post("http://localhost:8088/api/v1/um/confirmSignup",confirmData);
    console.log(response.data);
    dispatch(confirmSignUpSuccess(response.data));
   } catch (error) {
    console.log(error);
    dispatch(confirmSignupFailure(error));
   }
};