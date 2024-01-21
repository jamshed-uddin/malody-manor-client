import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SideNav.css";
import useRole from "../../../../Hooks/useRole";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../Provider/AuthProvider";

const SideNav = ({ navOpenHandler }) => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, role } = useRole();
  const navigate = useNavigate();

  const { userLogOut } = useContext(AuthContext);

  const sideNavStyle = ({ isActive }) =>
    isActive
      ? theme === "black"
        ? "bg-slate-700 px-2 py-1 block rounded-lg"
        : "bg-gray-200 px-2 py-1 block rounded-lg"
      : "px-2 py-1 block";

  const handleLogout = async () => {
    await userLogOut().then(navigate("/"));
  };

  return (
    <div
      className={`bg- ${
        theme === "black" ? "bg-slate-900 text-white" : "bg-white"
      } shadow-lg h-screen `}
    >
      <div className="grid place-items-end">
        <p
          onClick={navOpenHandler}
          className="text-right text-3xl  py-2 pr-3 w-fit cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </p>
      </div>

      <div className="flex flex-col  h-[calc(100vh-5rem)]">
        <div className="flex-grow">
          <div className=" px-4 space-y-2 text-xl">
            <div>
              <NavLink
                onClick={navOpenHandler}
                to={"/dashboard/user-home"}
                className={sideNavStyle}
              >
                Overview
              </NavLink>
            </div>
            {/* user specific dashboard navigation */}
            {role === "admin" && (
              <>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={`/dashboard/${"manage-user"}`}
                    className={sideNavStyle}
                  >
                    Manage users
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/manage-classes"}
                    className={sideNavStyle}
                  >
                    Manage classes
                  </NavLink>
                </div>
              </>
            )}
            {role === "instructor" && (
              <>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/add-class"}
                    className={sideNavStyle}
                  >
                    Add class
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/my-classes"}
                    className={sideNavStyle}
                  >
                    My classes
                  </NavLink>
                </div>
              </>
            )}
            {role === "student" && (
              <>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/selected-classes"}
                    className={sideNavStyle}
                  >
                    Selected classes
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/enrolled-classes"}
                    className={sideNavStyle}
                  >
                    enrolled classes
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={navOpenHandler}
                    to={"/dashboard/payment-history"}
                    className={sideNavStyle}
                  >
                    payment history
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
        {/* back to homepages navigation for all users */}
        <div className="px-5 space-y-3 text-xl ">
          <div>
            <Link to={"/"}>Back To Homepage</Link>
          </div>
          <div>
            <Link to={"/classes"}>Classes</Link>
          </div>

          <div>
            <span className="cursor-pointer" onClick={handleLogout}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
