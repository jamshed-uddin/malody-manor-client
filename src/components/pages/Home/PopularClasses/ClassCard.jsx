import {
  faCircleCheck,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useRole from "../../../../Hooks/useRole";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ singleClass }) => {
  const { user } = useContext(AuthContext);
  const [currentUser, role] = useRole();
  const navigate = useNavigate();

  // console.log(user);
  const seleted = () => toast("You have selected this class");
  const alreadySelected = () => toast("You have already selected this class");
  const alreadyEnrolled = () =>
    toast("You have already enrolled to this class");

  const handleBookmark = () => {
    if (!user) {
      return navigate("/login");
    }

    singleClass.userEmail = currentUser?.email;
    const { _id, ...newData } = singleClass;
    const newBookmarkedClass = { ...newData, classId: _id };
    console.log(newBookmarkedClass);

    fetch(`${import.meta.env.VITE_SERVER_URL}/addToSelected`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBookmarkedClass),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          seleted();
        }
        if (result.message === "already added") {
          alreadySelected();
        }
        if (result.message === "already enrolled") {
          alreadyEnrolled();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`shadow h-[400px] rounded-2xl overflow-hidden`}>
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
              role === "admin" ||
              role === "instructor" ||
              singleClass.available_seat === 0
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
            <p
              className={` ${
                singleClass.available_seat === 0 && "text-red-600"
              }`}
              title={
                singleClass.available_seat === 0
                  ? "No seat available"
                  : "Available seat"
              }
              aria-label={
                singleClass.available_seat === 0
                  ? "No seat available"
                  : "Available seat"
              }
            >
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
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default ClassCard;
