import React, { useEffect, useState } from "react";
import InstructorsCard from "../Home/PopularInstructor/InstructorsCard";
import { Helmet } from "react-helmet";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        const instructors = data.filter(
          (instructor) => instructor.role === "instructor"
        );

        setInstructors(instructors);
      });
  }, []);
  return (
    <div className="mt-16 py-8 md:w-3/4 w-[85%] mx-auto">
      <Helmet>
        <title>Melody Manor|Classes</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold ">Instructors</h1>
      <div className="grid lg:grid-cols-3 gap-6">
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
