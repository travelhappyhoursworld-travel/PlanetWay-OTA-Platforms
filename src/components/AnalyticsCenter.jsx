export default function AnalyticsCenter() {

const destinations = [

{
name:"Dubai",
bookings:245
},

{
name:"Rome",
bookings:198
},

{
name:"Bangkok",
bookings:176
},

{
name:"Tokyo",
bookings:154
}

];

return (

<div>

<div className="stats">

<div className="statCard">
<h3>Total Revenue</h3>
<p>€2.8M</p>
</div>

<div className="statCard">
<h3>Monthly Revenue</h3>
<p>€248,900</p>
</div>

<div className="statCard">
<h3>Bookings</h3>
<p>12,842</p>
</div>

<div className="statCard">
<h3>Conversion Rate</h3>
<p>6.8%</p>
</div>

<div className="statCard">
<h3>Customer Growth</h3>
<p>+18%</p>
</div>

<div className="statCard">
<h3>Supplier Performance</h3>
<p>98.7%</p>
</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>
Top Destinations
</h2>

{destinations.map((d)=>(

<div
key={d.name}
className="reservationRow"
>

<span>{d.name}</span>

<strong>
{d.bookings}
</strong>

</div>

))}

</div>

<div className="dashboardCard">

<h2>
Performance
</h2>

<p>
Revenue Growth: +24%
</p>

<p>
Bookings Growth: +19%
</p>

<p>
Customers Growth: +18%
</p>

<p>
Supplier Stability: 98.7%
</p>

</div>

</div>

<div className="dashboardCard">

<h2>
Executive Summary
</h2>

<p>
PlanetWay continues strong growth across all OTA sectors.
</p>

<p>
Hotel bookings remain the strongest segment.
</p>

<p>
Flight revenue is growing steadily through Amadeus integration.
</p>

<p>
Customer retention exceeds 62%.
</p>

</div>

</div>

);

}