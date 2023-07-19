import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const user = JSON.parse(localStorage?.getItem("user"));
  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
