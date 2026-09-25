export default function HotelCard({

hotel,

onEdit,

onDelete

}) {

return (

<div className="hotelCard">

<div className="hotelImage">

<img
src={
hotel.images?.length
? hotel.images[0]
: "https://placehold.co/600x400?text=PlanetWay"
}
alt={hotel.name}
/>

</div>

<div className="hotelBody">

<div className="hotelHeader">

<h2>
{hotel.name}
</h2>

<span
className={
hotel.status === "Active"
? "statusActive"
: "statusHidden"
}
>

{hotel.status}

</span>

</div>

<p>

📍 {hotel.city},{" "}
{hotel.country}

</p>

<p>

{"⭐".repeat(
Number(hotel.stars)
)}

</p>

<p>

💶 <strong>

{hotel.price}

</strong>

 / Night

</p>

<p>

🛏 Rooms:
{" "}
{hotel.rooms}

</p>

<p>

{hotel.description}

</p>

<div
className="facilityRow"
>

{hotel.wifi &&
<span>
📶 WiFi
</span>}

{hotel.pool &&
<span>
🏊 Pool
</span>}

{hotel.spa &&
<span>
💆 Spa
</span>}

{hotel.parking &&
<span>
🅿 Parking
</span>}

{hotel.restaurant &&
<span>
🍽 Restaurant
</span>}

</div>

{hotel.images?.length >
1 && (

<div
className="galleryRow"
>

{hotel.images
.slice(1,5)
.map(
(img,index)=>(
<img

key={index}

src={img}

alt="Hotel"

className="galleryThumb"

/>
)
)}

</div>

)}

<div
className="hotelActions"
>

<button
className="actionBtn"
onClick={()=>
onEdit(hotel)
}
>

Edit

</button>

<button
className="deleteBtn"
onClick={()=>
onDelete(hotel.id)
}
>

Delete

</button>

</div>

</div>

</div>

);

}