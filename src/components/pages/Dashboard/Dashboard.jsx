import { useContext, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [navOpened, setNavOpened] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navOpenHandler = () => {
    setNavOpened((prevNavOpen) => !prevNavOpen);
  };

  return (
    <div className="h-screen">
      <div className="flex h-full   relative">
        <div className="w-[20%] hidden lg:block">
          <SideNav></SideNav>
        </div>
        {/* mobile sidenav */}
        <div
          className={`col-span-1 absolute lg:hidden bg-white z-20 top-0 ${
            navOpened ? "left-0" : "-left-96"
          }  transition-all duration-500`}
        >
          <SideNav navOpenHandler={navOpenHandler}></SideNav>
        </div>

        {/* dashboard pages */}
        <div
          className={`flex-grow  ${theme === "black" && "bg-black text-white"}`}
        >
          <div className="flex items-center justify-between shadow h-12 mb-2 ">
            <h1
              onClick={() => setNavOpened(true)}
              className=" cursor-pointer font-semibold text-3xl  lg:hidden"
            >
              <FontAwesomeIcon icon={faBars} />
            </h1>
            <div className="text-end   w-full flex items-center justify-end lg:mr-5">
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
            </div>
          </div>
          <div className="px-4">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
