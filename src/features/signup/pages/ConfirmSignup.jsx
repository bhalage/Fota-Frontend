import React, { useEffect, useState } from 'react'
import ConfirmSignUpForm from '../components/ConfirmSignUpForm'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirm } from '../services/signupService';
import { selectConfirmSignUpLoading, selectConfirmSignUpUser } from '../redux/confirmSignupSelector';
import fevlogo from "../../../assets/fevlogo.png";
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
 const handleSubmit = async () => {
  await dispatch(confirm({
    email,
    confirmationCode: otp
  }));
};
useEffect(() => {
  if (resp?.success) {
    navigate("/");
  }
}, [resp, navigate]);
  return (

  <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-blue-500">
      <div className="w-1/2 p-8">
        <img src={fevlogo} alt="fev logo" className="w-32" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm ">
<ConfirmSignUpForm otp={otp} setOtp={setOtp} handleSubmit={handleSubmit} loading={loading}/>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSignup