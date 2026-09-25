import { useState } from "react";

export default function AddFlight() {

const [flightNumber,setFlightNumber]=useState("");
const [airline,setAirline]=useState("");
const [from,setFrom]=useState("");
const [to,setTo]=useState("");
const [departure,setDeparture]=useState("");
const [arrival,setArrival]=useState("");
const [price,setPrice]=useState("");
const [seats,setSeats]=useState("");

const saveFlight=()=>{

const newFlight={

id:Date.now(),

flightNumber,

airline,

from,

to,

departure,

arrival,

price,

seats,

status:"Available"

};

const existing=
JSON.parse(
localStorage.getItem(
"planetway_flights"
)
)||[];

existing.push(newFlight);

localStorage.setItem(
"planetway_flights",
JSON.stringify(existing)
);

alert("Flight Added");

setFlightNumber("");
setAirline("");
setFrom("");
setTo("");
setDeparture("");
setArrival("");
setPrice("");
setSeats("");

};

return(

<div className="addPackageCard">

<h2>

Add Flight

</h2>

<input
placeholder="Flight Number"
value={flightNumber}
onChange={(e)=>setFlightNumber(e.target.value)}
/>

<input
placeholder="Airline"
value={airline}
onChange={(e)=>setAirline(e.target.value)}
/>

<input
placeholder="Departure Airport"
value={from}
onChange={(e)=>setFrom(e.target.value)}
/>

<input
placeholder="Arrival Airport"
value={to}
onChange={(e)=>setTo(e.target.value)}
/>

<input
type="datetime-local"
value={departure}
onChange={(e)=>setDeparture(e.target.value)}
/>

<input
type="datetime-local"
value={arrival}
onChange={(e)=>setArrival(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Seats"
value={seats}
onChange={(e)=>setSeats(e.target.value)}
/>

<button
className="saveBtn"
onClick={saveFlight}
>

Save Flight

</button>

</div>

);

}