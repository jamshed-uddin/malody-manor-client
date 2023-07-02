import { NavLink } from "react-router-dom";
import useRole from "../../../Hooks/useRole";

const SideNavItems = () => {
  const [, role] = useRole();
  console.log(role);

  if (role === "student") {
    return (
      <>
        <li>
          <NavLink
            to={"/dashboard/selected-classes"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Selected classes
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/enrolled-classes"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            enrolled classes
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/payment-history"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            payment history
          </NavLink>
        </li>
      </>
    );
  }
  if (role === "instructor") {
    return (
      <>
        <li>
          <NavLink
            to={"/dashboard/add-class"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Add class
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/my-classes"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            My classes
          </NavLink>
        </li>
      </>
    );
  }
  if (role === "admin") {
    return (
      <>
        <li>
          <NavLink
            to={`/dashboard/${"manage-user"}`}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Manage users
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/manage-classes"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Manage classes
          </NavLink>
        </li>
      </>
    );
  }
};

export default SideNavItems;
