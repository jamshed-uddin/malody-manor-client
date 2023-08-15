import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

const SubscribeToEmail = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Stay Up-to-date with Melody Manor
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-5  my-10 items-center space-y-9 lg:space-y-0">
        <div className="lg:col-span-3">
          <div className="flex  w-full">
            <input
              placeholder="Your Email"
              className={`focus:outline-none rounded-s-lg rounded-e-none py-3 pl-4 w-3/4 ${
                theme === "black"
                  ? "border-0 bg-slate-900"
                  : "border border-black "
              }`}
              type="email"
            />
            <button
              className={` ${
                theme === "black"
                  ? "bg-white text-black"
                  : "bg-black text-white "
              } px-3 rounded-e-lg`}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-center leading-3">
          <p className="text-blue-500">
            <FontAwesomeIcon icon={faCheck} />
          </p>
          <p className="text-xl font-light">New event alert</p>
        </div>
        <div className=" text-center leading-3">
          <p className="text-blue-500">
            <FontAwesomeIcon icon={faCheck} />
          </p>
          <p className="text-xl font-light">Special offers</p>
        </div>
      </div>
    </div>
  );
};

export default SubscribeToEmail;
