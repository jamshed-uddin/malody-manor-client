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
    <div
      className={`flex justify-between h-16  items-center px-6 lg:px-16 py-3 lg:py-0  fixed top-0 right-0 left-0 z-40 ${
        theme === "black" ? "bg-black" : "bg-white"
      }`}
    >
      <div>
        <Link to={"/"}>
          {" "}
          <h1 className="md:text-3xl text-2xl  md:font-extrabold font-bold">
            MELODY MANOR
          </h1>
        </Link>
      </div>

      <div
        className={` block lg:flex lg:w-[65%] w-full h-screen lg:h-full justify-end items-center px-24  lg:px-0 py-28 lg:py-0  z-40 lg:bg-inherit  lg:static transition-all duration-1000 text-center  ${
          isOpen ? "absolute top-0 right-0" : "absolute top-0 -right-[1500px]"
        } ${theme === "black" && "bg-black"} ml-auto`}
      >
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0  lg:space-x-8 font-semibold nav-links ">
          <NavLink
            onClick={() => setOpen(false)}
            className={`link text-3xl lg:text-base font-bold lg:font-bold tracking-[0.2em] lg:tracking-wide  px-2 py-1 lg:py-0 ${({
              isActive,
            }) => (isActive ? "active" : "default")}`}
            to={"/"}
          >
            Home
          </NavLink>

          <NavLink
            to={"/instructors"}
            onClick={() => setOpen(false)}
            className={`link text-3xl lg:text-base font-bold lg:font-bold tracking-[0.2em] lg:tracking-wide px-2 py-1 lg:py-0 ${({
              isActive,
            }) => (isActive ? "active" : "default")}`}
          >
            Instructors
          </NavLink>
          <NavLink
            to={"/classes"}
            onClick={() => setOpen(false)}
            className={`link text-3xl lg:text-base font-bold lg:font-bold tracking-[0.2em] lg:tracking-wide px-2 py-1 lg:py-0 ${({
              isActive,
            }) => (isActive ? "active" : "default")}`}
          >
            Classes
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            className={`link text-3xl lg:text-base font-bold lg:font-bold tracking-[0.2em] lg:tracking-wide px-2 py-1 lg:py-0 ${({
              isActive,
            }) => (isActive ? "active" : "default")}`}
            to={"/dashboard/user-home"}
          >
            Dashboard
          </NavLink>
        </div>

        <div className=" mt-5 lg:mt-0 lg:flex items-center lg:gap-4 lg:ml-10 lg:mr-5">
          <div className="flex justify-center">
            <Link onClick={() => setOpen(false)} className="cursor-pointer">
              <Avatar
                src={`${user && user?.photoURL}`}
                alt=""
                title={user?.email}
              ></Avatar>
            </Link>
          </div>

          {user ? (
            <Link onClick={handleLogOut}>
              <MyButton>Logout</MyButton>
            </Link>
          ) : (
            <Link onClick={() => setOpen(false)} to={"/login"}>
              <MyButton>Login</MyButton>
            </Link>
          )}
        </div>
      </div>
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

        <div className="lg:hidden z-50 text-3xl cursor-pointer">
          {isOpen ? (
            <FontAwesomeIcon onClick={() => setOpen(false)} icon={faXmark} />
          ) : (
            <FontAwesomeIcon onClick={() => setOpen(true)} icon={faBars} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
