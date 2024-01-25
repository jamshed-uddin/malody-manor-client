import React, { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

const MyButton = ({ children, clickFunction }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      onClick={clickFunction}
      className={`text-lg font-semibold px-4 py-1 border-[1px] rounded-lg ${
        theme === "black" ? "border-white" : "border-black"
      }`}
    >
      {children}
    </button>
  );
};

export default MyButton;
