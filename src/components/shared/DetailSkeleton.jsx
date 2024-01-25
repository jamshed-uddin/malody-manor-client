import React from "react";

const DetailSkeleton = () => {
  return (
    <div className="my-container py-10">
      <div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[70%]">
            {/* class info */}
            <div className="space-y-3">
              <h2 className="h-10 w-1/2 bg-gray-200 rounded-xl"></h2>
              <p className="h-5 w-full bg-gray-200 rounded-lg"></p>
              <p className="h-5 w-full bg-gray-200 rounded-lg"></p>
            </div>
            {/* price and buying options */}
            <div className="mt-8 space-y-3">
              <p className="h-7 w-full bg-gray-200 rounded-lg"></p>
              <div className="flex gap-3 w-1/2">
                {" "}
                <p className="h-10 w-full bg-gray-200 rounded-lg"></p>
                <p className="h-10 w-full bg-gray-200 rounded-lg"></p>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] h-[35vh] lg:h-[40vh] order-first lg:order-last">
            <div className="h-full w-full rounded-xl bg-gray-200 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
