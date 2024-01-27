import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import MyClassesActions from "./MyClassesActions";
import { Avatar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../TableComponent";

import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import ErrorElement from "../../../shared/ErrorElement";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  const notify = (msg) => toast(msg);

  const {
    data: instructorClassesData,
    refetch: instructorClassesDataRefetch,
    isLoading: instructorClassesDataLoading,
    error: instructorClassesDataError,
  } = useQuery(["instructorClasses"], async () => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/instructorsClasses/jamsheduddin03@gmail.com`
      );
      console.log(result);
      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Photo",
        width: "60",
        renderCell: (params) => <Avatar src={params.row.photoURL}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "className", headerName: "Class Name", width: "140" },
      { field: "instructorName", headerName: "Instructor", width: "140" },
      { field: "price", headerName: "Price", width: "80" },
      {
        field: "availableSeats",
        headerName: "Available seat",
        width: "120",
      },
      {
        field: "enrolled",
        headerName: "Enrolled",
        width: "100",
      },
      {
        field: "status",
        headerName: "Status",
        width: "100",
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: "300",
        renderCell: (params) => (
          <MyClassesActions
            {...{ params, refetch: instructorClassesDataRefetch, notify }}
          />
        ),
      },
    ],
    []
  );

  if (instructorClassesDataError) {
    return (
      <ErrorElement
        error={instructorClassesDataError}
        refetch={instructorClassesDataRefetch}
      />
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-my classes</title>
      </Helmet>
      {instructorClassesDataLoading ? (
        <LoadingComponent />
      ) : instructorClassesData?.length === 0 ? (
        <NoItemText text={"No classes added"} />
      ) : (
        <div>
          <h1 className="pb-4 text-2xl">My classes</h1>
          <div>
            <TableComponent
              columns={columns}
              data={instructorClassesData || []}
            />
          </div>
        </div>
      )}
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default MyClasses;
