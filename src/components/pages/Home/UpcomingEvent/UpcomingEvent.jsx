import React, { useContext } from "react";

import microPhone1 from "../../../../assets/Microphone/microphone.jpg";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const UpcomingEvent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`lg:flex items-center gap-4 my-16 ${
        theme === "black" && "bg-slate-900"
      } p-6 rounded-lg shadow-md`}
    >
      <div className="lg:w-[35%] h-[40vh] ">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={microPhone1}
          alt=""
        />
      </div>
      <div className=" space-y-2 mt-4 lg:mt-0">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">
            Upcoming event
          </h1>
          <h1 className="text-4xl font-semibold uppercase tracking-tight">
            Open mic night{" "}
          </h1>
          <p className="text-xl font-medium">
            Get ready to be inspired and uplifted at Open Mic Night. Your
            presence makes all the difference!
          </p>
        </div>
        <div>
          <p className=" font-medium leading-5 mb-2">
            Next sunday - 6:30pm <br /> At Malody Manor Theatre
          </p>
          <Link to={"/event-signup"}>
            <button
              className={`text-lg font-semibold px-4 py-1 rounded-lg ${
                theme === "black"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
