import React, { useState } from 'react'
import ConfirmSignUpForm from '../components/ConfirmSignUpForm'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirm } from '../services/signupService';
import { selectConfirmSignUpLoading, selectConfirmSignUpUser } from '../redux/confirmSignupSelector';

const ConfirmSignup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [otp,setOtp]=useState();
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const loading=useSelector(selectConfirmSignUpLoading);
  const resp=useSelector(selectConfirmSignUpUser);


  console.log(email)
  const handleSubmit= (e)=>{
// e.preventDefault();
const result= dispatch(confirm({
  "email":email,
  "confirmationCode":otp
}));
if(resp.success){
  navigate('/');
}
console.log(resp);
  }
  return (
   <div className='min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-blue-500'>
    <ConfirmSignUpForm otp={otp} setOtp={setOtp} handleSubmit={handleSubmit}/>
   </div>
  )
}

export default ConfirmSignup