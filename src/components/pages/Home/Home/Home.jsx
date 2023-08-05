import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularInstructor></PopularInstructor>
      <PopularClasses></PopularClasses>
      <Achievments></Achievments>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
