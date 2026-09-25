import { useState } from "react";

export default function AddPackage() {

const [title, setTitle] =
useState("");

const [destination, setDestination] =
useState("");

const [price, setPrice] =
useState("");

const [description, setDescription] =
useState("");

const [images, setImages] =
useState([]);

const handleImages = (e) => {

const files =
Array.from(e.target.files);

if(files.length > 12){
alert("Maximum 12 images");
return;
}

setImages(files);

};

const handleSave = () => {

const packageData = {

id: Date.now(),

title,

destination,

price,

description,

images: images.map(
(img) =>
URL.createObjectURL(img)
)

};

const existing =
JSON.parse(
localStorage.getItem(
"planetway_packages"
)
) || [];

existing.push(packageData);

localStorage.setItem(
"planetway_packages",
JSON.stringify(existing)
);

alert("Package Saved");

setTitle("");
setDestination("");
setPrice("");
setDescription("");
setImages([]);

};

return (

<div className="addPackageCard">

<h2>
Add New Package
</h2>

<input
placeholder="Package Name"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)
}
/>

<input
placeholder="Destination"
value={destination}
onChange={(e)=>
setDestination(
e.target.value
)
}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>
setPrice(
e.target.value
)
}
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)
}
/>

<input
type="file"
multiple
accept="image/*"
onChange={handleImages}
/>

<p>
Images:
{images.length}/12
</p>

<button
className="saveBtn"
onClick={handleSave}
>
Save Package
</button>

</div>

);

}