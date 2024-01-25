import { useContext } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    data: currentUser,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = useQuery(
    ["currentUser"],
    async () => {
      try {
        const result = await axiosSecure.get(
          `${import.meta.env.VITE_SERVER_URL}/singleUser/${user?.email}`
        );

        return result.data;
      } catch (error) {
        throw new Error();
      }
    },
    { enabled: !!user }
  );

  return {
    currentUser,
    currentUserLoading,
    currentUserError,
    role: currentUser?.role,
  };
};

export default useRole;
