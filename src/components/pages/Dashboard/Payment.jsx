import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import LoadingComponent from "./LoadingComponent";
import useSingleClass from "../../../Hooks/useSingleClass";
import { ThemeContext } from "../../Provider/ThemeProvider";

// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { theme } = useContext(ThemeContext);
  const { selectedClassId } = useParams();
  const [stripe, setStripe] = useState(null);
  const cardStyle = `rounded-xl p-3 shadow-md ${
    theme === "black" ? "shadow-gray-500" : ""
  }`;

  useEffect(() => {
    loadStripe(import.meta.env.VITE_PAYMENT_PK).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  const { data: singleSelectedClass, isLoading } =
    useSingleClass(selectedClassId);

  const paymentCompleteToast = () =>
    toast("Payment completed.Redirecting to Enrolled classes...");

  if (isLoading || !singleSelectedClass?._id) {
    return <LoadingComponent />;
  }
  return (
    <div className="p-2 lg:p-8 ">
      <h1 className="text-3xl font-semibold ">Complete your payment</h1>
      <div className="lg:flex  mt-4  gap-3">
        <div className={`flex-grow ${cardStyle}`}>
          <h1 className="text-2xl font-semibold mb-4">Class Detail</h1>

          <div className="space-y-1 mt-2">
            <h1 className="text-xl">Class: {singleSelectedClass?.className}</h1>
            <h1 className="text-xl">
              Instructor: {singleSelectedClass?.instructorName}
            </h1>
            <h1 className="text-xl">
              Price: <span className="text-sm">$</span>
              <span>{singleSelectedClass?.price}</span>
            </h1>
          </div>
        </div>

        <div className={`flex-grow mt-8 lg:mt-0 ${cardStyle}`}>
          <h1 className="text-2xl font-semibold mb-5">Card detail</h1>
          <Elements stripe={stripe}>
            <Checkout
              singleSelectedClass={singleSelectedClass}
              price={singleSelectedClass?.price}
              paymentCompleteToast={paymentCompleteToast}
            ></Checkout>
          </Elements>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} autoClose={4000} />
    </div>
  );
};

export default Payment;
