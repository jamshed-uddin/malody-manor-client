import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import axios from "axios";
import { set } from "react-hook-form";
import { CircularProgress } from "@mui/material";

const AddToSelected = ({ children, singleClass, toastHandler }) => {
  const { user } = useContext(AuthContext);
  const { currentUser, role } = useRole();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.dir(navigate);

  const handleBookmark = async () => {
    if (!user) {
      return navigate("/login", { state: location });
    }
    const { _id, ...newData } = singleClass;
    const newBookmarkedClass = {
      ...newData,
      classId: _id,
      userEmail: currentUser?.email,
    };

    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/addToSelected`,
        newBookmarkedClass
      )
      .then((result) => {
        setLoading(false);
        if (result.data.insertedId) {
          toastHandler("You have selected this class");
        }
        if (result.data.message === "already added") {
          toastHandler("You have already selected this class");
        }
        if (result.data.message === "already enrolled") {
          toastHandler(" You have already enrolled to this class");
        }
      })
      .catch((error) => {
        setLoading(false);
        toastHandler("Something went wrong!");
      });
  };

  return (
    <div className="inline relative" onClick={handleBookmark}>
      {children}
      <span className="absolute left-1/2 top-1/2 -translate-y-1/2">
        {loading && <CircularProgress size={30} sx={{ color: "black" }} />}
      </span>
    </div>
  );
};

export default AddToSelected;
