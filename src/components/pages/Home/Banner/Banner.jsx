import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../../../shared/MyButton";

const Banner = () => {
  return (
    <div className="h-screen  flex items-center">
      {/* <h1 className="text-center">hello</h1> */}
      <Swiper
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        // loop={true}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-[calc(100vh-65px)] flex items-center  lg:px-16 px-8">
            <div className=" font-bold w-full">
              <h1 className="py-8 text-6xl lg:text-8xl uppercase leading-tight transition-all duration-500 ">
                {" "}
                <span className="">Ignite your</span>{" "}
                <span className=" tracking-[0.1em]">potential</span> through{" "}
                <span className="block tracking-[0.3em] lg:tracking-[0.3em] lg:hover:tracking-[0.4em]  transition-all duration-500 w-fit">
                  melodies
                </span>
              </h1>

              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[calc(100vh-65px)] flex items-center  lg:px-16 px-8">
            <div className=" font-bold ">
              <h1 className="py-8 text-6xl lg:text-8xl uppercase leading-tight transition-all duration-500 ">
                In <span className="ml-8 tracking-[0.2em]">music</span>
                <br /> we find solace and{" "}
                <span className="lg:tracking-[0.3em]">inspiration</span>.
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[calc(100vh-65px)] flex items-center  lg:px-16 px-8">
            <div className=" font-bold w-full">
              <h1 className="py-8 text-[3.50rem] lg:text-8xl uppercase leading-tight transition-all duration-500 ">
                In a world of <br /> sound, let your melody shine.
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
