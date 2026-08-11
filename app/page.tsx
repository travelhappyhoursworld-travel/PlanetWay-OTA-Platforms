"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "PlanetWay Travel Package",
            price: 100,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Payment initialization failed"
        );
      }

      if (!data.url) {
        throw new Error("Stripe Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);

      alert(
        "Payment could not be started. Check the terminal for details."
      );

      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7fb",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "12px",
          }}
        >
          PlanetWay
        </h1>

        <p
          style={{
            color: "#667085",
            marginBottom: "30px",
          }}
        >
          Travel booking platform
        </p>

        <div
          style={{
            border: "1px solid #e4e7ec",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "25px",
          }}
        >
          <h2>PlanetWay Travel Package</h2>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "700",
              margin: "15px 0",
            }}
          >
            €100
          </p>

          <p style={{ color: "#667085" }}>
            Secure payment powered by Stripe
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "12px",
            padding: "15px 20px",
            background: "#635bff",
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: "600",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Connecting to Stripe..." : "Book & Pay €100"}
        </button>
      </div>
    </main>
  );
}