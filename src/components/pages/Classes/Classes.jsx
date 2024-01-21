import React, { useEffect, useState } from "react";
import ClassCard from "../Home/PopularClasses/ClassCard";
import { Helmet } from "react-helmet";
import CardSkeleton from "../../shared/CardSkeleton";
import Title from "../../shared/Title";
import LoadingSkeleton from "../../shared/LoadingSkeleton";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/classes`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setClasses(data);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mt-14 py-8 md:w-3/4 px-3 mx-auto">
      <Helmet>
        <title>Melody Manor - Classes</title>
      </Helmet>
      <div className="text-center">
        <Title>Classes</Title>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {loading ? (
          <LoadingSkeleton type={"item"} />
        ) : (
          classes.map((singleclass) => (
            <ClassCard key={singleclass._id} singleClass={singleclass} />
          ))
        )}
      </div>
    </div>
  );
};

export default Classes;
