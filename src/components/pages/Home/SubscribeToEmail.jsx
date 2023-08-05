import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SubscribeToEmail = () => {
  return (
    <div className="py-14 w-3/4 mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Stay Up-to-date with Melody Manor
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-5  my-10 items-center space-y-9 lg:space-y-0">
        <div className="lg:col-span-3">
          <div className="flex relative">
            <input
              placeholder="Your Email"
              className="border border-black focus:outline-none rounded-lg py-2 pl-4 w-3/4 z-10"
              type="email"
            />
            <button className="text-lg font-semibold hover:bg-black hover:text-white transition-all duration-500 pl-6 pr-3 rounded-lg absolute top-0 bottom-0 -right-3 lg:right-10 ">
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
