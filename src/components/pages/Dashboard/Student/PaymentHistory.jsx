import React, { useEffect, useMemo, useState } from "react";
import useRole from "../../../../Hooks/useRole";
import TableComponent from "../TableComponent";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [currentUser] = useRole();

  useEffect(() => {
    if (currentUser.email) {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/getPaymentHistory/${
          currentUser?.email
        }`
      )
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
      <h1 className="pb-5 text-2xl">Payment history</h1>
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
