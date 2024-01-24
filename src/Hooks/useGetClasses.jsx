import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useGetClasses = () => {
  return useQuery(["classes"], async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/classes`
    );

    const popularClasses = result?.data
      .sort((classA, classB) => classB.enrolled - classA.enrolled)
      .slice(0, 6);

    return { classes: result.data, popularClasses };
  });
};

export default useGetClasses;
