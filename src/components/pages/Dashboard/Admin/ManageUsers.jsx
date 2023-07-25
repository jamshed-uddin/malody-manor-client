import React, { useEffect, useMemo, useState } from "react";
import UserActions from "./UserActions";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ManageUsers = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => setUserData(users));
  }, [reload]);

  const columns = useMemo(
    () => [
      {
        field: "photo",
        headerName: "Photo",
        width: "70",
        renderCell: (params) => <Avatar src={params.row.photo}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "name", headerName: "Name", width: "180" },
      { field: "email", headerName: "User email", width: "220" },
      {
        field: "role",
        headerName: "Role",
        width: "130",
        type: "singleSelect",
        valueOptions: ["pending", "approved", "denied"],
        editable: true,
      },

      {
        field: "actions",
        headerName: "Change role",
        width: "300",
        type: "actions",
        renderCell: (params) => (
          <UserActions {...{ params, setReload }}></UserActions>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Box sx={{ height: 500, width: "100%" }}>
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Users
        </Typography>
        <DataGrid
          columns={columns}
          rows={userData}
          getRowId={(row) => row._id}
          // processRowUpdate={(params) => setRowId(params.id)}
          // onProcessRowUpdateError={(error) => console.log(error)}
        ></DataGrid>
      </Box>
    </div>
  );
};

export default ManageUsers;
