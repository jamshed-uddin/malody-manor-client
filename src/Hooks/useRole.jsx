import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure(`/singleUser/${user?.email}`).then((data) => {
      setCurrentUser(data.data);
      setRole(data.data?.role);
    });
  }, [axiosSecure]);

  return [currentUser, role];
};

export default useRole;
