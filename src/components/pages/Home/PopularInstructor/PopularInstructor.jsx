import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Title from "../../../shared/Title";

import LoadingSkeleton from "../../../shared/LoadingSkeleton";
import useGetInstructors from "../../../../Hooks/useGetInstructors";

const PopularInstructor = () => {
  const { data: popularInstructors, isLoading } = useGetInstructors();

  return (
    <div className="my-6">
      <Title>Popular Instructors</Title>
      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {isLoading ? (
          <LoadingSkeleton type={"profile"} />
        ) : (
          popularInstructors
            ?.slice(0, 6)
            .map((instructor) => (
              <InstructorsCard
                instructor={instructor}
                key={instructor._id}
              ></InstructorsCard>
            ))
        )}
      </div>
    </div>
  );
};

export default PopularInstructor;
