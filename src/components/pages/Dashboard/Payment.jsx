import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import useSingleSelectedClass from "../../../Hooks/useSingleSelectedClass";
import LoadingComponent from "./LoadingComponent";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { selectedClassId } = useParams();
  const [isLoading, singleSelectedClass] =
    useSingleSelectedClass(selectedClassId);

  const paymentCompleteToast = () =>
    toast("Payment completed.Redirecting to Enrolled classes...");

  if (isLoading || !singleSelectedClass?._id) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold lg:ml-11">Complete your payment</h1>
      <div className="lg:flex lg:mt-14 mt-8 md:px-12">
        <div className="flex-grow">
          <h1 className="text-xl font-semibold mb-4">Class Detail</h1>

          <div className="space-y-2 mt-6">
            <h1 className="text-xl">
              Class: {singleSelectedClass?.class_name}
            </h1>
            <h1 className="text-xl">
              Instructor: {singleSelectedClass?.instructor_name}
            </h1>
            <h1 className="text-xl">
              Price: <span className="text-sm">$</span>
              <span>{singleSelectedClass?.price}</span>
            </h1>
          </div>
        </div>

        <div className="flex-grow lg:mt-0 mt-8">
          <Elements stripe={stripePromise}>
            <Checkout
              singleSelectedClass={singleSelectedClass}
              price={singleSelectedClass?.price}
              paymentCompleteToast={paymentCompleteToast}
            ></Checkout>
          </Elements>
        </div>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default Payment;
