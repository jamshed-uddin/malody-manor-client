import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SelectedClassesActions from "./ClassesActions";
import { AuthContext } from "../../../Provider/AuthProvider";
import ClassesActions from "./ClassesActions";
import { ToastContainer, toast } from "react-toastify";

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [reload, setReload] = useState(false);
  const notify = () => toast("Class romoved!");

  // remove from selected class handler---
  const removeClassHandler = (classId) => {
    fetch(`http://localhost:3000/removeSelectedClass/${classId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount) {
          notify();
          setReload(!reload);
        }
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  // console.log(currentUser);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/getSelectedClasses/${user?.email}`)
        .then((res) => res.json())
        .then((result) => {
          setSelectedClasses(result);
          // console.log(result);
        });
    }
  }, [user, reload]);

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

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: "250",
        renderCell: (params) => (
          <ClassesActions {...{ params, removeClassHandler }} />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "left", mt: 3, mb: 3 }}
          >
            Selected Classes
          </Typography>
          <DataGrid
            columns={columns}
            rows={selectedClasses}
            getRowId={(row) => row._id}
            // processRowUpdate={(params) => setRowId(params.id)}
            // onProcessRowUpdateError={(error) => console.log(error)}
          ></DataGrid>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SelectedClasses;
