import { useEffect, useState } from "react";
import FlightCard from "./FlightCard";

export default function FlightList() {

const [flights,setFlights]=useState([]);

useEffect(()=>{

const saved=

JSON.parse(

localStorage.getItem(

"planetway_flights"

)

)||[];

setFlights(saved);

},[]);

if(flights.length===0){

return(

<div className="dashboardCard">

<h2>

Flights

</h2>

<p>

No Flights Available

</p>

</div>

);

}

return(

<div>

<h2>

Flight Manager

</h2>

<div className="packageGrid">

{flights.map((flight)=>(

<FlightCard

key={flight.id}

flight={flight}

/>

))}

</div>

</div>

);

}