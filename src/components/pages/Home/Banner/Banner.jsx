import React, { useEffect, useState } from "react";

// Import Swiper React components
import bannerImage1 from "../../../../assets/BannerCarouselImages/piano.jpg";

import bannerImage2 from "../../../../assets/BannerCarouselImages/theatre.jpg";
import bannerImage3 from "../../../../assets/BannerCarouselImages/violin.jpg";

const Banner = () => {
  const [imageIndexToPreview, setImageIndexToPreview] = useState(0);

  console.log(imageIndexToPreview);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setImageIndexToPreview((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);

    return () => clearTimeout(timeId);
  }, [imageIndexToPreview]);

  return (
    <div className="">
      <div className="">
        <div className=" font-bold w-full mt-20 ">
          <h1 className="text-9xl  text-center font-semibold uppercase -tracking-[0.14rem]">
            MELODY <br /> MANOR
          </h1>
        </div>
        <div className="h-[30vh] lg:h-[calc(100vh-4rem)]  w-full overflow-hidden relative ">
          {[bannerImage1, bannerImage2, bannerImage3].map(
            (image, index, arr) => (
              <>
                <div className="absolute inset-0 ">
                  <img
                    className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
                      index === imageIndexToPreview
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    src={image}
                    alt=""
                  />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
                  <div className="flex items-center gap-2">
                    {arr.map((p, index) => (
                      <p
                        className={`transition-all duration-700 ${
                          imageIndexToPreview === index
                            ? "w-16 h-[5px] "
                            : "w-4 h-[5px] "
                        } bg-white rounded-lg`}
                      ></p>
                    ))}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
