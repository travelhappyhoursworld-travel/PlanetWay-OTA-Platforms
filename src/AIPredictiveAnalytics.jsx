import { useState } from "react";

export default function AIPredictiveAnalytics() {

  const [forecast] = useState({
    revenue: "€145,000",
    bookings: 2680,
    growth: "+18%",
    destination: "Rome"
  });

  return (
    <div className="dashboard">

      <h1>AI Predictive Analytics</h1>

      <div className="stats">

        <div className="statCard">
          <h3>Forecast Revenue</h3>
          <p>{forecast.revenue}</p>
        </div>

        <div className="statCard">
          <h3>Forecast Bookings</h3>
          <p>{forecast.bookings}</p>
        </div>

        <div className="statCard">
          <h3>Growth Prediction</h3>
          <p>{forecast.growth}</p>
        </div>

        <div className="statCard">
          <h3>Top Destination</h3>
          <p>{forecast.destination}</p>
        </div>

      </div>

      <div className="packageCard">

        <h3>AI Recommendation</h3>

        <p>
          Increase marketing budget for Rome,
          Paris and Dubai packages.
        </p>

      </div>

    </div>
  );
}