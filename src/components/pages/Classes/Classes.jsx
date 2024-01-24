import React, { useEffect, useState } from "react";
import ClassCard from "../Home/PopularClasses/ClassCard";
import { Helmet } from "react-helmet";
import CardSkeleton from "../../shared/CardSkeleton";
import Title from "../../shared/Title";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import useGetClasses from "../../../Hooks/useGetClasses";
import PopularClasses from "../Home/PopularClasses/PopularClasses";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: classData, isLoading: classDataLoading } = useGetClasses();

  console.log(classData);

  return (
    <div className="my-container py-10">
      <Helmet>
        <title>Melody Manor - Classes</title>
      </Helmet>
      <div className="text-center mb-4">
        <Title>Classes</Title>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {classDataLoading ? (
          <LoadingSkeleton type={"item"} />
        ) : (
          classData?.classes.map((singleclass) => (
            <ClassCard key={singleclass._id} singleClass={singleclass} />
          ))
        )}
      </div>
    </div>
  );
};

export default Classes;
