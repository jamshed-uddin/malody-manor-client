import React, { useEffect, useState } from "react";
import InstructorsCard from "../Home/PopularInstructor/InstructorsCard";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("users.json")
      .then((res) => res.json())
      .then((data) => {
        const instructors = data.filter(
          (instructor) => instructor.role === "instructor"
        );

        setInstructors(instructors);
      });
  }, []);
  return (
    <div className="h-screen py-8 w-3/4  mx-auto">
      <h1 className="text-3xl py-16">all instructors here</h1>
      <div className="grid lg:grid-cols-3">
        {instructors.map((instructor, index) => (
          <InstructorsCard
            key={index}
            instructor={instructor}
          ></InstructorsCard>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
