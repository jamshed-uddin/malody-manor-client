import React, { useState } from "react";
import useRole from "../../../Hooks/useRole";

const TableRow = ({ datum, headers, index, statusTd }) => {
  const [currentUser, role] = useRole();
  const [status, setStatus] = useState(datum?.status);
  console.log(status);

  const styleClass = "border rounded px-1  border-black";

  return (
    <>
      <tr>
        <td>{index + 1}</td>

        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={datum?.photo || datum?.image || datum?.img}
                  alt="Photo"
                />
              </div>
            </div>
          </div>
        </td>

        {/* <td>
          <div>
            <div className="font-bold">{datum?.name}</div>
          </div>
        </td>
        <td>
          <h1>{datum?.email}</h1>
        </td>
        <td>{datum?.role}</td> */}
        {headers.map((header, index) => (
          <td key={index}>{datum[header.toLowerCase()]}</td>
        ))}
        {role === "admin" && statusTd ? (
          <td>
            <p className="space-x-1">
              <span className={styleClass}>Approved</span>
              <span className={styleClass}>Pending</span>

              <span className={styleClass}>Denied</span>
            </p>
          </td>
        ) : (
          ""
        )}
      </tr>
    </>
  );
};

export default TableRow;
