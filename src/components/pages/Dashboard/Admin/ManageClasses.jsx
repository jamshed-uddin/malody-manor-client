import React, { useMemo, useState } from "react";

import { Avatar } from "@mui/material";

import ManageClassActions from "./ManageClassActions";
import TableComponent from "../TableComponent";
import { Helmet } from "react-helmet";
import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useAdminData from "../../../../Hooks/useAdminData";
import ErrorElement from "../../../shared/ErrorElement";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

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
        field: "status",
        headerName: "Status",
        width: "150",
        type: "singleSelect",
        valueOptions: ["pending", "approved", "denied"],
        editable: true,
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
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
