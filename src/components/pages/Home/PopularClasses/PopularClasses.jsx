import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../../../shared/MyButton";
import CardSkeleton from "../../../shared/CardSkeleton";
import Title from "../../../shared/Title";
import LoadingSkeleton from "../../../shared/LoadingSkeleton";

const PopularClasses = () => {
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
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-6">
      <Title>Popular classes</Title>

      <div className="grid grid-cols-2 md:grid-cols-3 my-2 gap-4">
        {loading ? (
          <LoadingSkeleton type={"item"} />
        ) : (
          classes?.map((singleClass, index) => (
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
