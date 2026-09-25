export default function RevenueManager() {

const revenues = [

{
month:"January",
amount:"€185,000"
},

{
month:"February",
amount:"€212,000"
},

{
month:"March",
amount:"€248,900"
},

{
month:"April",
amount:"€267,400"
}

];

return (

<div>

<div className="stats">

<div className="statCard">
<h3>Today's Revenue</h3>
<p>€12,450</p>
</div>

<div className="statCard">
<h3>This Month</h3>
<p>€248,900</p>
</div>

<div className="statCard">
<h3>This Year</h3>
<p>€2.8M</p>
</div>

<div className="statCard">
<h3>Projected Annual</h3>
<p>€3.4M</p>
</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>
Monthly Revenue
</h2>

{revenues.map((r)=>(

<div
key={r.month}
className="reservationRow"
>

<span>{r.month}</span>

<strong>{r.amount}</strong>

</div>

))}

</div>

<div className="dashboardCard">

<h2>
Revenue Sources
</h2>

<p>🏨 Hotels: €1.4M</p>

<p>✈ Flights: €900K</p>

<p>🚗 Cars: €280K</p>

<p>📦 Packages: €220K</p>

</div>

</div>

<div className="dashboardCard">

<h2>
Financial Overview
</h2>

<p>
Profit Margin: 31%
</p>

<p>
Operational Costs: €124,000
</p>

<p>
Supplier Costs: €68,000
</p>

<p>
Net Profit: €56,000
</p>

</div>

<div className="dashboardCard">

<h2>
Top Revenue Destinations
</h2>

<p>🇦🇪 Dubai — €420K</p>

<p>🇮🇹 Rome — €310K</p>

<p>🇹🇭 Bangkok — €280K</p>

<p>🇯🇵 Tokyo — €240K</p>

</div>

</div>

);

}