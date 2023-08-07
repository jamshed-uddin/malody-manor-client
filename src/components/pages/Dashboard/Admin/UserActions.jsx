import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { reload } from "firebase/auth";
import React, { useState } from "react";

const UserActions = ({ params, setReload }) => {
  const [userRole, setUserRole] = useState(params.row.role);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveRoleHandler = (role, userId) => {
    setLoading(true);
    fetch(`http://localhost:3000/changeRole/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          setLoading(false);
          setSuccess(true);
        } else {
          setLoading(false);
        }
      });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);

    // setReload(prevReload => !prevReload);
  };

  return (
    <div className="space-x-3">
      <button
        onClick={() => setUserRole("admin")}
        className={`border-2 border-black rounded-lg px-3 py-1 ${
          userRole === "admin" ? "bg-black text-white" : ""
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => setUserRole("instructor")}
        className={`border-2 border-black rounded-lg px-3 py-1 ${
          userRole === "instructor" ? "bg-black text-white" : ""
        }`}
      >
        Instructor
      </button>
      <button
        onClick={() => saveRoleHandler(userRole, params.row._id)}
        className={`border-2  border-black rounded-lg px-3 py-1 relative ${
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
