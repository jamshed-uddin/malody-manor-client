import React, { useContext, useState } from "react";
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Provider/AuthProvider";
import MyButton from "../MyButton";
import { Avatar } from "@mui/material";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../../Provider/ThemeProvider";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user, userLogOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogOut = () => {
    userLogOut();
    setOpen(false);
  };

  return (
    <nav
      className={` px-4 shadow bg-red fixed top-0 left-0 right-0 ${
        theme === "black" ? "bg-black" : "bg-white"
      }  z-30`}
    >
      <div className="flex items-center relative">
        <div className="flex-grow">
          <Link to={"/"}>
            {" "}
            <h1 className="md:text-3xl text-2xl  md:font-extrabold font-bold">
              MELODY MANOR
            </h1>
          </Link>
        </div>
        <div className="hidden lg:block mr-5 ">
          <div className="flex items-center gap-5 text-lg font-semibold">
            <div>
              <Link to={"/"}>Home</Link>
            </div>
            <div>
              <Link to={"/classes"}>Classes</Link>
            </div>
            <div>
              <Link to={"/instructor"}>Instructor</Link>
            </div>
            <div>
              <Link to={"/dashboard/user-home"}>Dashboard</Link>
            </div>
            <div>
              <Avatar
                src={`${user && user?.photoURL}`}
                alt=""
                title={user?.email}
              ></Avatar>
            </div>
            <div>
              {user ? (
                <div onClick={handleLogOut}>
                  <MyButton>Logout</MyButton>
                </div>
              ) : (
                <Link onClick={() => setOpen(false)} to={"/login"}>
                  <MyButton>Login</MyButton>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex gap-5 items-center">
            <div className="text-2xl w-7 cursor-pointer text-center">
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
        <div className="space-y-6 text-center text-3xl mt-10">
          <div>
            <Link onClick={() => setOpen(false)} to={"/"}>
              Home
            </Link>
          </div>
          <div>
            <Link onClick={() => setOpen(false)} to={"/classes"}>
              Classes
            </Link>
          </div>
          <div>
            <Link onClick={() => setOpen(false)} to={"/instructor"}>
              Instructor
            </Link>
          </div>
          <div>
            <Link onClick={() => setOpen(false)} to={"/dashboard/user-home"}>
              Dashboard
            </Link>
          </div>
          <div>
            <Avatar
              className="mx-auto "
              src={`${user && user?.photoURL}`}
              alt=""
              title={user?.email}
            ></Avatar>
          </div>
          <div>
            {user ? (
              <div onClick={handleLogOut}>
                <MyButton>Logout</MyButton>
              </div>
            ) : (
              <Link onClick={() => setOpen(false)} to={"/login"}>
                <MyButton>Login</MyButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
