import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import useSingleSelectedClass from "../../../Hooks/useSingleSelectedClass";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { selectedClassId } = useParams();
  const [isLoading, singleSelectedClass] =
    useSingleSelectedClass(selectedClassId);

  console.log(singleSelectedClass);
  // const [singleClass] = useSingleClass(singleSelectedClass.classId);

  // needed that object id from selectedClasses for deleting that selected class after payment and got original class id from selected class object and that needed to change the anoumt of available_seat and enrolled.

  const paymentCompleteToast = () =>
    toast("Payment completed.Redirecting to Enrolled classes...");

  if (isLoading || !singleSelectedClass?._id) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">
        Complete your payment process
      </h1>
      <div className="lg:flex lg:mt-14 mt-8">
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

        <div className="flex-grow ">
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
