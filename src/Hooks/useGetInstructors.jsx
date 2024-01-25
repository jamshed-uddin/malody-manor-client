import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useGetInstructors = () => {
  return useQuery(["instructors"], async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/popularInstructors`
      );
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });
};

export default useGetInstructors;
