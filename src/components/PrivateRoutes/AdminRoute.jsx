import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";
import { AuthContext } from "../Provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    );
  }

  if (user || role === "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
