import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useRole from "../../../Hooks/useRole";
import clearPaidClass from "./clearPaidClass";
import changeAvailability from "./changeAvailability";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Checkout = ({ singleSelectedClass, price, paymentCompleteToast }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  console.log(processing);

  const { data: clientSecret } = useQuery(
    ["paymentIntend", price],
    async () => {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/create-payment-intent`,
        {
          price,
        }
      );
      return result.data.clientSecret;
    },
    {
      enabled: !!price,
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
      console.log("error", error);
    } else {
      setCardError("");
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "anonymous",
            email: currentUser?.email,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    // console.log(paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransectionId(paymentIntent.id);

      const paymentInfo = {
        transectionId: paymentIntent?.id,
        userEmail: currentUser?.email,
        userName: currentUser?.name,
        classId: singleSelectedClass?._id,
        className: singleSelectedClass?.className,
        paymentDate: new Date(),
        amount: parseFloat(paymentIntent?.amount / 100),
        status: paymentIntent?.status,
      };

      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/paymentHistory`, paymentInfo)
        .then((result) => {
          if (result.data.insertedId) {
            // clearPaidClass(singleSelectedClass._id);
            // changeAvailability(singleSelectedClass?.classId);
            paymentCompleteToast();
            setTimeout(() => {
              navigate("/dashboard/enrolled-classes");
            }, 4000);
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: `${theme === "black" ? "#fff" : "#424770"}`,
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex  gap-2 items-center mt-4">
          <button
            className={`border ${
              theme === "black" ? "border-white" : "border-black"
            } px-4 py-1 rounded-lg  `}
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
          {processing && (
            <CircularProgress
              size={25}
              sx={theme === "black" ? { color: "white" } : { color: "black" }}
            />
          )}
        </div>
      </form>
      {cardError && <p className="text-sm text-red-500 mt-3">{cardError}</p>}
      {transectionId && (
        <p className="text-sm text-green-400 mt-3">Payment completed.</p>
      )}
    </div>
  );
};

export default Checkout;
