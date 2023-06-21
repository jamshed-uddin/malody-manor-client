import React from "react";

const Button = ({ children }) => {
  return (
    <div className="relative ">
      <div className="">
        <button className="dark:text-white text-xl font-bold px-2 ">
          {children}
        </button>
      </div>
    </div>
  );
};

export default Button;
