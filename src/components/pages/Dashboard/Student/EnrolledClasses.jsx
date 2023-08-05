import { useQuery } from "@tanstack/react-query";
import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import TableComponent from "../TableComponent";
import { Avatar } from "@mui/material";

const EnrolledClasses = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    refetch,
    data: enrolledClasses = [],
  } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    queryFn: async () => {
      const data = await fetch(
        `http://localhost:3000/enrolledClasses/${user?.email}`
      );
      return data.json();
    },
  });

  if (user) {
    refetch;
  }

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

  return (
    <div>
      <h1 className="pb-5 text-2xl">Enrolled classes</h1>
      <div>
        <TableComponent columns={columns} data={enrolledClasses} />
      </div>
    </div>
  );
};

export default EnrolledClasses;
