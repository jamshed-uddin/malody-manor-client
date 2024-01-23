import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import axios from "axios";

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
    <div>
      {params.row.status === "denied" && (
        <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
          Feedback
        </button>
      )}
      <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
        Update
      </button>

      <button
        onClick={() => handleDeleteClass(params.row._id)}
        className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 "
      >
        Delete
      </button>
    </div>
  );
};

export default MyClassesActions;
