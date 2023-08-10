import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState([]);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    // if (!user?.email) return;

    if (!loading) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/singleUser/${user?.email}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          if (userData?.email) {
            setCurrentUser(userData);
            setRole(userData?.role);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
  const memoizedData = useMemo(() => [currentUser, role], [currentUser, role]);
  return memoizedData;
};

export default useRole;
