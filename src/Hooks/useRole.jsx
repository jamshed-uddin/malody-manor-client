import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/${user?.email}`)
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user);
        setRole(user?.role);
      });
  }, [user]);

  return [currentUser, role];
};

export default useRole;
