export default function SupplierManager() {

const suppliers = [

{
id:1,
name:"Amadeus",
type:"Flights API",
status:"Connected",
commission:"3%"
},

{
id:2,
name:"Hotelbeds",
type:"Hotels API",
status:"Connected",
commission:"12%"
},

{
id:3,
name:"Stripe",
type:"Payments",
status:"Connected",
commission:"1.5%"
},

{
id:4,
name:"PayPal",
type:"Payments",
status:"Connected",
commission:"3.4%"
},

{
id:5,
name:"Local Transfer Partner",
type:"Transfers",
status:"Pending",
commission:"8%"
}

];

return (

<div className="dashboardCard">

<h2>
Supplier Management Pro
</h2>

<table className="crmTable">

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Type</th>
<th>Status</th>
<th>Commission</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{suppliers.map((s)=>(

<tr key={s.id}>

<td>{s.id}</td>

<td>{s.name}</td>

<td>{s.type}</td>

<td>{s.status}</td>

<td>{s.commission}</td>

<td>

<button className="actionBtn">
Manage
</button>

</td>

</tr>

))}

</tbody>

</table>

<div
style={{
marginTop:"25px",
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"15px"
}}
>

<div className="statCard">
<h3>Total Suppliers</h3>
<p>5</p>
</div>

<div className="statCard">
<h3>Connected APIs</h3>
<p>4</p>
</div>

<div className="statCard">
<h3>Pending Suppliers</h3>
<p>1</p>
</div>

<div className="statCard">
<h3>Average Commission</h3>
<p>5.6%</p>
</div>

</div>

</div>

);

}