import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // data submit for create a new class
  const onSubmit = (data) => {
    data.price = parseInt(data.price);
    data.available_seat = parseInt(data.available_seat);
    data.enrolled = 0;
    data.status = "pending";

    // --------------
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/addNewClass`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            reset();
          }, 1500);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  // styles for input and label
  const labelStyle = "block text-gray-700 font-bold ml-1";
  const inputStyle =
    "border border-gray-400 p-2 w-full rounded-xl focus:outline-none";
  // --------

  return (
    <div>
      <Helmet>
        <title>Dashboard-add classes</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold ml-5">Add a class</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="lg:flex gap-4">
          <div className="mb-2 flex-grow">
            <label htmlFor="className" className={labelStyle}>
              Class name
            </label>
            <input
              type="text"
              id="className"
              name="className"
              className={inputStyle}
              {...register("class_name")}
              required
            />
            {errors.class_name && (
              <p className="text-base text-red-500">
                {errors.class_name.message}
              </p>
            )}
          </div>

          <div className="mb-2 flex-grow">
            <label htmlFor="imageUrl" className={labelStyle}>
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className={inputStyle}
              {...register("image")}
              required
            />
          </div>
        </div>

        <div className="lg:flex gap-4">
          <div className="mb-2 flex-grow">
            <label htmlFor="instructorName" className={labelStyle}>
              Instructor name
            </label>
            <input
              type="text"
              id="instructorName"
              name="instructorName"
              className={inputStyle}
              defaultValue={user?.displayName}
              {...register("instructor_name")}
              required
            />
          </div>

          <div className="mb-2 flex-grow">
            <label htmlFor="instructorEmail" className={labelStyle}>
              Instructor email
            </label>
            <input
              type="email"
              id="instructorEmail"
              name="instructorEmail"
              className={inputStyle}
              defaultValue={user?.email}
              readOnly
              {...register("instructor_email")}
            />
          </div>
        </div>

        <div className="lg:flex gap-4">
          <div className="mb-2 flex-grow">
            <label htmlFor="price" className={labelStyle}>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className={inputStyle}
              {...register("price")}
              required
            />
          </div>

          <div className="mb-2 flex-grow">
            <label htmlFor="availableSeats" className={labelStyle}>
              Available seats
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              className={inputStyle}
              {...register("available_seat")}
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold "
          >
            Description <span className="font-extralight">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            className=" border border-gray-400 focus:outline-none p-2 w-full rounded-xl"
            {...register("description")}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`text-xl font-semibold border-2 border-black px-3 py-1 rounded-xl w-1/2 relative ${
              success && "bg-green-400 border-green-400"
            }`}
          >
            {success ? (
              <span className="px-[6px]">Added the class</span>
            ) : (
              <span>Add class</span>
            )}
            <span>
              {loading && (
                <CircularProgress
                  size={20}
                  sx={{
                    position: "absolute",
                    left: "50%",

                    right: "50%",
                  }}
                />
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
