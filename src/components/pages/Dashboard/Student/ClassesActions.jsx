import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useSingleClass from "../../../../Hooks/useSingleClass";

const ClassesActions = ({ params, removeClassHandler }) => {
  const [singleClass] = useSingleClass(params.row.classId);

  return (
    <div>
      <p
        className="inline"
        title={
          singleClass?.available_seat === 0
            ? "No available seat"
            : "Proceed checkout"
        }
      >
        <button
          className={`border-2 border-black px-2 rounded-lg text-lg mr-3 ${
            singleClass?.available_seat === 0 && "btn-disabled bg-transparent"
          }`}
        >
          <Link to={`/dashboard/payment/${params.row.classId}`}>Checkout</Link>
        </button>
      </p>
      <button
        onClick={() => removeClassHandler(params.row.classId)}
        className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 "
      >
        <FontAwesomeIcon icon={faXmark} /> Remove
      </button>
    </div>
  );
};

export default ClassesActions;
