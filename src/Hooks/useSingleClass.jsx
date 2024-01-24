import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleClass = (classId) => {
  return useQuery({
    queryKey: ["singleClass", classId],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/singleClass/${classId}`
      );
      return result.data;
    },
  });
};

export default useSingleClass;
