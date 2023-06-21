import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";
import Button from "../../../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  console.log(classes);

  return (
    <div className="py-8 w-3/4 mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Popular Classes
      </h1>

      <div className="grid lg:grid-cols-3 my-8">
        {classes.map((singleClass, index) => (
          <ClassCard key={index} singleClass={singleClass} />
        ))}
      </div>
      <Link to={"/classes"} className="text-end mt-4">
        <Button>
          See All <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    </div>
  );
};

export default PopularClasses;
