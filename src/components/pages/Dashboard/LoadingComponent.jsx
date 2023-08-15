import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default LoadingComponent;
