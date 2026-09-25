export default function CarCard({ car }) {

return (

<div className="packageCard">

<h3>

{car.brand} {car.model}

</h3>

<p>

Category:
{car.category}

</p>

<p>

Transmission:
{car.transmission}

</p>

<p>

Fuel:
{car.fuel}

</p>

<p>

Location:
{car.location}

</p>

<p>

Price:
€{car.price}/day

</p>

<p>

Status:
🟢 {car.status}

</p>

<div
style={{
display:"flex",
gap:"10px",
marginTop:"15px"
}}
>

<button className="actionBtn">

Edit

</button>

<button
className="actionBtn"
style={{
background:"#e53935"
}}
>

Delete

</button>

</div>

</div>

);

}