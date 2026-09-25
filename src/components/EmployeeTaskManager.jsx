export default function EmployeeTaskManager() {

const tasks = [

{
id:1,
employee:"Milan",
task:"Confirm Dubai Booking",
priority:"High",
status:"In Progress"
},

{
id:2,
employee:"Jovana",
task:"Contact Hotel Supplier",
priority:"Medium",
status:"Pending"
},

{
id:3,
employee:"Nikola",
task:"Issue Flight Ticket",
priority:"High",
status:"Completed"
},

{
id:4,
employee:"Ana",
task:"Customer Support Request",
priority:"Low",
status:"Pending"
}

];

return (

<div className="dashboardCard">

<h2>Employee Task Manager</h2>

<table className="crmTable">

<thead>

<tr>
<th>ID</th>
<th>Employee</th>
<th>Task</th>
<th>Priority</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{tasks.map((task)=>(

<tr key={task.id}>

<td>{task.id}</td>

<td>{task.employee}</td>

<td>{task.task}</td>

<td>{task.priority}</td>

<td>{task.status}</td>

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
<h3>Total Tasks</h3>
<p>24</p>
</div>

<div className="statCard">
<h3>Completed</h3>
<p>18</p>
</div>

<div className="statCard">
<h3>Pending</h3>
<p>4</p>
</div>

<div className="statCard">
<h3>In Progress</h3>
<p>2</p>
</div>

</div>

</div>

);

}