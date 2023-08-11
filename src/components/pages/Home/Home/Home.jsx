import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";
import SubscribeToEmail from "../SubscribeToEmail";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Melody Manor|Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="py-8 md:w-3/4 w-[85%] mx-auto">
        <PopularClasses></PopularClasses>
        <PopularInstructor></PopularInstructor>
        <Achievments></Achievments>
        <WhyUs></WhyUs>
        <SubscribeToEmail></SubscribeToEmail>
      </div>
    </div>
  );
};

export default Home;
