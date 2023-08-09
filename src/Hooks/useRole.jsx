import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    if (!user?.email) return;
    setIsRoleLoading(true);
    fetch(`http://localhost:3000/singleUser/${user?.email}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        if (userData?.email) {
          setIsRoleLoading(false);
          setCurrentUser(userData);
          setRole(userData?.role);
        }
      })
      .catch((error) => console.log(error));
  }, [user]);

  return [currentUser, role, isRoleLoading];
};

export default useRole;
