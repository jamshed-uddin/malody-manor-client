import React from "react";
import { Link } from "react-router-dom";

const SeeDetailBtn = ({ children, classId }) => {
  return <Link to={`/class/${classId}`}>{children}</Link>;
};

export default SeeDetailBtn;
