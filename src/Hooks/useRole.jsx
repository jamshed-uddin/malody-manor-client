import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${import.meta.env.VITE_SERVER_URL}/singleUser/${user?.email}`)
      .then((res) => res.json())
      .then((result) => {
        setCurrentUser(result);
        setRole(result?.role);
      });
  }, [user]);

  return [currentUser, role];
};

export default useRole;
