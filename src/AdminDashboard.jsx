import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import DashboardHome from "./components/DashboardHome";

import AddPackage from "./components/AddPackage";

import AddHotel from "./components/AddHotel";
import HotelList from "./components/HotelList";

import AddFlight from "./components/AddFlight";
import FlightList from "./components/FlightList";

import AddCar from "./components/AddCar";
import CarList from "./components/CarList";

export default function AdminDashboard() {

const [activePage,setActivePage]=useState("dashboard");

const customers=[

{
id:1,
name:"Marko Bazovic",
email:"marko@email.com",
phone:"+381659335732",
status:"VIP",
bookings:12
},

{
id:2,
name:"John Smith",
email:"john@email.com",
phone:"+44 123456",
status:"Regular",
bookings:3
},

{
id:3,
name:"Anna Rossi",
email:"anna@email.com",
phone:"+39 456789",
status:"VIP",
bookings:8
}

];

const suppliers=[

{
name:"Amadeus",
status:"Connected"
},

{
name:"Hotelbeds",
status:"Connected"
},

{
name:"Stripe",
status:"Connected"
},

{
name:"PayPal",
status:"Connected"
},

{
name:"Firebase",
status:"Connected"
}

];

return(

<div className="dashboardLayout">

<Sidebar
setActivePage={setActivePage}
/>

<main className="mainContent">

<Topbar/>

{activePage==="dashboard"&&(

<DashboardHome
setActivePage={setActivePage}
/>

)}

{activePage==="packages"&&(

<div className="dashboardCard">

<h2>

Package Manager

</h2>

<AddPackage/>

</div>

)}

{activePage==="hotels"&&(

<>

<div className="dashboardCard">

<h2>

Hotel Manager

</h2>

<AddHotel
reloadHotels={()=>{}}
/>

</div>

<HotelList/>

</>

)}
{activePage==="flights"&&(

<>

<div className="dashboardCard">

<h2>

Flight Manager

</h2>

<AddFlight/>

</div>

<FlightList/>

</>

)}

{activePage==="cars"&&(

<>

<div className="dashboardCard">

<h2>

Vehicle Manager

</h2>

<AddCar/>

</div>

<CarList/>

</>

)}

{activePage==="customers"&&(

<div className="dashboardCard">

<h2>

Customer CRM

</h2>

<table className="crmTable">

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Status</th>

<th>Bookings</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{customers.map((customer)=>(

<tr key={customer.id}>

<td>{customer.name}</td>

<td>{customer.email}</td>

<td>{customer.phone}</td>

<td>{customer.status}</td>

<td>{customer.bookings}</td>

<td>

<button className="actionBtn">

View

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

{activePage==="suppliers"&&(

<div className="dashboardCard">

<h2>

Suppliers

</h2>

<table className="crmTable">

<thead>

<tr>

<th>Supplier</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{suppliers.map((supplier,index)=>(

<tr key={index}>

<td>{supplier.name}</td>

<td>🟢 {supplier.status}</td>

<td>

<button className="actionBtn">

Open

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}
{activePage==="payments"&&(

<div className="dashboardCard">

<h2>

Payments Center

</h2>

<div className="stats">

<div className="statCard">

<h3>

Stripe

</h3>

<p>

🟢 Connected

</p>

</div>

<div className="statCard">

<h3>

PayPal

</h3>

<p>

🟢 Connected

</p>

</div>

<div className="statCard">

<h3>

Today's Payments

</h3>

<p>

52

</p>

</div>

<div className="statCard">

<h3>

Pending

</h3>

<p>

14

</p>

</div>

</div>

<button className="actionBtn">

Open Stripe Dashboard

</button>

<button className="actionBtn">

Open PayPal Dashboard

</button>

</div>

)}

{activePage==="analytics"&&(

<div className="dashboardCard">

<h2>

Analytics Center

</h2>

<div className="stats">

<div className="statCard">

<h3>

Revenue Today

</h3>

<p>

€12,450

</p>

</div>

<div className="statCard">

<h3>

Monthly Revenue

</h3>

<p>

€248,900

</p>

</div>

<div className="statCard">

<h3>

Bookings

</h3>

<p>

1,854

</p>

</div>

<div className="statCard">

<h3>

Conversion

</h3>

<p>

6.8%

</p>

</div>

</div>

</div>

)}

{activePage==="revenue"&&(

<div className="dashboardCard">

<h2>

Revenue Center

</h2>

<p>

Today:
€12,450

</p>

<p>

This Month:
€248,900

</p>

<p>

This Year:
€2.8M

</p>

</div>

)}
{activePage==="employees"&&(

<div className="dashboardCard">

<h2>

Employees

</h2>

<table className="crmTable">

<thead>

<tr>

<th>Name</th>

<th>Department</th>

<th>Role</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

<tr>

<td>Marko Bazovic</td>

<td>Management</td>

<td>Administrator</td>

<td>🟢 Online</td>

<td>

<button className="actionBtn">

Profile

</button>

</td>

</tr>

<tr>

<td>Employee 1</td>

<td>Reservations</td>

<td>Agent</td>

<td>🟢 Online</td>

<td>

<button className="actionBtn">

Profile

</button>

</td>

</tr>

<tr>

<td>Employee 2</td>

<td>Support</td>

<td>Support</td>

<td>🟡 Busy</td>

<td>

<button className="actionBtn">

Profile

</button>

</td>

</tr>

<tr>

<td>Employee 3</td>

<td>Finance</td>

<td>Accountant</td>

<td>🔴 Offline</td>

<td>

<button className="actionBtn">

Profile

</button>

</td>

</tr>

</tbody>

</table>

</div>

)}

{activePage==="reports"&&(

<div className="dashboardCard">

<h2>

Reports Center

</h2>

<button className="actionBtn">

Daily Report

</button>

<button className="actionBtn">

Weekly Report

</button>

<button className="actionBtn">

Monthly Report

</button>

<button className="actionBtn">

Annual Report

</button>

<button className="actionBtn">

Export PDF

</button>

<button className="actionBtn">

Export Excel

</button>

</div>

)}

{activePage==="logs"&&(

<div className="dashboardCard">

<h2>

System Logs

</h2>

<p>✔ Hotel Added</p>

<p>✔ Flight Imported</p>

<p>✔ Car Added</p>

<p>✔ Booking Confirmed</p>

<p>✔ Payment Completed</p>

<p>✔ Employee Login</p>

<p>✔ API Synchronization Successful</p>

</div>

)}
{activePage==="api"&&(

<div className="dashboardCard">

<h2>

API Center

</h2>

<table className="crmTable">

<thead>

<tr>

<th>Provider</th>

<th>Status</th>

<th>Version</th>

</tr>

</thead>

<tbody>

<tr>

<td>Amadeus</td>

<td>🟢 Connected</td>

<td>v2</td>

</tr>

<tr>

<td>Hotelbeds</td>

<td>🟢 Connected</td>

<td>v1</td>

</tr>

<tr>

<td>Stripe</td>

<td>🟢 Connected</td>

<td>2025</td>

</tr>

<tr>

<td>PayPal</td>

<td>🟢 Connected</td>

<td>REST</td>

</tr>

<tr>

<td>Firebase</td>

<td>🟢 Connected</td>

<td>v10</td>

</tr>

<tr>

<td>Google Maps</td>

<td>🟢 Connected</td>

<td>API</td>

</tr>

<tr>

<td>OpenWeather</td>

<td>🟢 Connected</td>

<td>v3</td>

</tr>

</tbody>

</table>

</div>

)}

{activePage==="settings"&&(

<div className="dashboardCard">

<h2>

Platform Settings

</h2>

<button className="actionBtn">

General Settings

</button>

<button className="actionBtn">

Security

</button>

<button className="actionBtn">

Users

</button>

<button className="actionBtn">

API Keys

</button>

<button className="actionBtn">

Backup Database

</button>

<button className="actionBtn">

Restore Backup

</button>

<button className="actionBtn">

System Logs

</button>

<button className="actionBtn">

Email Settings

</button>

</div>

)}
</main>

</div>

);

}