import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";

import SideNavItems from "../SideNavItems";

const SideNav = ({ setNavOpened }) => {
  const navOpenHandler = () => {
    setNavOpened((prevNavOpen) => !prevNavOpen);
  };

  return (
    <div className="bg-white shadow-lg h-screen lg:w-[20vw] w-72">
      <div className="grid place-items-end">
        <p
          onClick={navOpenHandler}
          className="text-right lg:hidden border p-2 w-fit cursor-pointer"
        >
          CLOSE
        </p>
      </div>
      <h1 className="pl-5 text-2xl font-semibold py-3 border">{}</h1>
      <ul className=" pl-5 space-y-2 text-xl">
        <li>
          <NavLink
            to={"/dashboard/user-home"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Home
          </NavLink>
        </li>

        {/* user specific dashboard navigation */}
        <SideNavItems />
      </ul>

      {/* back to homepages navigation for all users */}
      <ul className=" pl-5 space-y-2 text-xl py-2 border-t-2 mt-3">
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
  );
};

export default SideNav;
