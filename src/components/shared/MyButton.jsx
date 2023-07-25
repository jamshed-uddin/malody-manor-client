import React from "react";

const MyButton = ({ children, clickFunction }) => {
  return (
    <div className="relative ">
      <div className="">
        <button
          onClick={clickFunction}
          className="dark:text-white text-xl font-bold px-2 "
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default MyButton;