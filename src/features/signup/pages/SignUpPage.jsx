import React, { useEffect, useState } from 'react'

import SignUpForm from '../components/SignUpForm'
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../services/signupService';
import { selectSignUpLoading } from '../redux/signupSelector';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const loading = useSelector(selectSignUpLoading)
  const url = import.meta.env.URL
  useEffect(() => {
    console.log(url);
  }, []);

  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleSubmit = async(e) => {
    // e.preventDefault();

    // Match password and confirm password before calling API
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
      const result=await dispatch(signUpUser({
        name: user.name,
        email: user.email,
        password: user.password,
        orgId: "fev",
        connectedApp: { app: "FLEET", role: "admin" }
      }))
       
      console.log(result.message);
       if (result.success) {
      // Navigate to confirmsignup with email as query param
      navigate(`/confirmsignup?email=${encodeURIComponent(user.email)}`);
    }
     else {
    alert(result.message || "Signup failed!");
  }
    
  };

  return (
    <div className='min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-blue-500'>
      <SignUpForm user={user} setUser={setUser} handleSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default SignUpPage