import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user || role === "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
