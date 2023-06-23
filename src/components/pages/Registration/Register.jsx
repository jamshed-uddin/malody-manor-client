import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/4 mx-auto p-4 shadow">
        <h1 className="text-center text-2xl font-semibold my-3">Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />

          <input
            {...register("photo")}
            type="text"
            placeholder="Photo URL"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email*"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <select
            className="border-b border-black block outline-none w-full px-2 py-1"
            {...register("gender")}
          >
            <option value="female">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />

          <input
            {...register("address")}
            type="text"
            placeholder="Address"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />

          <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/i,
            })}
            type="password"
            placeholder="Password*"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password should be at least 6 characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password should contain at least one uppercase letter, one special
              character, and one digit
            </p>
          )}

          <input
            {...register("confirmPassword", {
              validate: (value) => value === password,
            })}
            type="password"
            placeholder="Confirm Password*"
            className="border-b border-black block outline-none w-full px-2 py-1"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Passwords do not match</p>
          )}

          <p className="text-center">
            {" "}
            <button
              type="submit"
              className="text-xl font-semibold  py-2 px-4  "
            >
              Sign up
            </button>
          </p>
        </form>
        <h1>
          Already have an account?
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
