import React, { useEffect, useMemo, useState } from "react";

import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ManageClassActions from "./ManageClassActions";
import TableComponent from "../TableComponent";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/all-classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

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
          <ManageClassActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <div>
      <h1 className="pb-5 text-2xl">All classes</h1>
      <div>
        <TableComponent columns={columns} data={classes}></TableComponent>
      </div>
    </div>
  );
};

export default ManageClasses;
