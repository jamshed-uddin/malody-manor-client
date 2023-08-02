import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/singleUser/${user?.email}`)
      .then((res) => res.json())
      .then((userData) => {
        setCurrentUser(userData);
        setRole(userData?.role);
      })
      .catch((error) => console.log(error));
  }, [user]);

  return [currentUser, role];
};

export default useRole;
