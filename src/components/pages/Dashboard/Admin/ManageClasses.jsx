import React, { useMemo, useState } from "react";

import { Avatar } from "@mui/material";

import ManageClassActions from "./ManageClassActions";
import TableComponent from "../TableComponent";

import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useAdminData from "../../../../Hooks/useAdminData";
import ErrorElement from "../../../shared/ErrorElement";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const {
    data: classesData,
    isLoading: classesDataLoading,
    error: classesDataError,
    refetch: classesDataRefetch,
  } = useAdminData("/all-classes");

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Photo",
        width: "90",
        renderCell: (params) => <Avatar src={params.row.image}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "class_name", headerName: "Class Name", width: "150" },
      { field: "instructor_name", headerName: "Instructor", width: "170" },
      {
        field: "instructor_email",
        headerName: "Instructor Email",
        width: "200",
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: "300",
        renderCell: (params) => (
          <ManageClassActions {...{ params, refetch: classesDataRefetch }} />
        ),
      },
    ],
    []
  );

  if (classesDataError) {
    return (
      <ErrorElement error={classesDataError} refetch={classesDataRefetch} />
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-manage classes</title>
      </Helmet>
      {classesDataLoading ? (
        <LoadingComponent />
      ) : classesData.length === 0 ? (
        <NoItemText text={"No classes to show"} />
      ) : (
        <div>
          <h1 className="pb-5 text-2xl">All classes</h1>
          <div>
            <TableComponent
              columns={columns}
              data={classesData}
            ></TableComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
