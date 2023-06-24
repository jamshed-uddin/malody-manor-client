import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    userLogin(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/4 mx-auto p-4 shadow">
        <h1 className="text-center text-2xl font-semibold my-3">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="border-b border-black block px-2 py-1 outline-none w-full"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="border-b border-black block px-2 py-1 outline-none w-full"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <p className="text-center">
            {" "}
            <button
              type="submit"
              className=" py-1 px-4 text-xl font-semibold rounded-lg shadow "
            >
              Login
            </button>
          </p>
        </form>
        <h1 className="mt-3">
          New to Melody Manor?
          <Link className="underline" to={"/register"}>
            Create an account.
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
