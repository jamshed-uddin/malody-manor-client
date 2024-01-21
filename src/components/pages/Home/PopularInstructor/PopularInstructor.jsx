import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyButton from "../../../shared/MyButton";
import Title from "../../../shared/Title";
import CardSkeleton from "../../../shared/CardSkeleton";
import LoadingSkeleton from "../../../shared/LoadingSkeleton";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setInstructors(data);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="my-6">
      <Title>Popular Instructors</Title>
      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {loading ? (
          <LoadingSkeleton type={"profile"} />
        ) : (
          instructors
            .slice(0, 6)
            .map((instructor, index) => (
              <InstructorsCard
                instructor={instructor}
                key={index}
              ></InstructorsCard>
            ))
        )}
      </div>
      <div className="text-end text-xl mt-4 font-semibold">
        <Link to={"/instructors"}>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default PopularInstructor;
