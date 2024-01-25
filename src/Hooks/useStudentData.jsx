import { useContext } from "react";

import { AuthContext } from "../components/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStudentData = (endPoint) => {
  const { user } = useContext(AuthContext);
  const queryKey = [endPoint];
  const [axiosSecure] = useAxiosSecure();

  const fetchData = async () => {
    try {
      const result = await axiosSecure.get(`${endPoint}/${user?.email}`);

      return result.data;
    } catch (error) {
      return null;
    }
  };

  return useQuery(queryKey, fetchData, { enabled: !!user });
};

export default useStudentData;
