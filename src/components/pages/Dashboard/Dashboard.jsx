import { useContext, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ThemeToggler from "../../shared/ThemeToggler";

const Dashboard = () => {
  const [navOpened, setNavOpened] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navOpenHandler = () => {
    setNavOpened((prevNavOpen) => !prevNavOpen);
  };

  return (
    <div className="h-screen  lg:flex ">
      <div className=" hidden lg:block w-[20%] h-full">
        <SideNav></SideNav>
      </div>
      <div
        className={`w-[70%] h-full absolute lg:hidden bg-white z-50 top-0 ${
          navOpened ? "left-0" : "-left-96"
        }  transition-all duration-500`}
      >
        <SideNav navOpenHandler={navOpenHandler}></SideNav>
      </div>

      <div className="lg:w-[80%] h-full overflow-auto">
        <div className={` ${theme === "black" ? "bg-black text-white" : ""}`}>
          <div
            className={`fixed top-0 left-0 right-0 flex items-center justify-between shadow h-12 mb-2 z-30 px-3 ${
              theme === "black" ? "bg-slate-900" : "bg-white"
            }`}
          >
            <h1
              onClick={() => setNavOpened(true)}
              className=" cursor-pointer font-semibold text-3xl  lg:hidden"
            >
              <FontAwesomeIcon icon={faBars} />
            </h1>
            <div className="text-end   w-full flex items-center justify-end ">
              <ThemeToggler />
            </div>
          </div>
          <div className="px-4 mt-14">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
