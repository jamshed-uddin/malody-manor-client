import React from "react";

const NoItemText = ({ text }) => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <h1 className="text-2xl font-semibold">{text}</h1>
    </div>
  );
};

export default NoItemText;
