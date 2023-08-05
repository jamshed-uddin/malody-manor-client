import React from "react";

const Footer = () => {
  return (
    <>
      <footer class="bg-gray-100 py-4">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <h3 class="text-gray-800 text-xl font-semibold">Contact Us</h3>
            <p class="text-gray-600">123 Music Street</p>
            <p class="text-gray-600">City, State ZIP</p>
            <p class="text-gray-600">Phone: (123) 456-7890</p>
            <p class="text-gray-600">Email: info@yourmusicschool.com</p>
          </div>
          <div class="text-center">
            <h3 class="text-gray-800 text-xl font-semibold">Quick Links</h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  Events
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-gray-800">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div class="text-center">
            <h3 class="text-gray-800 text-xl font-semibold">Follow Us</h3>
            <div class="mt-4 space-x-4">
              <a href="#" class="text-gray-600 hover:text-gray-800">
                <i class="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-800">
                <i class="fab fa-twitter-square text-2xl"></i>
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-800">
                <i class="fab fa-instagram-square text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
