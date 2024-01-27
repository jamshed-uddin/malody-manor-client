import { Avatar } from "@mui/material";
import React, { useMemo } from "react";

import ClassesActions from "./ClassesActions";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../TableComponent";

import LoadingComponent from "../LoadingComponent";
import NoItemText from "../NoItemText";
import useStudentData from "../../../../Hooks/useStudentData";
import axios from "axios";
import ErrorElement from "../../../shared/ErrorElement";
import { Helmet } from "react-helmet-async";

const SelectedClasses = () => {
  const notify = () => toast("Class romoved!");

  const {
    data: selectedClasses,
    isLoading: selectedClassesLoading,
    error: selectedClassesError,
    refetch: selectedClassesRefetch,
  } = useStudentData("/getSelectedClasses");

  // remove from selected class handler---
  const removeClassHandler = async (classId) => {
    try {
      axios
        .delete(
          `${import.meta.env.VITE_SERVER_URL}/removeSelectedClass/${classId}`
        )
        .then((result) => {
          if (result.data.deletedCount) {
            selectedClassesRefetch();
            notify();
          }
        });
    } catch (error) {}
  };

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Photo",
        width: "90",
        renderCell: (params) => <Avatar src={params.row.image}></Avatar>,
        sortable: false,
        editable: false,
      },
      { field: "className", headerName: "Class Name", width: "150" },
      { field: "instructorName", headerName: "Instructor", width: "170" },
      {
        field: "availableSeats",
        headerName: "Available seats",
        width: "200",
      },
      {
        field: "price",
        headerName: "Price($)",
        width: "80",
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

  if (selectedClassesError) {
    return (
      <ErrorElement
        error={selectedClassesError}
        refetch={selectedClassesRefetch}
      />
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard - selected classes</title>
      </Helmet>

      {selectedClassesLoading ? (
        <LoadingComponent />
      ) : selectedClasses?.length === 0 ? (
        <NoItemText text={"No selected classes"} />
      ) : (
        <div>
          <h1 className="pb-5 text-2xl">Selected classes</h1>
          <div>
            <TableComponent columns={columns} data={selectedClasses || []} />
          </div>
        </div>
      )}

      <ToastContainer hideProgressBar={true} autoClose={2500} />
    </div>
  );
};

export default SelectedClasses;
