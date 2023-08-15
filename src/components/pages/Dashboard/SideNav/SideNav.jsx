import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";
import useRole from "../../../../Hooks/useRole";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const SideNav = ({ navOpenHandler }) => {
  const { theme } = useContext(ThemeContext);
  const [currentUser, role] = useRole();

  return (
    <div
      className={`${
        theme === "black" ? "bg-slate-900" : "bg-white"
      } shadow-lg h-screen lg:w-[20vw] w-72`}
    >
      <div className="grid place-items-end">
        <p
          onClick={navOpenHandler}
          className="text-right lg:hidden p-2 w-fit cursor-pointer font-semibold"
        >
          CLOSE MENU
        </p>
      </div>
      <h1 className="pl-7 text-lg font-semibold py-3 ">{currentUser?.email}</h1>
      <ul className=" pl-5 space-y-2 text-xl">
        <li>
          <NavLink
            onClick={navOpenHandler}
            to={"/dashboard/user-home"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
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
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
              >
                Manage users
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={navOpenHandler}
                to={"/dashboard/manage-classes"}
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
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
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
              >
                Add class
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={navOpenHandler}
                to={"/dashboard/my-classes"}
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
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
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
              >
                Selected classes
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={navOpenHandler}
                to={"/dashboard/enrolled-classes"}
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
              >
                enrolled classes
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={navOpenHandler}
                to={"/dashboard/payment-history"}
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-slate-300" : ""
                }
              >
                payment history
              </NavLink>
            </li>
          </>
        )}
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
