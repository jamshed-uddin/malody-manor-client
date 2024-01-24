import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import MyButton from "../../shared/MyButton";
import AddToSelected from "../../shared/AddToSelected";
import { ToastContainer, toast } from "react-toastify";
import useSingleClass from "../../../Hooks/useSingleClass";
import ErrorElement from "../../shared/ErrorElement";

const ClassDetail = () => {
  const { classId } = useParams();
  const toastHandler = (msg) => toast(msg);
  const {
    data: classDetail,
    isLoading: classDetailLoading,
    error: classDetailError,
    refetch: classDetailRefetch,
  } = useSingleClass(classId);

  if (classDetailError) {
    <ErrorElement
      error={classDetailError}
      refetch={classDetailRefetch}
    ></ErrorElement>;
  }

  if (classDetailLoading) {
    <div className="mt-20">Loading...</div>;
  }

  return (
    <div className="my-container py-10">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[70%]">
          {/* class info */}
          <div>
            <h2 className="text-4xl font-extrabold mb-3">
              {classDetail?.className}
            </h2>
            <p className="font-semibold text-lg leading-6 mb-1">
              {classDetail?.description}
            </p>
            <p className="text-sm">
              With{" "}
              <span className="font-semibold">
                {classDetail?.instructorName}
              </span>
            </p>
          </div>
          {/* price and buying options */}
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Price: ${classDetail?.price}
            </p>
            <div className="space-x-2">
              <AddToSelected
                singleClass={classDetail}
                toastHandler={toastHandler}
              >
                <MyButton>Add to selected</MyButton>
              </AddToSelected>

              <MyButton>Enroll now</MyButton>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] h-[35vh] lg:h-[40vh] order-first lg:order-last">
          <img
            className="object-cover h-full w-full rounded-xl"
            src={classDetail?.photoURL}
            alt={`Cover image of ${classDetail?.className}`}
          />
        </div>
      </div>
      <div></div>

      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default ClassDetail;
