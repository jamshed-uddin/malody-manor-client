import React from "react";

const ClassCard = ({ singleClass }) => {
  console.log(singleClass);
  return (
    <div>
      <h1>{singleClass.class_name}</h1>
    </div>
  );
};

export default ClassCard;
