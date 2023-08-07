import { useQuery } from "@tanstack/react-query";

const useSingleSelectedClass = (classId) => {
  const { isLoading, data: singleSelectedClass = [] } = useQuery({
    queryKey: ["singleSelectedClass", classId],
    queryFn: async () => {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/getSingleSelectedClass/${classId}`
      );
      return data.json();
    },
  });

  return [isLoading, singleSelectedClass];
};

export default useSingleSelectedClass;
