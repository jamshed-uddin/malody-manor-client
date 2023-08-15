import { useContext, useState } from "react";

import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";

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
        <div
          className={`col-span-4 px-4 py-2 ${
            theme === "black" && "bg-black text-white"
          }`}
        >
          <h1
            onClick={() => setNavOpened(true)}
            className="lg:hidden cursor-pointer font-semibold "
          >
            MENU
          </h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
