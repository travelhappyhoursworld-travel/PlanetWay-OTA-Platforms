import { useState } from "react";

export default function Flights() {

  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {

    const res = await fetch(
      "http://localhost:5000/api/flights"
    );

    const data = await res.json();

    setFlights(data);

  };

  const handlePayment = async () => {

    const res = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "Flight to Paris",
          price: 199
        })
      }
    );

    const data = await res.json();

    window.location.href = data.url;

  };

  return (

    <div style={{ padding: 20 }}>

      <h2>✈️ Flights</h2>

      <button onClick={searchFlights}>
        Search Real Flights
      </button>

      <button
        onClick={handlePayment}
        style={{
          marginLeft: "10px"
        }}
      >
        Pay Flight
      </button>

      {flights.map((f, i) => (

        <div
          key={i}
          style={{
            background: "white",
            padding: 15,
            margin: 10,
            borderRadius: 10
          }}
        >

          ✈️
          {" "}
          {f.itineraries?.[0]?.segments?.[0]?.departure?.iataCode}
          {" → "}
          {f.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode}

          <br />

          💰
          {" "}
          {f.price?.total}
          {" €"}

        </div>

      ))}

    </div>

  );

}