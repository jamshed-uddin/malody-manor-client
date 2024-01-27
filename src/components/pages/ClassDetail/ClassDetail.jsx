import React from "react";
import { Link, useParams } from "react-router-dom";
import MyButton from "../../shared/MyButton";
import AddToSelected from "../../shared/AddToSelected";
import { ToastContainer, toast } from "react-toastify";
import useSingleClass from "../../../Hooks/useSingleClass";
import ErrorElement from "../../shared/ErrorElement";
import DetailSkeleton from "../../shared/DetailSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import useRole from "../../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

const ClassDetail = () => {
  const { classId } = useParams();
  const toastHandler = (msg) => toast(msg);
  const { _, role } = useRole();
  const {
    data: classDetail,
    isLoading: classDetailLoading,
    error: classDetailError,
    refetch: classDetailRefetch,
  } = useSingleClass(classId);

  if (classDetailError) {
    return (
      <ErrorElement
        error={classDetailError}
        refetch={classDetailRefetch}
      ></ErrorElement>
    );
  }

  if (classDetailLoading) {
    return <DetailSkeleton />;
  }

  return (
    <div className="my-container pt-3 lg:pt-10 pb-10">
      <Helmet>
        <meta name="description" content={classDetail?.description} />
        <meta property="og:image" content={classDetail?.photoURL} />
        <title>{classDetail?.className} - Melody Manor</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row gap-3">
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
            <div className="flex space-x-4">
              <p
                className={`text-xl font-semibold ${
                  classDetail.availableSeats === 0 && "text-red-600"
                }`}
                aria-label={
                  classDetail.availableSeats === 0
                    ? "No seat available"
                    : "Available seat"
                }
              >
                Available seats{" "}
                <span className="text-2xl">{classDetail?.availableSeats}</span>
              </p>
              <p
                className="text-xl font-semibold"
                title="Enrolled students"
                aria-label="Enrolled students"
              >
                Enrolled{" "}
                <span className="text-2xl ">{classDetail?.enrolled}</span>
              </p>
            </div>
            <p className="text-xl font-semibold">
              Price: $<span className="text-2xl">{classDetail?.price}</span>
            </p>
            <div className="space-x-2 mt-2">
              <div
                className={`inline ${
                  role === "admin" ||
                  role === "instructor" ||
                  classDetail.availableSeats === 0
                    ? "btn-disabled bg-transparent"
                    : ""
                }`}
              >
                <AddToSelected
                  singleClass={classDetail}
                  toastHandler={toastHandler}
                >
                  <MyButton>Add to selected</MyButton>
                </AddToSelected>
              </div>
              <div
                className={`inline ${
                  role === "admin" ||
                  role === "instructor" ||
                  classDetail.availableSeats === 0
                    ? "btn-disabled bg-transparent"
                    : ""
                }`}
              >
                <Link to={`/dashboard/payment/${classDetail._id}`}>
                  <MyButton>Enroll now</MyButton>
                </Link>
              </div>
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
      {/* lessons */}
      <div className="mt-5">
        <h3 className="text-2xl font-bold">Lessons</h3>
        <div className="mt-1 space-y-2">
          {classDetail?.lessons.map((lesson, index) => (
            <p className="text-lg" key={index}>
              <FontAwesomeIcon className="opacity-80" icon={faFileLines} />{" "}
              {lesson}
            </p>
          ))}
        </div>
      </div>

      <ToastContainer hideProgressBar={true} autoClose={2500} />
    </div>
  );
};

export default ClassDetail;
