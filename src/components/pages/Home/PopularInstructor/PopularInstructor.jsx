import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";
import Button from "../../../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PopularInstructor = () => {
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
    <div className="py-8 w-3/4 mx-auto">
      <h1 className="text-4xl font-bold text-center">Popular Instructors</h1>
      <div className="grid lg:grid-cols-3">
        {instructors.slice(0, 6).map((instructor, index) => (
          <InstructorsCard
            instructor={instructor}
            key={index}
          ></InstructorsCard>
        ))}
      </div>
      <Link to={"/instructors"} className="text-end mt-4">
        <Button>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    </div>
  );
};

export default PopularInstructor;
