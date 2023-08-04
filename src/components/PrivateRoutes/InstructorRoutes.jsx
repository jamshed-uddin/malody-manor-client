import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    );
  }

  if (user || role === "instructor") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
