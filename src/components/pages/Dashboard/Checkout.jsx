import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useRole from "../../../Hooks/useRole";
import clearPaidClass from "./clearPaidClass";
import changeAvailability from "./changeAvailability";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeProvider";

const Checkout = ({ singleSelectedClass, price, paymentCompleteToast }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [currentUser] = useRole();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

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
        classId: singleSelectedClass?.classId,
        className: singleSelectedClass?.class_name,
        paymentDate: new Date(),
        amount: parseFloat(paymentIntent?.amount / 100),
        status: paymentIntent?.status,
      };

      fetch(`${import.meta.env.VITE_SERVER_URL}/paymentHistory`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            clearPaidClass(singleSelectedClass._id);
            changeAvailability(singleSelectedClass?.classId);
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
        <button
          className={`border ${
            theme === "black" ? "border-white" : "border-black"
          } px-4 py-1 rounded-lg mt-3`}
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-sm text-red-500 mt-3">{cardError}</p>}
      {transectionId && (
        <p className="text-sm text-green-400 mt-3">Payment completed.</p>
      )}
    </div>
  );
};

export default Checkout;
