import React, { useEffect, useMemo, useState } from "react";
import useRole from "../../../../Hooks/useRole";
import TableComponent from "../TableComponent";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../LoadingComponent";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [currentUser] = useRole();
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    refetch,
    data: payments = [],
  } = useQuery({
    queryKey: ["paymentHistory", currentUser?.email],
    queryFn: async () => {
      const data = await axiosSecure(
        `/getPaymentHistory/${currentUser?.email}`
      );
      return data.data;
    },
  });

  console.log(payments);

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
      <Helmet>
        <title>Dashboard-payment history</title>
      </Helmet>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div>
          <h1 className="pb-5 text-2xl">Payment history</h1>
          <div>
            <TableComponent columns={columns} data={payments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
