export default function FlightResults() {

  const search =
    JSON.parse(
      localStorage.getItem(
        "planetway_flight_search"
      )
    ) || {};

  const flights = [

    {
      airline: "Air Serbia",
      route: `${search.from} → ${search.to}`,
      price: 189
    },

    {
      airline: "Lufthansa",
      route: `${search.from} → ${search.to}`,
      price: 245
    },

    {
      airline: "Turkish Airlines",
      route: `${search.from} → ${search.to}`,
      price: 275
    }

  ];

  return (

    <div className="dashboard">

      <h1>Flight Results</h1>

      <div className="packageList">

        {flights.map((flight, index) => (

          <div
            key={index}
            className="packageCard"
          >

            <h3>{flight.airline}</h3>

            <p>{flight.route}</p>

            <p>€{flight.price}</p>

            <button
              className="loginBtn"
            >
              Book Flight
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}