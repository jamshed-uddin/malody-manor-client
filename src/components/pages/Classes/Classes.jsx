import React, { useEffect, useState } from "react";
import ClassCard from "../Home/PopularClasses/ClassCard";
import { Helmet } from "react-helmet";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/classes`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <div className="py-20 w-3/4 mx-auto">
      <Helmet>
        <title>Melody Manor|Classes</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold ">Classes</h1>

      <div className="grid lg:grid-cols-3 my-8 gap-4">
        {classes.map((singleclass) => (
          <ClassCard key={singleclass._id} singleClass={singleclass} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
