export default function PaymentCenter() {

const payments = [

{
id:"PAY001",
customer:"Marko Bazovic",
amount:"€1299",
method:"Stripe",
status:"Paid"
},

{
id:"PAY002",
customer:"John Smith",
amount:"€599",
method:"PayPal",
status:"Pending"
},

{
id:"PAY003",
customer:"Anna Rossi",
amount:"€1899",
method:"Stripe",
status:"Paid"
}

];

return (

<div className="dashboardCard">

<h2>
Payment Center
</h2>

<table className="crmTable">

<thead>

<tr>
<th>ID</th>
<th>Customer</th>
<th>Amount</th>
<th>Method</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{payments.map((p)=>(

<tr key={p.id}>

<td>{p.id}</td>

<td>{p.customer}</td>

<td>{p.amount}</td>

<td>{p.method}</td>

<td>{p.status}</td>

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
<h3>Total Revenue</h3>
<p>€248,900</p>
</div>

<div className="statCard">
<h3>Stripe Revenue</h3>
<p>€180,000</p>
</div>

<div className="statCard">
<h3>PayPal Revenue</h3>
<p>€68,900</p>
</div>

<div className="statCard">
<h3>Pending Payments</h3>
<p>14</p>
</div>

</div>

</div>

);

}