import { useState } from "react";

export default function SupplierAnalytics() {

  const [suppliers] = useState([
    {
      id: 1,
      name: "Hotelbeds",
      bookings: 152,
      revenue: 24500,
      profit: 5200
    },
    {
      id: 2,
      name: "RateHawk",
      bookings: 97,
      revenue: 18200,
      profit: 4100
    },
    {
      id: 3,
      name: "Amadeus Flights",
      bookings: 241,
      revenue: 38600,
      profit: 8700
    }
  ]);

  const topSupplier =
    [...suppliers].sort(
      (a, b) => b.profit - a.profit
    )[0];

  return (

    <div className="dashboard">

      <h1>Supplier Performance Analytics</h1>

      <div className="stats">

        <div className="statCard">
          <h3>Suppliers</h3>
          <p>{suppliers.length}</p>
        </div>

        <div className="statCard">
          <h3>Top Supplier</h3>
          <p>{topSupplier.name}</p>
        </div>

        <div className="statCard">
          <h3>Best Profit</h3>
          <p>€{topSupplier.profit}</p>
        </div>

      </div>

      <div className="packageList">

        {suppliers.map((supplier) => (

          <div
            key={supplier.id}
            className="packageCard"
          >

            <h3>{supplier.name}</h3>

            <p>
              Bookings:
              {" "}
              {supplier.bookings}
            </p>

            <p>
              Revenue:
              {" "}
              €{supplier.revenue}
            </p>

            <p>
              Profit:
              {" "}
              €{supplier.profit}
            </p>

            <p>
              ROI:
              {" "}
              {(
                (supplier.profit /
                  supplier.revenue) *
                100
              ).toFixed(2)}
              %
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}