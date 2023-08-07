import { useState } from "react";

import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [navOpened, setNavOpened] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5  relative">
        <div className="col-span-1 hidden lg:block">
          <SideNav></SideNav>
        </div>
        {/* mobile sidenav */}
        <div
          className={`col-span-1 absolute lg:hidden top-0 ${
            navOpened ? "left-0" : "-left-96"
          }  transition-all duration-500`}
        >
          <SideNav navOpened={navOpened} setNavOpened={setNavOpened}></SideNav>
        </div>
        <div className="col-span-4 px-4 py-2">
          <h1
            onClick={() => setNavOpened(true)}
            className="lg:hidden cursor-pointer "
          >
            OPEN
          </h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
