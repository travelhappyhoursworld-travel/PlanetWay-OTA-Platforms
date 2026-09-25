import { useState } from "react";
import "./App.css";

export default function Checkout() {

  const booking =
    JSON.parse(
      localStorage.getItem(
        "planetway_booking"
      )
    );

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const completePayment = () => {

    const payments =
      JSON.parse(
        localStorage.getItem(
          "planetway_payments"
        )
      ) || [];

    payments.push({
      id: Date.now(),
      customer: booking?.fullName,
      email: booking?.email,
      method: paymentMethod,
      status: "Paid"
    });

    localStorage.setItem(
      "planetway_payments",
      JSON.stringify(payments)
    );

    alert(
      "Payment completed successfully"
    );
  };

  return (

    <div className="dashboard">

      <h1>Secure Checkout</h1>

      <div className="packageCard">

        <h2>Traveler Details</h2>

        <p>
          <strong>Name:</strong>{" "}
          {booking?.fullName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {booking?.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {booking?.phone}
        </p>

        <p>
          <strong>Passengers:</strong>{" "}
          {booking?.travelers}
        </p>

      </div>

      <div className="packageCard">

        <h2>Payment Method</h2>

        <div className="paymentMethods">

          <label>
            <input
              type="radio"
              checked={
                paymentMethod === "card"
              }
              onChange={() =>
                setPaymentMethod("card")
              }
            />
            Visa / Mastercard
          </label>

          <label>
            <input
              type="radio"
              checked={
                paymentMethod === "paypal"
              }
              onChange={() =>
                setPaymentMethod("paypal")
              }
            />
            PayPal
          </label>

          <label>
            <input
              type="radio"
              checked={
                paymentMethod === "bank"
              }
              onChange={() =>
                setPaymentMethod("bank")
              }
            />
            Bank Transfer
          </label>

        </div>

      </div>

      {paymentMethod === "card" && (

        <div className="packageCard">

          <h2>Card Payment</h2>

          <input
            placeholder="Card Number"
          />

          <input
            placeholder="Card Holder"
          />

          <input
            placeholder="MM/YY"
          />

          <input
            placeholder="CVV"
          />

        </div>

      )}

      {paymentMethod === "paypal" && (

        <div className="packageCard">

          <h2>PayPal Payment</h2>

          <p>
            Customer will be redirected
            to PayPal.
          </p>

        </div>

      )}

      {paymentMethod === "bank" && (

        <div className="packageCard">

          <h2>Bank Transfer</h2>

          <p>
            Company:
            PlanetWay Travel LLC
          </p>

          <p>
            Bank:
            Mercury Bank
          </p>

          <p>
            Account:
            XXXXXXXX
          </p>

          <p>
            Reference:
            PW-{Date.now()}
          </p>

        </div>

      )}

      <button
        className="loginBtn"
        onClick={completePayment}
      >
        Complete Payment
      </button>

    </div>

  );
}