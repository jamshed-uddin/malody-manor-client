import React, { useEffect, useMemo, useState } from "react";
import UserActions from "./UserActions";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TableComponent from "../TableComponent";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useAdminData from "../../../../Hooks/useAdminData";
import ErrorElement from "../../../shared/ErrorElement";

const ManageUsers = () => {
  // const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const [axiosSecure] = useAxiosSecure();

  const {
    data: userData,
    isLoading: usersDataLoading,
    error: usersDataError,
    refetch: usersDataRefetch,
  } = useAdminData("/users");

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
      {
        field: "email",
        headerName: "User email",
        width: "220",
        sortable: false,
      },

      {
        field: "actions",
        headerName: "Change role",
        width: "300",
        type: "actions",
        renderCell: (params) => (
          <UserActions {...{ params, refetch: usersDataRefetch }}></UserActions>
        ),
      },
    ],
    []
  );

  if (usersDataError) {
    return <ErrorElement error={usersDataError} refetch={usersDataRefetch} />;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-manage users</title>
      </Helmet>
      {usersDataLoading ? (
        <LoadingComponent />
      ) : userData.length === 0 ? (
        <NoItemText text={"No users to show"} />
      ) : (
        <div>
          <h1 className="pb-5 text-2xl">All users</h1>
          <div>
            <TableComponent columns={columns} data={userData}></TableComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
