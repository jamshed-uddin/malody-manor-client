import React, { useEffect, useMemo, useState } from "react";
import useRole from "../../../../Hooks/useRole";
import TableComponent from "../TableComponent";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [currentUser] = useRole();

  console.log(payments);
  console.log(currentUser);

  useEffect(() => {
    if (currentUser.email) {
      fetch(`http://localhost:3000/getPaymentHistory/${currentUser?.email}`)
        .then((res) => res.json())
        .then((result) => setPayments(result));
    }
  }, [currentUser]);

  const columns = useMemo(
    () => [
      { field: "className", headerName: "Class Name", width: "150" },
      { field: "transectionId", headerName: "Transection id", width: "170" },
      {
        field: "paymentDate",
        headerName: "Date",
        width: "220",
      },
      {
        field: "amount",
        headerName: "Amount",
        width: "100",
      },
    ],
    []
  );

  return (
    <div>
      <div>
        {!currentUser._id ? (
          <h1>Loading...</h1>
        ) : (
          <TableComponent columns={columns} data={payments} />
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
