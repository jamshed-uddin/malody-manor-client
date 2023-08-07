import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import ClassesActions from "./ClassesActions";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../TableComponent";

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [reload, setReload] = useState(false);
  const notify = () => toast("Class romoved!");

  // remove from selected class handler---
  const removeClassHandler = (classId) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/removeSelectedClass/${classId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount) {
          setReload(!reload);
          notify();
        }
      })
      .catch((error) => console.log(error));
  };
  // fetching data from different data collection for selected class,not all class data
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/getSelectedClasses/${user?.email}`
    )
      .then((res) => res.json())
      .then((result) => {
        setSelectedClasses(result);
      });
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
        field: "available_seat",
        headerName: "Seats",
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

  return (
    <div>
      <h1 className="pb-5 text-2xl">Selected classes</h1>
      <div>
        <TableComponent columns={columns} data={selectedClasses} />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default SelectedClasses;
