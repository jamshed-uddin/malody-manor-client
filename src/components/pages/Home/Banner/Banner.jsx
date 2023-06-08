import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";
import Button from "../../../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  return (
    <div className="h-screen flex items-center">
      {/* <h1 className="text-center">hello</h1> */}
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-screen flex items-center justify-center">
            <div className="text-4xl text-center font-bold lg:w-3/4">
              <h1 className="py-8">
                {" "}
                From Novice to Virtuoso: Ignite Your Passion for Music
                Instruments and Let Your Talent Soar!
              </h1>
              <Button>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen flex items-center justify-center">
            <div className="text-4xl text-center font-bold lg:w-3/4 ">
              <h1 className="py-8">
                Embrace the Symphony Within: Embark on a Transformative Musical
                Expedition at Our Camp!
              </h1>
              <Button>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen flex items-center justify-center">
            <div className="text-4xl text-center font-bold lg:w-3/4">
              <h1 className="py-8">
                Unlock the Harmonic Universe: Journey into the Depths of Music
                Instrument Mastery!
              </h1>
              <Button>
                Explore Classes <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
