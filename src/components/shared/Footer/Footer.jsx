import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
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
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Concert on August 15th
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Masterclass Series
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Open Mic Night
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">Contact Us</h3>
            <p className="text-gray-600">123 Music Street</p>
            <p className="text-gray-600">City, State ZIP</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
            <p className="text-gray-600">Email: info@yourmusicschool.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex flex-col">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <p class="text-gray-600 my-2 text-center">
          © 2023 Melody Manor. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
