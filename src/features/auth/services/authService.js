import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("http://localhost:8088/api/v1/um/signIn", credentials);
    const { accessToken, idToken, refreshToken } = response.data.extras;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);

   if(response.data.success){
     dispatch(loginSuccess({ accessToken, idToken, refreshToken }));
   }else{
    dispatch(loginFailure("Incorrect Username or Password"));
   }
  } catch (error) {
    console.log(error)
    dispatch(loginFailure(error.response?.data?.message || "Login Failed"));
  }
};
