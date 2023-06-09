import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularInstructor></PopularInstructor>
      <PopularClasses></PopularClasses>
    </div>
  );
};

export default Home;
