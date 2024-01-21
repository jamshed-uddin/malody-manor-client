import React, { useEffect, useState } from "react";
import InstructorsCard from "../Home/PopularInstructor/InstructorsCard";
import { Helmet } from "react-helmet";
import Title from "../../shared/Title";
import CardSkeleton from "../../shared/CardSkeleton";
import LoadingSkeleton from "../../shared/LoadingSkeleton";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        const instructors = data.filter(
          (instructor) => instructor.role === "instructor"
        );

        setInstructors(instructors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <div className="mt-14 py-8 md:w-3/4 px-3 mx-auto">
      <Helmet>
        <title>Melody Manor - Instructors</title>
      </Helmet>
      <div className="text-center">
        <Title>Instructors</Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {loading ? (
          <LoadingSkeleton type={"profile"} />
        ) : (
          instructors.map((instructor, index) => (
            <InstructorsCard
              key={index}
              instructor={instructor}
            ></InstructorsCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Instructors;
