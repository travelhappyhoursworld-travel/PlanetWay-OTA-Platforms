export default function MarketingCenter() {

const campaigns = [

{
id: 1,
name: "Dubai Summer Sale",
status: "Active",
clicks: 12450,
conversions: 328
},

{
id: 2,
name: "Rome City Break",
status: "Active",
clicks: 8540,
conversions: 194
},

{
id: 3,
name: "Tokyo Explorer",
status: "Scheduled",
clicks: 0,
conversions: 0
}

];

return (

<div>

<div className="stats">

<div className="statCard">
<h3>Active Campaigns</h3>
<p>8</p>
</div>

<div className="statCard">
<h3>Total Clicks</h3>
<p>84,250</p>
</div>

<div className="statCard">
<h3>Conversions</h3>
<p>2,154</p>
</div>

<div className="statCard">
<h3>Conversion Rate</h3>
<p>6.8%</p>
</div>

</div>

<div className="dashboardCard">

<h2>
Campaign Manager
</h2>

<table className="crmTable">

<thead>

<tr>
<th>ID</th>
<th>Campaign</th>
<th>Status</th>
<th>Clicks</th>
<th>Conversions</th>
</tr>

</thead>

<tbody>

{campaigns.map((c)=>(

<tr key={c.id}>

<td>{c.id}</td>

<td>{c.name}</td>

<td>{c.status}</td>

<td>{c.clicks}</td>

<td>{c.conversions}</td>

</tr>

))}

</tbody>

</table>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>
Newsletter Manager
</h2>

<p>Subscribers: 12,840</p>

<p>Open Rate: 38%</p>

<p>Click Rate: 12%</p>

<button className="actionBtn">
Create Newsletter
</button>

</div>

<div className="dashboardCard">

<h2>
Promo Codes
</h2>

<p>SUMMER25</p>

<p>DUBAI10</p>

<p>ROME15</p>

<button className="actionBtn">
Create Promo Code
</button>

</div>

</div>

<div className="dashboardGrid">

<div className="dashboardCard">

<h2>
Social Media Planner
</h2>

<p>Instagram Posts Scheduled: 12</p>

<p>Facebook Posts Scheduled: 8</p>

<p>LinkedIn Posts Scheduled: 4</p>

</div>

<div className="dashboardCard">

<h2>
Campaign Performance
</h2>

<p>Best Campaign: Dubai Summer Sale</p>

<p>Revenue Generated: €148,000</p>

<p>ROI: 420%</p>

</div>

</div>

</div>

);

}