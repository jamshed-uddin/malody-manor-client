import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="">
      <div className="">
        <div className=" font-bold w-full mt-20 ">
          <h1 className="-ml-2 text-8xl lg:text-[10rem] font-bold uppercase -tracking-[0.14rem]">
            MELODY
          </h1>
          <h1 className="text-end md:mr-16 text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter ">
            MANOR
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
