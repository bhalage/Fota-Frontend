// src/services/authService.js
import { signIn } from "../api/authApi";
import { loginStart, loginSuccess, loginFailure } from "../redux/slice/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const data = await signIn(credentials);
    const { accessToken, idToken, refreshToken } = data.extras;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch(loginSuccess({ accessToken, idToken, refreshToken }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login Failed'));
  }
};
