import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Oops, something went wrong!
        </h1>
        <p className="text-lg mb-6">
          It looks like there was an error. Please try again later.
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Try:</h2>
          <ul className="list-disc pl-6">
            <li>
              Double-check the URL and make sure you're on the right page.
            </li>
            <li>Ensure you have a stable internet connection.</li>
            <li>Refresh the page and try again.</li>

            {/* Add more checklist items as needed */}
          </ul>
        </div>
        <Link to="/" className="px-4 py-2 font-semibold">
          Back to Home <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
