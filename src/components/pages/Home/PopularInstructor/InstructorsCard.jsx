import React from "react";

const InstructorsCard = ({ instructor }) => {
  return (
    <div className=" rounded-xl cursor-pointer py-6 space-y-5 ">
      <div>
        <img
          src={instructor?.photo}
          className="w-48 h-48 rounded-full mx-auto hover:scale-105 transition-all duration-500"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-center font-semibold text-xl">
          {instructor?.name}
        </h1>
      </div>
    </div>
  );
};

export default InstructorsCard;
