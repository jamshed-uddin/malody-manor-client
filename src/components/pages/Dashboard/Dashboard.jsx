import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import SideNav from "./SideNav/SideNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navItems = ["Manage users", "Manage classes"];
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName;

  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content  items-center justify-center">
          {/* navigator */}
          <label
            htmlFor="my-drawer-2"
            className=" drawer-button lg:hidden fixed top-0 left-0 cursor-pointer"
          >
            <FontAwesomeIcon className="text-4xl p-3" icon={faBars} />
          </label>

          {/* drawer content */}
          <div className="pt-16 lg:pt-10 lg:px-6 px-3 ">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side border border-black">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <SideNav navItems={navItems} displayName={displayName}></SideNav>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
