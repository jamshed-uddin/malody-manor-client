import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";
import SubscribeToEmail from "../SubscribeToEmail";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <Achievments></Achievments>
      <WhyUs></WhyUs>
      <SubscribeToEmail></SubscribeToEmail>
    </div>
  );
};

export default Home;
