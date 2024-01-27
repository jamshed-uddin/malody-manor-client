import React, { useMemo } from "react";
import UserActions from "./UserActions";
import { Avatar } from "@mui/material";
import TableComponent from "../TableComponent";

import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useAdminData from "../../../../Hooks/useAdminData";
import ErrorElement from "../../../shared/ErrorElement";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
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
