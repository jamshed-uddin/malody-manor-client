import { useQuery } from "@tanstack/react-query";

const useSingleClass = (classId) => {
  const { isLoading, data: singleClass = [] } = useQuery({
    queryKey: ["singleClass", classId],
    queryFn: async () => {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/singleClass/${classId}`
      );
      return data.json();
    },
  });

  return [singleClass, isLoading];
};

export default useSingleClass;
