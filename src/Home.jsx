import { useState } from "react";
import Navbar from "./Navbar";

export default function Home() {

const [showPackages, setShowPackages] = useState(false);

return (
<div>

  <Navbar
    showPackages={showPackages}
    setShowPackages={setShowPackages}
  />

  <section className="hero">

    <h1>PlanetWay</h1>

    <p className="heroSlogan">
      Discover More. Travel Smarter.
    </p>

    <div className="searchBox">

      <input placeholder="From" />

      <input placeholder="Destination" />

      <input type="date" />

      <input type="date" />

      <select>
        <option>Economy</option>
        <option>Business</option>
        <option>First Class</option>
      </select>

      <button>
        Search
      </button>

    </div>

  </section>

  {showPackages && (

    <section id="packages">

      <h2 className="sectionTitle">
        Featured Packages
      </h2>

      <div className="packageList">

        <div className="packageCard">
          Dubai Luxury - €1299
        </div>

        <div className="packageCard">
          Rome City Break - €599
        </div>

        <div className="packageCard">
          Zanzibar Escape - €1499
        </div>

        <div className="packageCard">
          Tokyo Explorer - €1899
        </div>

        <div className="packageCard">
          Bali Paradise - €1399
        </div>

        <div className="packageCard">
          New York Experience - €1699
        </div>

      </div>

    </section>

  )}

  <div className="aiNavigator">

    <div
      className="aiBall"
      onClick={() => {
        const panel =
          document.getElementById("aiPanel");

        panel.classList.toggle("active");
      }}
    >
      AI
    </div>

    <div
      id="aiPanel"
      className="aiPanel"
    >

      <h3>AI Navigator</h3>

      <input
        placeholder="Where can I go for 800€?"
      />

      <button>
        Search
      </button>

      <div className="aiResults">

        <p>✈ Rome Flight €199</p>

        <p>🏨 Rome Hotel €299</p>

        <p>🚗 Fiat 500 €89</p>

        <p>🌴 Rome Package €599</p>

      </div>

    </div>

  </div>

</div>

);
}