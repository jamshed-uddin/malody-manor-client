import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
const UserActions = ({ params, refetch }) => {
  const [userRole, setUserRole] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveRoleHandler = () => {
    try {
      if (!userRole) return;

      setLoading(true);
      axios
        .patch(
          `${import.meta.env.VITE_SERVER_URL}/changeRole/${params.row._id}`,
          {
            role: userRole,
          }
        )
        .then((result) => {
          if (result.data.modifiedCount) {
            setLoading(false);
            setSuccess(true);
            refetch();
          } else {
            refetch();
            setLoading(false);
          }
        });
    } catch (error) {
      refetch();
      setLoading(false);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div className="space-x-3">
      <div class="relative inline-block">
        <select
          onChange={handleRoleChange}
          className="appearance-none border border-gray-400 px-8 py-2 rounded-md focus:outline-none focus:border-transparent"
        >
          <option value="">{params.row.role}</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="instructor">Instructor</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12l-4-4-4 4h8z" />
          </svg>
        </div>
      </div>
      <button
        type="button"
        disabled={!userRole || params.row.role === userRole}
        onClick={saveRoleHandler}
        className={`${
          !userRole || params.row.role === userRole
            ? "opacity-50 cursor-not-allowed"
            : ""
        } border-2  border-black rounded-lg px-3 py-1 relative ${
          success && "bg-green-500 border-green-500 text-white"
        }`}
      >
        {success ? (
          <span className="px-[6px]">Role saved</span>
        ) : (
          <span>
            {" "}
            <FontAwesomeIcon icon={faFloppyDisk} /> Save Role{" "}
          </span>
        )}
        <span>
          {loading && (
            <CircularProgress
              size={20}
              sx={{
                position: "absolute",
                left: "40%",
              }}
            />
          )}
        </span>
      </button>
    </div>
  );
};

export default UserActions;
