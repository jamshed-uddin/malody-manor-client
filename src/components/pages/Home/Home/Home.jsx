import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";
import SubscribeToEmail from "../SubscribeToEmail";
import { Helmet } from "react-helmet";
import AddClass from "../../Dashboard/Instructor/AddClass";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Melody Manor</title>
      </Helmet>

      <div className=" md:w-[90%] w-[97%] mx-auto">
        <Banner></Banner>
        <PopularClasses></PopularClasses>
        <PopularInstructor></PopularInstructor>
        <Achievments></Achievments>
        <AddClass />
        <WhyUs></WhyUs>
        <SubscribeToEmail></SubscribeToEmail>
      </div>
    </div>
  );
};

export default Home;
