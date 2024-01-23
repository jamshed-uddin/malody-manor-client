import React, { useContext, useState } from "react";
import "./Navbar.css";

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Provider/AuthProvider";

import { Avatar } from "@mui/material";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../../Provider/ThemeProvider";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  return (
    <nav
      className={`py-3 fixed top-0 left-0 right-0  ${
        theme === "black" ? "bg-black" : "bg-white"
      }  z-30`}
    >
      <div className="flex items-center relative md:w-[90%] w-[97%] mx-auto">
        <div className="flex-grow">
          <h1 className="md:text-3xl text-2xl font-bold tracking-tighter">
            <Link className="p-0" to={"/"}>
              MELODY MANOR
            </Link>
          </h1>
        </div>
        <div className="hidden lg:block mr-5 ">
          <div className="flex items-center space-x-12 text-lg font-semibold">
            {pathname !== "/" && (
              <div>
                <Link to={"/"}>Home</Link>
              </div>
            )}
            <div>
              <Link to={"/classes"}>Classes</Link>
            </div>
            <div>
              <Link to={"/instructors"}>Instructors</Link>
            </div>
            {user ? (
              <div>
                <Link
                  to={"/dashboard/user-home"}
                  className="flex items-center gap-1"
                >
                  Dashboard
                  <Avatar
                    src={`${user?.photoURL}`}
                    alt=""
                    title={user?.email}
                  ></Avatar>
                </Link>
              </div>
            ) : (
              <div>
                <Link onClick={() => setOpen(false)} to={"/login"}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex gap-5 items-center">
            {/* theme mode */}
            <div className="text-2xl w-7 cursor-pointer text-center transition-all duration-500">
              {theme === "light" ? (
                <p onClick={() => toggleTheme()}>
                  <FontAwesomeIcon icon={faMoon} />
                </p>
              ) : (
                <p className="font-light" onClick={() => toggleTheme()}>
                  <FontAwesomeIcon icon={faSun} />
                </p>
              )}
            </div>

            <div className="lg:hidden text-3xl cursor-pointer w-7 ">
              <FontAwesomeIcon onClick={() => setOpen(true)} icon={faBars} />
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation menu */}

      <div
        className={`lg:hidden absolute top-0  ${
          isOpen ? "right-0" : "-right-[1000px]"
        } h-screen w-full  ${
          theme === "black" ? "bg-black" : "bg-white"
        } transition-all duration-700`}
      >
        <div className="text-right text-4xl pt-6 pr-6 cursor-pointer">
          <FontAwesomeIcon onClick={() => setOpen(false)} icon={faXmark} />
        </div>
        <div className="h-full flex items-center ">
          <div className="space-y-6 text-center text-3xl  w-full">
            {pathname !== "/" && (
              <div>
                <Link onClick={() => setOpen(false)} to={"/"}>
                  Home
                </Link>
              </div>
            )}
            <div>
              <Link onClick={() => setOpen(false)} to={"/classes"}>
                Classes
              </Link>
            </div>
            <div>
              <Link onClick={() => setOpen(false)} to={"/instructors"}>
                Instructors
              </Link>
            </div>
            {user ? (
              <div>
                <div>
                  <Link
                    onClick={() => setOpen(false)}
                    to={"/dashboard/user-home"}
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Avatar
                    className="mx-auto "
                    src={`${user?.photoURL}`}
                    alt=""
                    title={user?.email}
                  ></Avatar>
                </div>
              </div>
            ) : (
              <div>
                <Link onClick={() => setOpen(false)} to={"/login"}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
