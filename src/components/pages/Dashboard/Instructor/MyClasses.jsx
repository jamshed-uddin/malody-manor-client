import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import MyClassesActions from "./MyClassesActions";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../TableComponent";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [myClasses, setMyClasses] = useState([]);
  const [reload, setReload] = useState(false);

  const notify = () => toast("Class deleted!");

  useEffect(() => {
    fetch(`http://localhost:3000/instructorsClasses/${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMyClasses(result))
      .catch((error) => console.log(error));
  }, [user, reload]);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Photo",
        width: "60",
        renderCell: (params) => <Avatar src={params.row.image}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "class_name", headerName: "Class Name", width: "140" },
      { field: "instructor_name", headerName: "Instructor", width: "140" },
      { field: "price", headerName: "Price", width: "80" },
      {
        field: "available_seat",
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
        width: "250",
        renderCell: (params) => (
          <MyClassesActions {...{ params, setReload, notify }} />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <TableComponent columns={columns} data={myClasses} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyClasses;
