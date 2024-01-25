import React, { useEffect, useMemo, useState } from "react";
import useRole from "../../../../Hooks/useRole";
import TableComponent from "../TableComponent";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../LoadingComponent";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import NoItemText from "../NoItemText";
import useStudentData from "../../../../Hooks/useStudentData";
import ErrorElement from "../../../shared/ErrorElement";

const PaymentHistory = () => {
  const { currentUser } = useRole();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: payments,
    isLoading,
    error: paymentHistoryError,
    refetch,
  } = useStudentData("/getPaymentHistory");

  console.log(payments);

  const columns = useMemo(
    () => [
      {
        field: "className",
        headerName: "Class Name",
        width: "150",
        sortable: false,
        editable: false,
        filter: false,
      },
      {
        field: "transectionId",
        headerName: "Transection id",
        width: "170",
        sortable: false,
        editable: false,
      },
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

  if (paymentHistoryError) {
    return <ErrorElement error={paymentHistoryError} refetch={refetch} />;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard-payment history</title>
      </Helmet>

      {isLoading ? (
        <LoadingComponent />
      ) : payments?.length === 0 ? (
        <NoItemText text={"No payment history"} />
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
