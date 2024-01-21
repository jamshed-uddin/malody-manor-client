import { useQuery } from "@tanstack/react-query";
import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import TableComponent from "../TableComponent";
import { Avatar } from "@mui/material";
import { Helmet } from "react-helmet";
import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useStudentData from "../../../../Hooks/useStudentData";
import ErrorElement from "../../../shared/ErrorElement";

const EnrolledClasses = () => {
  const {
    data: enrolledClasses,
    isLoading: enrolledClassesLoading,
    error: enrolledClassesError,
    refetch: enrolledClassesRefetch,
  } = useStudentData("/enrolledClasses");

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
        width: "220",
      },
    ],
    []
  );

  if (enrolledClassesError) {
    return (
      <ErrorElement
        error={enrolledClassesError}
        refetch={enrolledClassesRefetch}
      />
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-enrolled classes</title>
      </Helmet>
      {enrolledClassesLoading ? (
        <LoadingComponent />
      ) : enrolledClasses?.length === 0 ? (
        <NoItemText text={"No enrolled classes"} />
      ) : (
        <div>
          <h1 className="pb-5 text-2xl">Enrolled classes</h1>
          <div>
            <TableComponent columns={columns} data={enrolledClasses || []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledClasses;
