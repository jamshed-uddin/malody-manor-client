import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DashboardDataProvider = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  //   instructors  --
  const {
    data: instructorClassesData,
    refetch: instructorClassesDataRefetch,
    isLoading: instructorClassesDataLoading,
    error: instructorClassesDataError,
  } = useQuery("instructorClasses", async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/instructorsClasses/${user?.email}`
    );
    if (!result) {
      throw new Error();
    }
    return result.data;
  });

  //   students ---

  return <div></div>;
};

export default DashboardDataProvider;
