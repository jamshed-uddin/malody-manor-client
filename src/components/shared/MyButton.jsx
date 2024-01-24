import React from "react";

const MyButton = ({ children, clickFunction }) => {
  return (
    <button
      onClick={clickFunction}
      className=" text-lg font-semibold px-4 py-1 border-[1px] border-black rounded-lg"
    >
      {children}
    </button>
  );
};

export default MyButton;
