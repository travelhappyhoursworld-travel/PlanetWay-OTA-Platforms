import React from "react";

export default function Sidebar({ setActivePage }) {
return (
<aside className="sidebar">

  <div className="sidebarTop">

    <div className="logo">
      🌍 PlanetWay
    </div>

    <div className="adminCard">

      <div className="avatar">
        M
      </div>

      <div>
        <h4>Marko</h4>
        <p>Administrator</p>
      </div>

    </div>

  </div>

  <div className="menu">

    <div onClick={() => setActivePage("dashboard")}>
      📊 Dashboard
    </div>

    <div onClick={() => setActivePage("packages")}>
      📦 Packages
    </div>

    <div onClick={() => setActivePage("reservations")}>
      📅 Reservations
    </div>

    <div onClick={() => setActivePage("customers")}>
      👥 Customers
    </div>

    <div onClick={() => setActivePage("hotels")}>
      🏨 Hotels
    </div>

    <div onClick={() => setActivePage("flights")}>
      ✈ Flights
    </div>

    <div onClick={() => setActivePage("cars")}>
      🚗 Cars
    </div>

    <div onClick={() => setActivePage("payments")}>
      💳 Payments
    </div>

    <div onClick={() => setActivePage("marketing")}>
      📢 Marketing
    </div>

    <div onClick={() => setActivePage("employees")}>
      👨‍💼 Employees
    </div>

    <div onClick={() => setActivePage("reports")}>
      📑 Reports
    </div>

    <div onClick={() => setActivePage("analytics")}>
      📈 Analytics
    </div>

    <div onClick={() => setActivePage("revenue")}>
      💰 Revenue
    </div>

    <div onClick={() => setActivePage("suppliers")}>
      🤝 Suppliers
    </div>

    <div onClick={() => setActivePage("settings")}>
      ⚙ Settings
      <div onClick={() => setActivePage("hotels")}>
🏨 Hotel Manager
</div>

<div onClick={() => setActivePage("flights")}>
✈ Flight Manager
</div>

<div onClick={() => setActivePage("cars")}>
🚗 Car Manager
</div>

<div onClick={() => setActivePage("suppliers")}>
🤝 Suppliers
</div>

<div onClick={() => setActivePage("crm")}>
👥 CRM
</div>

<div onClick={() => setActivePage("employees")}>
👨‍💼 Employees
</div>

<div onClick={() => setActivePage("logs")}>
📋 Activity Logs
</div>

<div onClick={() => setActivePage("api")}>
🔌 API Center
</div>
    </div>

  </div>

</aside>

);
}