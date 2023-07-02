import React, { useContext, useState } from "react";
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Provider/AuthProvider";
// import { AuthContext } from "../../pages/userManagement/AuthProvider";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user, userLogout } = useContext(AuthContext);
  //   const { user, userLogOut } = useContext(AuthContext);

  return (
    <div className="flex justify-between h-16  items-center px-6 lg:px-16 py-3 lg:py-0  fixed top-0 right-0 left-0 bg-white  z-40">
      <div>
        <Link to={"/"}>
          {" "}
          <h1 className="text-4xl font-bold">
            Melody <span className="">Manor</span>{" "}
          </h1>
        </Link>
      </div>

      <div
        className={` block lg:flex lg:w-[65%] justify-end items-center px-24  lg:px-0 py-28 lg:py-0  z-40 lg:bg-inherit  lg:static transition-all duration-700 text-center  ${
          isOpen ? "absolute top-0 right-0" : "absolute top-0 -right-96"
        } bg-slate-300 `}
      >
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-14 font-semibold nav-links ">
          <NavLink
            onClick={() => setOpen(false)}
            className={`link px-2 py-1 lg:py-0 ${({ isActive }) =>
              isActive ? "active" : "default"}`}
            to={"/"}
          >
            Home
          </NavLink>

          <NavLink
            to={"/instructors"}
            onClick={() => setOpen(false)}
            className={`link px-2 py-1 lg:py-0 ${({ isActive }) =>
              isActive ? "active" : "default"}`}
          >
            Instructors
          </NavLink>
          <NavLink
            to={"/classes"}
            onClick={() => setOpen(false)}
            className={`link px-2 py-1 lg:py-0 ${({ isActive }) =>
              isActive ? "active" : "default"}`}
          >
            Classes
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            className={`link px-2 py-1 lg:py-0 ${({ isActive }) =>
              isActive ? "active" : "default"}`}
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
              className="w-10 bg-black p-1 mb-4 border  lg:mb-0 mx-auto rounded-full"
              src={`${
                user ? user?.photoURL : "https://i.ibb.co/PCJCS96/blank.jpg"
              }`}
              alt=""
              title={user?.email}
            />
          </Link>

          {user ? (
            <Link onClick={userLogout}>
              <Button>Logout</Button>
            </Link>
          ) : (
            <Link onClick={() => setOpen(false)} to={"/login"}>
              <Button>Login</Button>
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
