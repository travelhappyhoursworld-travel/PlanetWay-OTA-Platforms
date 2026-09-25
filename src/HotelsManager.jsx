import { useEffect, useState } from "react";
import AddHotel from "./AddHotel";

export default function HotelManager() {

const [hotels, setHotels] = useState([]);

useEffect(() => {
loadHotels();
}, []);

const loadHotels = () => {

const data =
JSON.parse(
localStorage.getItem(
"planetway_hotels"
)
) || [];

setHotels(data);

};

const deleteHotel = (id) => {

if(
!window.confirm(
"Delete this hotel?"
)
) return;

const updated =
hotels.filter(
(h)=>h.id!==id
);

localStorage.setItem(
"planetway_hotels",
JSON.stringify(updated)
);

setHotels(updated);

};

return(

<div>

<AddHotel
reloadHotels={loadHotels}
/>

<div
className="dashboardCard"
style={{
marginTop:"30px"
}}
>

<h2>
Hotel Manager
</h2>

<table
className="crmTable"
>

<thead>

<tr>

<th>
Image
</th>

<th>
Hotel
</th>

<th>
City
</th>

<th>
Country
</th>

<th>
Stars
</th>

<th>
Price
</th>

<th>
Rooms
</th>

<th>
Status
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{hotels.map(
(hotel)=>(
<tr
key={hotel.id}
>

<td>

<img
src={
hotel.images?.[0]
}
alt=""
style={{
width:"90px",
height:"60px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

</td>

<td>

<b>
{hotel.name}
</b>

</td>

<td>

{hotel.city}

</td>

<td>

{hotel.country}

</td>

<td>

{"★".repeat(
Number(
hotel.stars
)
)}

</td>

<td>

€
{hotel.price}

</td>

<td>

{hotel.rooms}

</td>

<td>

<span
style={{
color:
hotel.status==="Active"
?
"green"
:
"red"
}}
>

{hotel.status}

</span>

</td>

<td>

<button
className="actionBtn"
>

Edit

</button>

<button
className="actionBtn"
style={{
marginLeft:"8px",
background:"#d32f2f"
}}
onClick={()=>
deleteHotel(
hotel.id
)
}
>

Delete

</button>

</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>

);

}