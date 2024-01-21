import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import SelectComp from "./SelectComp";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const UserActions = ({ params, refetch }) => {
  const [userRole, setUserRole] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);
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
    }, 3000);
  };

  console.log(userRole);
  return (
    <div className="space-x-3">
      <SelectComp
        currentOption={params.row.role}
        options={["student", "instructor", "admin"]}
        setValue={setUserRole}
      />
      <button
        type="button"
        disabled={!userRole || params.row.role === userRole}
        onClick={saveRoleHandler}
        className={`border-[1px] ${
          !userRole || params.row.role === userRole
            ? "opacity-50 cursor-not-allowed"
            : ""
        } ${
          theme === "black" ? "  border-white" : "  border-black"
        } rounded-lg px-3 py-1 relative ${
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
