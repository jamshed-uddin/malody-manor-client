import React from "react";

const WhyUs = () => {
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        Why Choose Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-6 text-center  my-8 ">
        <div className=" p-6 rounded-lg shadow-md lg:col-span-3">
          <h1 className="text-lg font-semibold ">FREE INSTRUMENT</h1>
          <p className=" text-gray-800 mt-4">
            We provide high-quality instruments at no cost, empowering you to
            explore your musical talents without financial barriers. Discover
            the true essence of music in our classes as you unleash your
            creativity with ease.
          </p>
        </div>
        <div className=" p-6 rounded-lg shadow-md lg:col-span-2">
          <h1 className="text-lg font-semibold ">STUDIO RECITALS</h1>
          <p className=" text-gray-800 mt-4">
            We have recitals in May and December, and performance opportunities
            throughout the year. Recitals in 2020-2021 took place virtually!
          </p>
        </div>
        <div className=" p-6 rounded-lg shadow-md lg:col-span-2">
          <h1 className="text-lg font-semibold ">PERSONAL INSTRUCTION</h1>
          <p className=" text-gray-800 mt-4">
            At AIM, our students are not just numbers. We pride ourselves on
            giving attention to each student's needs. Our individualized study
            plans are tailored to meet each student's goals.
          </p>
        </div>
        <div className=" p-6 rounded-lg shadow-md lg:col-span-3">
          <h1 className="text-lg font-semibold ">PERFORMANCE EVENTS</h1>
          <p className=" text-gray-800 mt-4">
            Our students participate in competitive and non-competitive events
            throughout the year! In 2020, these events were virtual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
