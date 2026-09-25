export default function EmployeeSidebar({ setActivePage }) {

return (

<aside className="sidebar">

<div className="sidebarTop">

<div className="logo">
🌍 PlanetWay
</div>

<div className="adminCard">

<div className="avatar">
E
</div>

<div>
<h4>Employee</h4>
<p>Travel Consultant</p>
</div>

</div>

</div>

<div className="menu">

<div onClick={() => setActivePage("dashboard")}>
📊 Dashboard
</div>

<div onClick={() => setActivePage("reservations")}>
📅 Reservations
</div>

<div onClick={() => setActivePage("customers")}>
👥 Customers
</div>

<div onClick={() => setActivePage("packages")}>
📦 Packages
</div>

<div onClick={() => setActivePage("crm")}>
📋 CRM
</div>

<div onClick={() => setActivePage("support")}>
🎧 Support
</div>

</div>

</aside>

);

}