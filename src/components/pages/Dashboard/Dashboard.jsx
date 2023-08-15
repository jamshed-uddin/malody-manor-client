import { useContext, useState } from "react";

import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [navOpened, setNavOpened] = useState(false);
  const navOpenHandler = () => {
    setNavOpened((prevNavOpen) => !prevNavOpen);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5  relative">
        <div className="col-span-1 hidden lg:block">
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
          className={`col-span-4 py-2 ${
            theme === "black" && "bg-black text-white"
          }`}
        >
          <div className="flex items-center shadow px-1 mb-2 lg:hidden">
            <h1
              onClick={() => setNavOpened(true)}
              className=" cursor-pointer font-semibold text-3xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </h1>
            <h1 className="ml-4 font-semibold text-4xl">Dashboard</h1>
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
