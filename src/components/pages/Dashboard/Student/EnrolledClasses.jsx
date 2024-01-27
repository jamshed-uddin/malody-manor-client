import React, { useContext, useMemo } from "react";
import TableComponent from "../TableComponent";
import { Avatar } from "@mui/material";

import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useStudentData from "../../../../Hooks/useStudentData";
import ErrorElement from "../../../shared/ErrorElement";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import SeeDetailBtn from "../../../shared/SeeDetailBtn";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
  const { theme } = useContext(ThemeContext);

  const {
    data: enrolledClasses,
    isLoading: enrolledClassesLoading,
    error: enrolledClassesError,
    refetch: enrolledClassesRefetch,
  } = useStudentData("/enrolledClasses");

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Photo",
        width: "90",
        renderCell: (params) => <Avatar src={params.row.photoURL}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "className", headerName: "Class Name", width: "150" },
      { field: "instructorName", headerName: "Instructor", width: "170" },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: "250",
        renderCell: (params) => (
          <p
            className={`w-fit text-lg px-4 py-1 border-2 rounded-lg ${
              theme === "black" ? "border-white" : "border-black"
            }`}
          >
            <SeeDetailBtn classId={params.row._id}>Detail</SeeDetailBtn>
          </p>
        ),
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
