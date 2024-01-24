import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../shared/Title";
import LoadingSkeleton from "../../../shared/LoadingSkeleton";
import useGetClasses from "../../../../Hooks/useGetClasses";

const PopularClasses = () => {
  const { data: classData, isLoading: classDataLoading } = useGetClasses();

  console.log(classData);

  return (
    <div className="my-6">
      <Title>Popular classes</Title>

      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {classDataLoading ? (
          <LoadingSkeleton type={"item"} />
        ) : (
          classData?.popularClasses.map((singleClass, index) => (
            <ClassCard key={index} singleClass={singleClass} />
          ))
        )}
      </div>
      <div className="text-end text-xl mt-4 font-semibold">
        <Link to={"/classes"}>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default PopularClasses;
