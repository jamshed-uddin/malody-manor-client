import React from "react";
import TableRow from "./TableRow";
import useRole from "../../../Hooks/useRole";

const Table = ({ headers, data, statusTd }) => {
  const [currentUser, role] = useRole();
  return (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>

            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {role === "admin" && statusTd ? <th>Status</th> : ""}
          </tr>
        </thead>
        <tbody>
          {data.map((datum, index) => (
            <TableRow
              key={datum?._id}
              datum={datum}
              headers={headers}
              index={index}
              statusTd={statusTd}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
