import {
  faCircleCheck,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Provider/ThemeProvider";

import AddToSelected from "../../../shared/AddToSelected";

const ClassCard = ({ singleClass }) => {
  const { theme } = useContext(ThemeContext);

  const toastHandler = (msg) => toast(msg);

  return (
    <Link to={`/class/${singleClass?._id}`}>
      <div
        className={`shadow h-[18rem] md:h-[22rem] rounded-2xl overflow-hidden flex flex-col ${
          theme === "black" && "bg-slate-900"
        }`}
      >
        <div className=" h-1/2 overflow-hidden">
          <img
            className="h-full w-full rounded-2xl hover:scale-105 transition-all duration-500  object-cover"
            src={singleClass?.photoURL}
            alt=""
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between">
            <h1 className="text-xl md:text-2xl font-semibold">
              {singleClass?.className}
            </h1>
            <div
              className={` text-2xl `}
              title="Bookmark class"
              aria-label="Bookmark class"
            >
              <AddToSelected
                singleClass={singleClass}
                toastHandler={toastHandler}
              >
                <FontAwesomeIcon icon={faPlus} />
              </AddToSelected>
            </div>
          </div>
          <div>
            <h1 className=" py-0 md:py-1  text-sm md:text-base">
              With{" "}
              <span className="font-semibold md:text-lg">
                {singleClass?.instructorName}
              </span>{" "}
            </h1>
          </div>
          <div className="mt-auto flex justify-between items-center">
            <h1>
              ${" "}
              <span className="text-xl md:text-3xl">{singleClass?.price}</span>
            </h1>
            <div className="flex space-x-4">
              <p
                className={` ${
                  singleClass.availableSeats === 0 && "text-red-600"
                }`}
                title={
                  singleClass.availableSeats === 0
                    ? "No seat available"
                    : "Available seat"
                }
                aria-label={
                  singleClass.availableSeats === 0
                    ? "No seat available"
                    : "Available seat"
                }
              >
                <FontAwesomeIcon icon={faFileLines} />{" "}
                <span className="text-xl md:text-3xl">
                  {singleClass?.availableSeats}
                </span>
              </p>
              <p title="Enrolled students" aria-label="Enrolled students">
                <FontAwesomeIcon icon={faCircleCheck} />{" "}
                <span className="text-xl md:text-3xl">
                  {singleClass?.enrolled}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2500} />
      </div>
    </Link>
  );
};

export default ClassCard;
