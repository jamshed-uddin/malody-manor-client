import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import SeeDetailBtn from "../../../shared/SeeDetailBtn";

const MyClassesActions = ({ params, refetch, notify }) => {
  const { theme } = useContext(ThemeContext);

  const style =
    theme === "black"
      ? {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "#000",
          border: "2px solid #000",
          boxShadow: 10,
          borderRadius: 3,
          p: 4,
        }
      : {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 10,
          borderRadius: 3,
          p: 4,
        };

  // delete class function-------------
  const handleDeleteClass = async (classId) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_SERVER_URL}/deleteClass/${classId}`)
        .then((result) => {
          if (result.data.deletedCount) {
            notify("Classes removed");
            refetch();
          }
        });
    } catch (error) {
      notify("Something went wrong!");
    }
  };
  return (
    <div className="space-x-2">
      {params.row.status === "denied" && (
        <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
          Feedback
        </button>
      )}
      <Link
        to={`/dashboard/editClass/${params?.row._id}`}
        className="border-2 border-black px-2 rounded-lg text-lg"
      >
        Edit
      </Link>
      <div className="inline border-2 border-black rounded-lg px-3 w-fit text-lg">
        <SeeDetailBtn classId={params.row._id}>Detail</SeeDetailBtn>
      </div>

      <button
        onClick={() => handleDeleteClass(params.row._id)}
        className="  px-2 rounded-lg text-lg bg-red-500 text-white  "
      >
        Delete
      </button>
    </div>
  );
};

export default MyClassesActions;
