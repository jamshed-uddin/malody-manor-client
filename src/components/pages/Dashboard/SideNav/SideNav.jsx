import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ displayName }) => {
  const [admin, setAdmin] = useState(true);
  const [student, setStudent] = useState(false);
  const [instructor, setInstructor] = useState(false);
  return (
    <div className="bg-white shadow-lg h-screen lg:w-[20vw] w-72 pt-6">
      <h1 className="pl-5 text-2xl font-semibold py-3">{displayName}</h1>
      <ul className=" pl-5 space-y-2 text-xl">
        <li>
          <NavLink
            to={"/dashboard/user-home"}
            className={({ isActive }) =>
              isActive ? "bg-gradient-to-r from-slate-300" : ""
            }
          >
            Home
          </NavLink>
        </li>

        {student && (
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
        )}
        {instructor && (
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
        )}
        {admin && (
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
        )}
      </ul>
    </div>
  );
};

export default SideNav;
