import { useState } from "react";

import { storage } from "../firebase";

import {
ref,
uploadBytes,
getDownloadURL
} from "firebase/storage";

export default function AddPackage() {

const [title, setTitle] = useState("");
const [destination, setDestination] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);

const handleImages = (e) => {

const files = Array.from(e.target.files);

if (files.length > 12) {
alert("Maximum 12 images");
return;
}

setImages(files);

};

const handleSave = async () => {

if (!title || !destination) {
alert("Fill all required fields");
return;
}

setLoading(true);

try {

const imageUrls = [];

for (const image of images) {

const imageRef = ref(
storage,
`planetway/packages/${Date.now()}_${image.name}`
);

await uploadBytes(
imageRef,
image
);

const url =
await getDownloadURL(
imageRef
);

imageUrls.push(url);

}

const packageData = {

id: Date.now(),

title,

destination,

price,

description,

images: imageUrls,

createdAt:
new Date().toISOString()

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

alert(
"Package saved successfully"
);

setTitle("");
setDestination("");
setPrice("");
setDescription("");
setImages([]);

}
catch(error){

console.error(error);

alert(
"Upload failed"
);

}

setLoading(false);

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

<div
style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"15px"
}}
>

{images.map((img,index)=>(

<img
key={index}
src={URL.createObjectURL(img)}
alt=""
width="100"
height="70"
style={{
objectFit:"cover",
borderRadius:"8px"
}}
/>

))}

</div>

<button
className="saveBtn"
onClick={handleSave}
disabled={loading}
>

{loading
? "Uploading..."
: "Save Package"}

</button>

</div>

);

}