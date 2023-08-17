import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";
import useRole from "../../../../Hooks/useRole";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SideNav = ({ navOpenHandler }) => {
  const { theme } = useContext(ThemeContext);
  const [currentUser, role] = useRole();

  const sideNavStyle = ({ isActive }) =>
    isActive
      ? theme === "black"
        ? "border-l-2 border-white"
        : "border-l-2 border-black"
      : "";

  return (
    <div
      className={`${
        theme === "black" ? "bg-slate-900 text-white" : "bg-white"
      } shadow-lg h-screen lg:w-[20vw] w-72 `}
    >
      <div className="grid place-items-end">
        <p
          onClick={navOpenHandler}
          className="text-right text-3xl lg:hidden py-2 pr-3 w-fit cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </p>
      </div>
      <div>
        <h1 className="pl-7 text-lg font-semibold py-2 ">
          {currentUser?.email}
        </h1>
      </div>
      <div>
        <ul className=" pl-5 space-y-3 text-xl">
          <li>
            <NavLink
              onClick={navOpenHandler}
              to={"/dashboard/user-home"}
              className={sideNavStyle}
            >
              Home
            </NavLink>
          </li>
          {/* user specific dashboard navigation */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={`/dashboard/${"manage-user"}`}
                  className={sideNavStyle}
                >
                  Manage users
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/manage-classes"}
                  className={sideNavStyle}
                >
                  Manage classes
                </NavLink>
              </li>
            </>
          )}
          {role === "instructor" && (
            <>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/add-class"}
                  className={sideNavStyle}
                >
                  Add class
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/my-classes"}
                  className={sideNavStyle}
                >
                  My classes
                </NavLink>
              </li>
            </>
          )}
          {role === "student" && (
            <>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/selected-classes"}
                  className={sideNavStyle}
                >
                  Selected classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/enrolled-classes"}
                  className={sideNavStyle}
                >
                  enrolled classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={navOpenHandler}
                  to={"/dashboard/payment-history"}
                  className={sideNavStyle}
                >
                  payment history
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* back to homepages navigation for all users */}
      <div>
        <ul className=" pl-5 space-y-3 text-xl py-2 border-t-2 mt-3">
          <li>
            <Link to={"/"}>Back To Homepage</Link>
          </li>
          <li>
            <Link to={"/classes"}>Classes</Link>
          </li>
          <li>
            <Link to={"/instructors"}>Instructors</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
