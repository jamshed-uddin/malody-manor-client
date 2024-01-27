import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import EventQrCode from "./EventQrCode";

const EventSignup = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [dataForQr, setDataForQr] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setEventFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log(JSON.stringify(eventFormData));
  console.log(dataForQr);
  const handleEventSignup = async (e) => {
    e.preventDefault();

    const eventForm = {
      ...eventFormData,
      eventName: "Open mic night",
      time: "Sunday 6.30pm",
    };

    try {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/eventSignup`, eventForm)
        .then((result) => {
          setLoading(false);
          setDataForQr(result.data);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const labelStyle = "block  ml-1 font-semibold mb-1";
  const inputStyle = `border border-gray-400 p-2 w-full rounded-xl focus:outline-none mb-2 ${
    theme === "black" && "bg-slate-900"
  }`;
  return (
    <div className="my-container">
      <div className=" space-y-4 mb-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold uppercase tracking-tight">
            Open mic night{" "}
          </h1>
          <p className="text-xl font-medium">
            Get ready to be inspired and uplifted at Open Mic Night. Your
            presence makes all the difference!
          </p>
        </div>
        {!dataForQr ? (
          <div>
            <h1 className="text-center text-xl font-semibold">SIGN UP</h1>
            <form
              onSubmit={handleEventSignup}
              className="lg:w-[40%]   mx-auto mt-3 mb-8"
            >
              <div className="lg:flex gap-3">
                <div className="flex-grow">
                  <label htmlFor="firstName" className={labelStyle}>
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    className={inputStyle}
                    value={eventFormData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex-grow">
                  <label htmlFor="lastName" className={labelStyle}>
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={eventFormData.lastName}
                    onChange={handleInputChange}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="email" className={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={eventFormData.email}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div className="flex-grow">
                <label htmlFor="address" className={labelStyle}>
                  Address
                </label>
                <textarea
                  type="text"
                  id="address"
                  placeholder="Address"
                  name="address"
                  value={eventFormData.address}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <button
                  disabled={loading}
                  type="submit"
                  className={`text-lg font-semibold px-4 py-1 rounded-lg ${
                    loading && "opacity-80"
                  } ${
                    theme === "black"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  Submit
                </button>
                {loading && (
                  <CircularProgress
                    size={25}
                    sx={
                      theme === "black"
                        ? { color: "white" }
                        : { color: "black" }
                    }
                  />
                )}
              </div>
            </form>
          </div>
        ) : (
          <EventQrCode data={dataForQr} />
        )}
      </div>
    </div>
  );
};

export default EventSignup;
