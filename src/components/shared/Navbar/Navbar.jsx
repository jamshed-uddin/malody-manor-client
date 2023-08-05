import React, { useContext, useState } from "react";
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Provider/AuthProvider";
import MyButton from "../MyButton";
// import { AuthContext } from "../../pages/userManagement/AuthProvider";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user, userLogout } = useContext(AuthContext);
  //   const { user, userLogOut } = useContext(AuthContext);
  const handleLogOut = () => {
    userLogout();
    setOpen(false);
  };

  return (
    <div className="flex justify-between h-16  items-center px-6 lg:px-16 py-3 lg:py-0  fixed top-0 right-0 left-0 bg-white  z-40">
      <div>
        <Link to={"/"}>
          {" "}
          <h1 className="text-3xl font-extrabold">MELODY MANOR</h1>
        </Link>
      </div>

      <div
        className={` block lg:flex lg:w-[65%] w-full justify-end items-center px-24  lg:px-0 py-28 lg:py-0  z-40 lg:bg-inherit  lg:static transition-all duration-1000 text-center  ${
          isOpen ? "absolute top-0 right-0" : "absolute top-0 -right-[500px]"
        } bg-slate-100 `}
      >
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-14 font-semibold nav-links ">
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

        <div
          className="mt-4 lg:mt-0 lg:flex justify-center items-center gap-4 lg:ml-10 "
          //   title={user?.email}
        >
          <Link onClick={() => setOpen(false)} className="cursor-pointer">
            <img
              className="w-10 border border-black  mb-4   lg:mb-0 mx-auto rounded-full"
              src={`${
                user ? user?.photoURL : "https://i.ibb.co/PCJCS96/blank.jpg"
              }`}
              alt=""
              title={user?.email}
            />
          </Link>

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

      <div className="lg:hidden z-50 text-3xl cursor-pointer">
        {isOpen ? (
          <FontAwesomeIcon onClick={() => setOpen(false)} icon={faXmark} />
        ) : (
          <FontAwesomeIcon onClick={() => setOpen(true)} icon={faBars} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
