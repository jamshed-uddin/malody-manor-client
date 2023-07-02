import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";
import useRole from "../../../../Hooks/useRole";
import SideNavItems from "../SideNavItems";

const SideNav = ({ displayName }) => {
  const [currentUser, role] = useRole();
  console.log(currentUser, role);
  return (
    <div className="bg-white shadow-lg h-screen lg:w-[20vw] w-72 pt-6">
      <h1 className="pl-5 text-2xl font-semibold py-3">{displayName}</h1>
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
        <SideNavItems></SideNavItems>
        <hr />
        <li>
          <Link to={"/"}>Back to home</Link>
        </li>
        <li>
          <Link to={"/classes"}>Classes</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
