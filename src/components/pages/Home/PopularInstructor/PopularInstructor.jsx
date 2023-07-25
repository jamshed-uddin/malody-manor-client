import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyButton from "../../../shared/MyButton";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/instructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);

  return (
    <div className="py-8 w-3/4 mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Popular Instructors
      </h1>
      <div className="grid lg:grid-cols-3 gap-3 my-8">
        {instructors.slice(0, 6).map((instructor, index) => (
          <InstructorsCard
            instructor={instructor}
            key={index}
          ></InstructorsCard>
        ))}
      </div>
      <Link to={"/instructors"} className="text-end mt-4">
        <MyButton>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </MyButton>
      </Link>
    </div>
  );
};

export default PopularInstructor;
