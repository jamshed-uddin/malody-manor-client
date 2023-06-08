import React from "react";

const Button = ({ children }) => {
  return (
    <div className="relative ">
      <div className="">
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-2xl text-lg font-semibold  transition-all duration-500">
          {children}
        </button>
      </div>
    </div>
  );
};

export default Button;
