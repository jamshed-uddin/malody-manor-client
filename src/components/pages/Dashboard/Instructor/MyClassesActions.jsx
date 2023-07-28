import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MyClassesActions = () => {
  return (
    <div>
      <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
        Update
      </button>
      <button className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 ">
        Delete
      </button>
    </div>
  );
};

export default MyClassesActions;
