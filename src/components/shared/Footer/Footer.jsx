import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-100 py-4 rounded-ss-[50px] rounded-se-[50px] rounded-es-none rounded-ee-none">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">
              Melody Manor
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Classes
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Instructors
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Events
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">
              Upcoming Events
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Concert on August 15th
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Masterclass Series
                </a>
              </li>
              <li>
                <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                  Open Mic Night
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">Contact Us</h3>
            <p className="text-gray-600 cursor-pointer">123 Mayhem Street</p>
            <p className="text-gray-600 cursor-pointer">
              New York City, New York
            </p>
            <p className="text-gray-600 cursor-pointer">
              Phone: (123) 456-7890
            </p>
            <p className="text-gray-600 cursor-pointer">
              Email: info@melodymanor.com
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex flex-col">
              <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                Facebook
              </a>
              <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                Twitter
              </a>
              <a className="text-gray-600 cursor-pointer hover:text-gray-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <p className="text-gray-600 cursor-pointer my-2 text-center">
          © 2023 Melody Manor. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
