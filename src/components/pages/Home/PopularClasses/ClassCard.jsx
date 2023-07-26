import {
  faCircleCheck,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useRole from "../../../../Hooks/useRole";

const ClassCard = ({ singleClass }) => {
  const [currentUser, role] = useRole();

  const handleBookmark = (userEmail, classId) => {
    fetch(`http://localhost:3000/selectedClasses/${userEmail}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ classId }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div className="shadow h-[400px] rounded-2xl overflow-hidden">
      <div className=" h-1/2 overflow-hidden">
        <img
          className="rounded-2xl hover:scale-105 transition-all duration-500 "
          src={singleClass?.image}
          alt=""
        />
      </div>
      <div className="p-4 flex flex-col h-1/2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{singleClass?.class_name}</h1>
          <button
            onClick={() => handleBookmark(currentUser?.email, singleClass?._id)}
            className={`cursor-pointer text-2xl ${
              role === "admin" || role === "instructor"
                ? "btn-disabled bg-transparent"
                : ""
            }`}
            title="Bookmark class"
            aria-label="Bookmark class"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div>
          <h1 className="py-1">
            With{" "}
            <span className="font-semibold">
              {singleClass?.instructor_name}
            </span>{" "}
          </h1>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <h1>
            $ <span className="text-3xl">{singleClass?.price}</span>
          </h1>
          <div className="flex space-x-4">
            <p title="Available seat" aria-label="Available seat">
              <FontAwesomeIcon icon={faFileLines} />{" "}
              <span className="text-3xl">{singleClass?.available_seat}</span>
            </p>
            <p title="Enrolled students" aria-label="Enrolled students">
              <FontAwesomeIcon icon={faCircleCheck} />{" "}
              <span className="text-3xl">{singleClass?.enrolled}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
