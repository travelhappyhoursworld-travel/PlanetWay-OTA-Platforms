import { useState } from "react";
import EmployeeSidebar from "./components/EmployeeSidebar";
import Topbar from "./components/Topbar";

export default function EmployeeDashboard() {

const [activePage, setActivePage] =
useState("dashboard");

return (

<div className="dashboardLayout">

  <EmployeeSidebar
setActivePage={setActivePage}
/>

  <main className="mainContent">

    <Topbar />

    <div className="welcomeCard">

      <h2>
        Welcome Employee 👋
      </h2>

      <p>
        PlanetWay Employee Panel V21
      </p>

    </div>

    <div className="stats">

      <div className="statCard">
        <h3>Bookings Today</h3>
        <p>52</p>
      </div>

      <div className="statCard">
        <h3>Customers</h3>
        <p>2184</p>
      </div>

      <div className="statCard">
        <h3>Packages</h3>
        <p>143</p>
      </div>

      <div className="statCard">
        <h3>Hotels</h3>
        <p>684</p>
      </div>

    </div>

    <div className="dashboardGrid">

      <div className="dashboardCard">

        <h2>
          Today's Tasks
        </h2>

        <p>
          Confirm Reservations
        </p>

        <p>
          Contact Customers
        </p>

        <p>
          Update Packages
        </p>

      </div>

      <div className="dashboardCard">

        <h2>
          Latest Reservations
        </h2>

        <p>
          Dubai Luxury
        </p>

        <p>
          Rome City Break
        </p>

        <p>
          Tokyo Explorer
        </p>

      </div>

    </div>

    <div className="dashboardCard">

      <h2>
        Customer Requests
      </h2>

      <p>
        Change travel date
      </p>

      <p>
        Add extra baggage
      </p>

      <p>
        Hotel room upgrade
      </p>

    </div>

  </main>

</div>

);

}