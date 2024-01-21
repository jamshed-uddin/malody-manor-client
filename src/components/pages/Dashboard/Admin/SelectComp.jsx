import React from "react";

const SelectComp = ({ currentOption, setValue, options }) => {
  return (
    <div className="relative inline-block">
      <select
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none border border-gray-400 px-8 py-2 rounded-md focus:outline-none focus:border-transparent"
      >
        <option value="">
          {currentOption?.charAt(0).toUpperCase() + currentOption?.slice(1)}
        </option>
        {options?.map((option, index) => (
          <option value={option} key={index}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-4-4-4 4h8z" />
        </svg>
      </div>
    </div>
  );
};

export default SelectComp;
