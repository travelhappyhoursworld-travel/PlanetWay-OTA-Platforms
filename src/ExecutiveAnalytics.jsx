import { useState } from "react";

export default function ExecutiveAnalytics() {

  const [data] = useState({
    revenue: 124500,
    profit: 32750,
    bookings: 2154,
    suppliers: 87,
    agencies: 14,
    customers: 9821
  });

  return (

    <div className="dashboard">

      <h1>Business Intelligence Suite</h1>

      <div className="stats">

        <div className="statCard">
          <h3>Total Revenue</h3>
          <p>€{data.revenue}</p>
        </div>

        <div className="statCard">
          <h3>Total Profit</h3>
          <p>€{data.profit}</p>
        </div>

        <div className="statCard">
          <h3>Bookings</h3>
          <p>{data.bookings}</p>
        </div>

        <div className="statCard">
          <h3>Customers</h3>
          <p>{data.customers}</p>
        </div>

        <div className="statCard">
          <h3>Suppliers</h3>
          <p>{data.suppliers}</p>
        </div>

        <div className="statCard">
          <h3>Agencies</h3>
          <p>{data.agencies}</p>
        </div>

      </div>

      <div className="packageList">

        <div className="packageCard">
          <h3>Revenue Forecast</h3>
          <p>
            Estimated next month:
            €145,000
          </p>
        </div>

        <div className="packageCard">
          <h3>Top Performing Market</h3>
          <p>Italy</p>
        </div>

        <div className="packageCard">
          <h3>Top Product</h3>
          <p>Paris Package</p>
        </div>

        <div className="packageCard">
          <h3>Executive KPI</h3>
          <p>Growth +18.4%</p>
        </div>

      </div>

    </div>

  );
}