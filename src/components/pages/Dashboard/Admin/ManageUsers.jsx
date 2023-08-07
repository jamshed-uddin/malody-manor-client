import React, { useEffect, useMemo, useState } from "react";
import UserActions from "./UserActions";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TableComponent from "../TableComponent";

const ManageUsers = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
  const token = localStorage.getItem("access-token");

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
      <h1 className="pb-5 text-2xl">All users</h1>
      <div>
        <TableComponent columns={columns} data={userData}></TableComponent>
      </div>
    </div>
  );
};

export default ManageUsers;
