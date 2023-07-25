import React, { useEffect, useState } from "react";
import Table from "../Table";

const ManageUsers = () => {
  const headers = ["Name", "Email", "Role", ""];
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => setData(users));
  }, []);

  return (
    <div>
      <div>
        <Table headers={headers} data={data}></Table>
      </div>
    </div>
  );
};

export default ManageUsers;
