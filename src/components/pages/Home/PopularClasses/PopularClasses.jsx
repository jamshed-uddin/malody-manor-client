import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../../../shared/MyButton";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/classes`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <div className="py-8 w-3/4 mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Popular Classes
      </h1>

      <div className="grid lg:grid-cols-3 my-8 gap-4">
        {classes.map((singleClass, index) => (
          <ClassCard key={index} singleClass={singleClass} />
        ))}
      </div>
      <Link to={"/classes"} className="text-end mt-4">
        <MyButton>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </MyButton>
      </Link>
    </div>
  );
};

export default PopularClasses;
