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
          <div className="h-screen text-center lg:text-left flex  items-center justify-center lg:px-16 px-8">
            <div className=" font-bold lg:w-1/2">
              <h1 className="py-8 text-3xl lg:text-5xl leading-[55px] uppercase">
                {" "}
                From Novice to Virtuoso: Ignite Your Passion for Music
                Instruments and Let Your Talent Soar!
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
            <div className="hidden lg:block w-1/2 ">
              <h1 className="w-3/4 ml-auto font-semibold mb-40">
                Music is the universal language that transcends barriers, speaks
                to the depths of our souls, and orchestrates the symphony of
                human emotions
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen text-center lg:text-left flex  items-center justify-center lg:px-16 px-8">
            <div className=" font-bold ">
              <h1 className="py-8 text-3xl lg:text-5xl leading-[55px] uppercase">
                {" "}
                Embrace the Symphony Within: Embark on a Transformative Musical
                Expedition at Our Camp!
              </h1>
              <MyButton>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </MyButton>
            </div>
            <div className="hidden lg:block">
              <h1>
                Within the realm of music, time stands still, as we embark on a
                timeless journey where emotions flow, memories unfold, and the
                beauty of sound becomes an eternal companion.
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen text-center lg:text-left flex  items-center justify-center lg:px-16 px-8">
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
            <div className="hidden lg:block">
              <h1>
                Music is the invisible thread that connects us all, vibrating
                through our beings, reminding us of our shared humanity and the
                power of harmony.
              </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
