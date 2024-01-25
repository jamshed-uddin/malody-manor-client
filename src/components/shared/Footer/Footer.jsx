import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <footer
        className={` ${
          theme === "black" ? "bg-slate-900 text-white" : "bg-slate-100"
        } p
        pt-4 rounded-ss-[30px] lg:rounded-ss-[50px] rounded-se-[30px] lg:rounded-se-[50px] rounded-es-none rounded-ee-none`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className=" text-xl font-semibold uppercase">Melody Manor</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className=" cursor-pointe">Home</a>
              </li>
              <li>
                <a className=" cursor-pointe">Classes</a>
              </li>
              <li>
                <a className=" cursor-pointe">Instructors</a>
              </li>
              <li>
                <a className=" cursor-pointe">Events</a>
              </li>
              <li>
                <a className=" cursor-pointe">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className=" text-xl font-semibold">Upcoming Events</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className=" cursor-pointe">Concert on August 15th</a>
              </li>
              <li>
                <a className=" cursor-pointe">Masterclass Series</a>
              </li>
              <li>
                <a className=" cursor-pointe">Open Mic Night</a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className=" text-xl font-semibold mb-4">Contact</h3>
            <p className=" cursor-pointer">123 Mayhem Street</p>
            <p className=" cursor-pointer">New York City, New York</p>
            <p className=" cursor-pointer">Phone: (123) 456-7890</p>
            <p className=" cursor-pointer">Email: info@melodymanor.com</p>
          </div>
          <div className="text-center">
            <h3 className=" text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex flex-col">
              <a className=" cursor-pointe">Facebook</a>
              <a className=" cursor-pointe">Twitter</a>
              <a className=" cursor-pointe">Instagram</a>
            </div>
          </div>
        </div>
        <p className=" cursor-pointer mt-2 text-center font-light text-sm">
          © 2023 Melody Manor. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
