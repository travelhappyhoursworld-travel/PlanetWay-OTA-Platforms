export default function FlightCard({ flight }) {

return (

<div className="packageCard">

<h3>

{flight.airline}

</h3>

<p>

Flight:
{flight.flightNumber}

</p>

<p>

{flight.from}
➡
{flight.to}

</p>

<p>

Departure:
{flight.departure}

</p>

<p>

Arrival:
{flight.arrival}

</p>

<p>

Price:
€{flight.price}

</p>

<p>

Seats:
{flight.seats}

</p>

<p>

Status:
{flight.status}

</p>

</div>

);

}