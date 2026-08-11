export default function CancelPage() {
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
        <h1>Payment cancelled</h1>

        <p>
          No payment was completed.
        </p>

        <a href="/">
          Return to PlanetWay
        </a>
      </div>
    </main>
  );
}