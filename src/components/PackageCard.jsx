import { useState } from "react";

export default function PackageCard({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card" onClick={() => setOpen(true)}>
        <img src={item.images[0]} alt="" />
        <div className="cardBody">
          <h3>{item.title}</h3>
          <p>{item.location}</p>
          <h2>{item.price}</h2>
        </div>
      </div>

      {open && (
        <div className="modalOverlay" onClick={() => setOpen(false)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <button className="closeBtn" onClick={() => setOpen(false)}>
              ✕
            </button>

            <h1>{item.title}</h1>
            <p>{item.description}</p>

            <div className="gallery">
              {item.images.map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}