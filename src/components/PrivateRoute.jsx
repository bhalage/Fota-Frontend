// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const idToken = localStorage.getItem("idToken");

  if (!idToken) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children; // render protected content
};

export default PrivateRoute;
