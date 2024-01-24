import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import useSingleClass from "../../../../Hooks/useSingleClass";

const ClassesActions = ({ params, removeClassHandler }) => {
  const { data: singleClass } = useSingleClass(params.row?.classId);

  return (
    <div>
      <p
        className="inline"
        title={singleClass?.availableSeats ? "Proceed checkout" : "Out of seat"}
      >
        <button
          className={`border-2 border-black px-2 rounded-lg text-lg mr-3 ${
            singleClass?.availableSeats === 0 && "btn-disabled bg-transparent"
          }`}
        >
          <Link to={`/dashboard/payment/${params.row?._id}`}>
            {singleClass?.availableSeats ? (
              "Checkout"
            ) : (
              <span className="text-[15px] text-red-500">Out of seat</span>
            )}
          </Link>
        </button>
      </p>
      <button
        onClick={() => removeClassHandler(params.row?._id)}
        className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 "
      >
        <FontAwesomeIcon icon={faXmark} /> Remove
      </button>
    </div>
  );
};

export default ClassesActions;
