import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserNamePhoto } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setError("");

    const newUser = {
      name: data.name,
      photo: data.photo,
      email: data.email,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      role: "student",
    };

    console.log(newUser);

    registerUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          updateUserNamePhoto(data.name, data.photo).then(() => {
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  navigate("/");
                }
              });
          });
        }

        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("An account already exists with this email");
        }
      });
  };

  const password = watch("password");

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-6 shadow-lg rounded-xl">
        <h1 className="text-center text-2xl font-semibold my-3">Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />

          <input
            {...register("photo")}
            type="text"
            placeholder="Photo URL"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email*"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <div className="flex space-x-2">
            <select
              className="border border-gray-400 p-2  rounded-xl focus:outline-none flex-grow"
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
              className="border border-gray-400 p-2 rounded-xl focus:outline-none flex-grow"
            />
          </div>

          <input
            {...register("address")}
            type="text"
            placeholder="Address"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />

          <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/i,
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            className="border border-gray-400 p-2 w-full rounded-xl focus:outline-none"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password should be at least 6 characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Password should contain at least one uppercase letter, one special
              character, and one digit
            </p>
          )}

          <input
            {...register("confirmPassword", {
              validate: (value) => value === password,
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password*"
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
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          <p className="text-red-500 text-sm">{error}</p>

          <p className="text-center">
            {" "}
            <button
              type="submit"
              className="text-xl font-semibold  py-1 px-4 rounded-lg shadow  "
            >
              Sign up
            </button>
          </p>
        </form>
        <h1 className="mt-3">
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
