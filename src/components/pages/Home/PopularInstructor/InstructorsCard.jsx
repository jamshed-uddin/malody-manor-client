import React from "react";

const InstructorsCard = ({ instructor }) => {
  console.log(instructor);
  return (
    <div className=" rounded-xl cursor-pointer py-6 space-y-5 ">
      <div>
        <img
          src={instructor?.photo_url}
          className="w-40 h-40 rounded-full mx-auto hover:scale-105 transition-all duration-500"
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
