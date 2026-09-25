import { useEffect, useState } from "react";
import CarCard from "./CarCard";

export default function CarList() {

const [cars,setCars]=useState([]);

useEffect(()=>{

const saved=

JSON.parse(

localStorage.getItem(

"planetway_cars"

)

)||[];

setCars(saved);

},[]);

if(cars.length===0){

return(

<div className="dashboardCard">

<h2>

Car Rental Manager

</h2>

<p>

No Vehicles Available

</p>

</div>

);

}

return(

<div>

<h2>

Vehicle Fleet

</h2>

<div className="packageGrid">

{cars.map((car)=>(

<CarCard

key={car.id}

car={car}

/>

))}

</div>

</div>

);

}