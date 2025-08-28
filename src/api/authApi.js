import axios from "axios";
const url=import.meta.env.URL;
export const signIn = async (credentials) => {
  const response = await axios.post('http://localhost:8088/api/v1/um/signIn', credentials);
  return response.data;
};
export const signUp=async(userData)=>{
  const response=await axios.post(`${url}/api/v1/um/signup`,userData);
  return response.data;
}