import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";
import SubscribeToEmail from "../SubscribeToEmail";

import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";

const Home = () => {
  return (
    <div>
      <div className="my-container">
        <Banner></Banner>
        <PopularClasses></PopularClasses>
        <Achievments></Achievments>
        <PopularInstructor></PopularInstructor>
        <WhyUs></WhyUs>
        <UpcomingEvent />
        <SubscribeToEmail></SubscribeToEmail>
      </div>
    </div>
  );
};

export default Home;
