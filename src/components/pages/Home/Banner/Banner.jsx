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
import {
  faArrowRight,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";
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
          <div className="h-screen flex justify-center items-center text-center lg:px-16 px-8">
            <div className=" font-bold">
              <h1 className="py-8 text-3xl lg:text-5xl leading-[55px] uppercase">
                {" "}
                Ignite Your Passion for Music Instruments and Let Your Talent
                Soar!
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
            <div className=""></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen flex justify-center items-center text-center lg:px-16 px-8">
            <div className=" font-bold ">
              <h1 className="py-8 text-3xl lg:text-5xl leading-[55px] uppercase">
                {" "}
                Embark on a Transformative Musical Expedition at Our Camp!
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
            <div className=""></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen flex justify-center items-center text-center lg:px-16 px-8">
            <div className=" font-bold ">
              <h1 className="py-8 text-3xl lg:text-5xl leading-[55px] uppercase">
                {" "}
                Unleash Your Musical Talent at our Instrument Learning School -
                Where Melodies Come Alive!
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
            <div className=""></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
