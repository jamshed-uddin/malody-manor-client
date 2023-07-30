import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ClassesActions = ({ params, removeClassHandler }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
        Checkout
      </button>
      <button
        onClick={() => removeClassHandler(params.row._id, user?.email)}
        className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 "
      >
        <FontAwesomeIcon icon={faXmark} /> Remove
      </button>
    </div>
  );
};

export default ClassesActions;