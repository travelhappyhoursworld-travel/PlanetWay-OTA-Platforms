export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
        }}
      >
        <h1>Payment successful</h1>

        <p>
          Thank you for your PlanetWay booking.
        </p>

        <p>
          Your payment has been completed in Stripe Test Mode.
        </p>

        <a href="/">
          Return to PlanetWay
        </a>
      </div>
    </main>
  );
}