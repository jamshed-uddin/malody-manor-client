import { useQuery } from "@tanstack/react-query";

const useSingleClass = (classId) => {
  const { isLoading, data: singleClass = [] } = useQuery({
    queryKey: ["singleClass", classId],
    queryFn: async () => {
      const data = await fetch(`http://localhost:3000/singleClass/${classId}`);
      return data.json();
    },
  });

  return [singleClass];
};

export default useSingleClass;
