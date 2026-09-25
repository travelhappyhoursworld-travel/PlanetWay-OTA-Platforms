import AddPackage from "./AddPackage";
import AddHotel from "./AddHotel";
import AddFlight from "./AddFlight";
import AddCar from "./AddCar";

export default function DashboardHome({ setActivePage }) {

return (

<>

<div className="welcomeCard">

<h2>
Welcome back Marko 👋
</h2>

<p>
PlanetWay OTA Platform V35
</p>

</div>

<div className="stats">

<div className="statCard">
<h3>Hotels</h3>
<p>684</p>
</div>

<div className="statCard">
<h3>Flights</h3>
<p>312</p>
</div>

<div className="statCard">
<h3>Cars</h3>
<p>128</p>
</div>

<div className="statCard">
<h3>Bookings</h3>
<p>1854</p>
</div>

<div className="statCard">
<h3>Customers</h3>
<p>2184</p>
</div>

<div className="statCard">
<h3>Revenue</h3>
<p>€2.8M</p>
</div>

<div className="statCard">
<h3>Employees</h3>
<p>12</p>
</div>

<div className="statCard">
<h3>API</h3>
<p>Online</p>
</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>
Quick Actions
</h2>

<button
className="actionBtn"
onClick={()=>setActivePage("packages")}
>
Packages
</button>

<button
className="actionBtn"
onClick={()=>setActivePage("hotels")}
>
Hotels
</button>

<button
className="actionBtn"
onClick={()=>setActivePage("flights")}
>
Flights
</button>

<button
className="actionBtn"
onClick={()=>setActivePage("cars")}
>
Cars
</button>

<button
className="actionBtn"
onClick={()=>setActivePage("customers")}
>
CRM
</button>

<button
className="actionBtn"
onClick={()=>setActivePage("reports")}
>
Reports
</button>

</div>

<div className="dashboardCard">

<h2>

Latest Reservations

</h2>

<p>Dubai Luxury — €1299</p>

<p>Rome City Break — €599</p>

<p>Tokyo Explorer — €1899</p>

<p>Bali Escape — €1650</p>

</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>

Quick Package

</h2>

<AddPackage/>

</div>

<div className="dashboardCard">

<h2>

Quick Hotel

</h2>

<AddHotel reloadHotels={()=>{}}/>

</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>

Quick Flight

</h2>

<AddFlight/>

</div>

<div className="dashboardCard">

<h2>

Quick Vehicle

</h2>

<AddCar/>

</div>

</div>

</>

);

}