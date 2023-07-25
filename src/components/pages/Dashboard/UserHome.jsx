import React from "react";
import useRole from "../../../Hooks/useRole";

const UserHome = () => {
  const [currentUser] = useRole();

  return (
    <div className="flex flex-col lg:flex-row lg:items-end items-center ">
      <div>
        <img
          className="w-48 rounded-full"
          src={"https://i.ibb.co/PCJCS96/blank.jpg"}
          alt=""
        />
      </div>
      <div className="lg:mb-4 mt-4 lg:ml-12">
        <h1 className="text-3xl font-semibold ">{currentUser?.name}</h1>
        <p className="text-xl lg:text-left text-center">{currentUser?.role}</p>
      </div>
      <div className="lg:ml-auto lg:mr-10 lg:mt-0 mt-4 lg:mb-5">
        <h1 className="font-semibold border-2 border-black rounded-xl px-3 cursor-pointer w-fit ">
          Update profile
        </h1>
      </div>
    </div>
  );
};

export default UserHome;
