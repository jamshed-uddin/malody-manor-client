import React from "react";
import Banner from "../Banner/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Achievments from "../Achievments/Achievments";
import WhyUs from "../WhyUs/WhyUs";
import SubscribeToEmail from "../SubscribeToEmail";

import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta property="og:title" content="Melody Manor" />
        <meta
          property="og:description"
          content="We unveil the melodic mysteries."
        />
        <meta
          property="og:image"
          content="../../../../assets/piano-thumbnail.jpg"
        />
        <title>Melody Manor</title>
      </Helmet>
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
