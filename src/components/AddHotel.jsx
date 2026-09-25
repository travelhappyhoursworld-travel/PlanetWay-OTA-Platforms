import { useState } from "react";

export default function AddHotel({ reloadHotels }) {

const [name,setName]=useState("");
const [city,setCity]=useState("");
const [country,setCountry]=useState("");
const [stars,setStars]=useState("5");
const [price,setPrice]=useState("");
const [rooms,setRooms]=useState("");
const [description,setDescription]=useState("");
const [status,setStatus]=useState("Active");

const [wifi,setWifi]=useState(false);
const [pool,setPool]=useState(false);
const [spa,setSpa]=useState(false);
const [parking,setParking]=useState(false);
const [restaurant,setRestaurant]=useState(false);

const [images,setImages]=useState([]);

const handleImages=(e)=>{

const files=Array.from(e.target.files);

if(files.length>12){

alert("Maximum 12 images");

return;

}

const previews=files.map(file=>
URL.createObjectURL(file)
);

setImages(previews);

};

const saveHotel=()=>{

const hotel={

id:Date.now(),

name,

city,

country,

stars,

price,

rooms,

description,

status,

wifi,

pool,

spa,

parking,

restaurant,

images

};

const existing=

JSON.parse(

localStorage.getItem(

"planetway_hotels"

)

)||[];

existing.push(hotel);

localStorage.setItem(

"planetway_hotels",

JSON.stringify(existing)

);

alert("Hotel Saved");

setName("");
setCity("");
setCountry("");
setStars("5");
setPrice("");
setRooms("");
setDescription("");
setStatus("Active");

setWifi(false);
setPool(false);
setSpa(false);
setParking(false);
setRestaurant(false);

setImages([]);

reloadHotels?.();

};

return(

<div className="dashboardCard">

<h2>

Add Hotel

</h2>

<input
placeholder="Hotel Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
/>

<input
placeholder="Country"
value={country}
onChange={(e)=>setCountry(e.target.value)}
/>

<select
value={stars}
onChange={(e)=>setStars(e.target.value)}
>

<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>

</select>
<input
placeholder="Price per Night (€)"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Rooms"
value={rooms}
onChange={(e)=>setRooms(e.target.value)}
/>

<textarea
placeholder="Description"
rows="5"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<h3>

Facilities

</h3>

<label>

<input
type="checkbox"
checked={wifi}
onChange={(e)=>setWifi(e.target.checked)}
/>

WiFi

</label>

<label>

<input
type="checkbox"
checked={pool}
onChange={(e)=>setPool(e.target.checked)}
/>

Pool

</label>

<label>

<input
type="checkbox"
checked={spa}
onChange={(e)=>setSpa(e.target.checked)}
/>

Spa

</label>

<label>

<input
type="checkbox"
checked={parking}
onChange={(e)=>setParking(e.target.checked)}
/>

Parking

</label>

<label>

<input
type="checkbox"
checked={restaurant}
onChange={(e)=>setRestaurant(e.target.checked)}
/>

Restaurant

</label>

<h3>

Status

</h3>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option>

Active

</option>

<option>

Hidden

</option>

</select>

<h3>

Upload Images

</h3>

<input
type="file"
multiple
accept="image/*"
onChange={handleImages}
/>

<p>

{images.length}/12 Images

</p>
<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"10px",
marginTop:"15px"
}}
>

{images.map((img,index)=>(

<img

key={index}

src={img}

alt=""

style={{

width:"100%",

height:"90px",

objectFit:"cover",

borderRadius:"8px"

}}

/>

))}

</div>

<button

className="actionBtn"

style={{

marginTop:"20px",

width:"100%"

}}

onClick={saveHotel}

>

Save Hotel

</button>

</div>

);

}