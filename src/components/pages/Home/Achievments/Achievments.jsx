import React from "react";

const impact = [
  {
    numbers: 1120,
    text: "Students enrolled",
  },
  {
    numbers: 19,
    text: "Instrumets taught",
  },
  {
    numbers: 30,
    text: "Committed,talented,inspiring,paid teaching artists",
  },

  {
    numbers: 140000,
    text: "Learning hours per year",
  },
];

const Achievments = () => {
  return (
    <div className="py-8 w-3/4 mx-auto">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-center">
          OUR IMPACT
        </h1>
      </div>
      <div className="lg:flex my-12 ">
        {impact.map((single, index) => (
          <div className=" text-center w-full space-y-2 mb-6 px-6" key={index}>
            <h1 className="text-5xl">
              <span className="text-5xl font-medium">{single.numbers}</span>+
            </h1>
            <p>{single.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievments;
