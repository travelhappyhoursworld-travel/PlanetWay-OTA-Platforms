import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";

export default function HotelList() {

const [hotels, setHotels] = useState([]);

const [search, setSearch] = useState("");

const [filter, setFilter] = useState("All");

useEffect(() => {

loadHotels();

}, []);

const loadHotels = () => {

const saved =
JSON.parse(
localStorage.getItem(
"planetway_hotels"
)
) || [];

setHotels(saved);

};

const deleteHotel = (id) => {

if(
!window.confirm(
"Delete this hotel?"
)
) return;

const updated =
hotels.filter(
(hotel)=>hotel.id!==id
);

localStorage.setItem(
"planetway_hotels",
JSON.stringify(updated)
);

setHotels(updated);

};

const editHotel = (hotel) => {

localStorage.setItem(
"planetway_editHotel",
JSON.stringify(hotel)
);

alert(
"Hotel loaded for editing."
);

};

const filteredHotels =
hotels.filter((hotel)=>{

const matchesSearch =

hotel.name
.toLowerCase()
.includes(
search.toLowerCase()
)

||

hotel.city
.toLowerCase()
.includes(
search.toLowerCase()
)

||

hotel.country
.toLowerCase()
.includes(
search.toLowerCase()
);

const matchesFilter =

filter==="All"

||

hotel.status===filter;

return(

matchesSearch

&&

matchesFilter

);

});

return(

<div>

<div
className="dashboardCard"
style={{
marginBottom:"20px"
}}
>

<h2>

Hotel List

</h2>

<div
style={{
display:"flex",
gap:"15px",
marginTop:"20px",
flexWrap:"wrap"
}}
>

<input

type="text"

placeholder="Search Hotel..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

/>

<select

value={filter}

onChange={(e)=>

setFilter(
e.target.value
)

}

>

<option>

All

</option>

<option>

Active

</option>

<option>

Hidden

</option>

</select>

<button

className="actionBtn"

onClick={loadHotels}

>

Refresh

</button>

</div>

</div>

<div

style={{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(420px,1fr))",

gap:"20px"

}}

>

{filteredHotels.length===0 ? (

<div
className="dashboardCard"
>

<h3>

No Hotels Found

</h3>

</div>

) : (

filteredHotels.map((hotel)=>(

<HotelCard

key={hotel.id}

hotel={hotel}

onEdit={editHotel}

onDelete={deleteHotel}

/>

))

)}

</div>

</div>

);

}