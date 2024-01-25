import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminData = (endPoint) => {
  const queryKey = [endPoint];
  const [axiosSecure] = useAxiosSecure();

  const fetchData = async () => {
    try {
      const result = await axiosSecure.get(`${endPoint}`);

      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return useQuery(queryKey, fetchData);
};

export default useAdminData;
