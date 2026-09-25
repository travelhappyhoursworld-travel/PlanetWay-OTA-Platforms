import { useState } from "react";

export default function ReservationManager() {

const [search, setSearch] =
useState("");

const reservations = [
{
id:"PW1001",
customer:"Marko Bazovic",
destination:"Dubai",
status:"Confirmed",
amount:"€1299"
},
{
id:"PW1002",
customer:"John Smith",
destination:"Rome",
status:"Pending",
amount:"€599"
},
{
id:"PW1003",
customer:"Anna Rossi",
destination:"Tokyo",
status:"Paid",
amount:"€1899"
},
{
id:"PW1004",
customer:"David Lee",
destination:"Bangkok",
status:"Cancelled",
amount:"€999"
}
];

const filtered =
reservations.filter((r)=>

r.customer
.toLowerCase()
.includes(search.toLowerCase())

||

r.id
.toLowerCase()
.includes(search.toLowerCase())

);

return (

<div className="dashboardCard">

<h2>
Reservation Manager
</h2>

<input
className="searchInput"
placeholder="Search Booking ID or Customer"
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
/>

<table className="crmTable">

<thead>

<tr>
<th>Booking ID</th>
<th>Customer</th>
<th>Destination</th>
<th>Status</th>
<th>Amount</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filtered.map((r)=>(

<tr key={r.id}>

<td>{r.id}</td>

<td>{r.customer}</td>

<td>{r.destination}</td>

<td>{r.status}</td>

<td>{r.amount}</td>

<td>

<button
className="actionBtn"
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}