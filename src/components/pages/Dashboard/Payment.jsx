import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

// todo : provide publishable key
const Payment = () => {
  const { classId } = useParams();
  const [singleClass, setSingleClass] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/singleClass/${classId}`)
      .then((res) => res.json())
      .then((result) => setSingleClass(result));
  }, []);

  if (!singleClass?._id) {
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
            <h1 className="text-xl">Class: {singleClass?.class_name}</h1>
            <h1 className="text-xl">
              Instructor: {singleClass?.instructor_name}
            </h1>
            <h1 className="text-xl">
              Price: <span className="text-sm">$</span>
              <span>{singleClass?.price}</span>
            </h1>
          </div>
        </div>

        <div className="flex-grow ">
          <Elements stripe={stripePromise}>
            <Checkout price={singleClass?.price}></Checkout>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
