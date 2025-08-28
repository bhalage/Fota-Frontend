// src/containers/LoginPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import { loginUser } from "../services/authService";
import fevlogo from "../assets/fevlogo.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) navigate("/fleet");
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      email,
      password,
      orgId: "fev",
      connectedApp: { app: "FLEET", role: "admin" }
    }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-blue-500">
      <div className="w-1/2 p-8">
        <img src={fevlogo} alt="fev logo" className="w-32" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm ">
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
