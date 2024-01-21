import React from "react";
import Title from "../../../shared/Title";

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
    <div className="py-8 md:py-14">
      <Title> Our Impact</Title>

      <div className="lg:flex lg:divide-x-4  my-12 ">
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
