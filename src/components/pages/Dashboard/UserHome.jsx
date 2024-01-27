import React from "react";
import useRole from "../../../Hooks/useRole";
import { Avatar } from "@mui/material";

import LoadingComponent from "./LoadingComponent";
import ErrorElement from "../../shared/ErrorElement";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { currentUser, currentUserLoading, currentUserError } = useRole();

  if (currentUserError) {
    return <ErrorElement error={currentUserError} />;
  }

  if (currentUserLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-home</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row lg:items-end items-center mb-4">
        <div className="">
          <img
            className="w-48 rounded-full"
            src={
              currentUser?.photo
                ? currentUser?.photo
                : "https://i.ibb.co/PCJCS96/blank.jpg"
            }
            alt=""
          />
        </div>
        <div className="lg:mb-4 mt-4 lg:ml-12">
          <h1 className="text-3xl font-semibold ">{currentUser?.name}</h1>
          <p className="text-xl lg:text-left text-center">
            {currentUser?.role}
          </p>
        </div>
      </div>
      <hr />
      <div></div>
    </div>
  );
};

export default UserHome;
