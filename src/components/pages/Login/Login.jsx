import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { userLogin, loading, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await userLogin(data.email, data.password)
      .then((result) => {
        if (result) {
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  };

  const googleSignInHandler = async () => {
    await signInWithGoogle()
      .then((result) => {
        if (result.user) {
          const newUser = {
            name: result.user.displayName,
            photo: result.user.photoURL,
            email: result.user.email,
            role: "student",
          };

          axios
            .post(`${import.meta.env.VITE_SERVER_URL}/users`, newUser)
            .then(() => {
              navigate(from, { replace: true });
            })
            .catch(() => navigate("/"));
        }
      })
      .catch(() => navigate("/"));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" p-6 shadow-md rounded-xl">
        <h1 className="text-center text-2xl font-semibold my-3">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />
          <div className="flex">
            <input
              onClick={() => setShowPassword(!showPassword)}
              type="checkbox"
            />
            <label className="text-sm ml-2" htmlFor="showPassword">
              Show Password
            </label>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <p className="text-center">
            {" "}
            <button
              type="submit"
              className={` py-1 px-4 text-xl font-semibold rounded-lg shadow ${
                loading && "btn-disabled bg-transparent opacity-90"
              }`}
            >
              Login
            </button>
          </p>
        </form>
        {/* google sign in  */}
        <div className="mt-4 text-center py-3">
          <h1 className="text-xl font-semibold">OR</h1>
          <h1 className=" text-lg">Continue with</h1>

          <button
            onClick={googleSignInHandler}
            className=" border border-black px-3 w-1/2 mt-2 rounded-lg mx-auto font-semibold"
          >
            GOOGLE
          </button>
        </div>
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
