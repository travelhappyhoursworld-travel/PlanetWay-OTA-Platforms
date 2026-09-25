
import React, { useState } from "react";

const packages = [
  {
    id: 1,
    title: "Dubai Luxury",
    destination: "Dubai",
    price: "€1299",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Rome City Break",
    destination: "Rome",
    price: "€599",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Bali Paradise",
    destination: "Bali",
    price: "€1399",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Tokyo Explorer",
    destination: "Tokyo",
    price: "€1899",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "New York Experience",
    destination: "New York",
    price: "€1699",
    image:
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Zanzibar Escape",
    destination: "Zanzibar",
    price: "€1499",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

function Navbar({ onPackages, onContact, onLogin }) {
  return (
    <header className="header">
      <div className="brand">PlanetWay</div>

      <nav className="mainMenu">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Flights
        </button>

        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Hotels
        </button>

        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Rent a Car
        </button>

        <button onClick={onPackages}>Packages</button>

        <button onClick={onContact}>Contact</button>

        <button className="loginBtn" onClick={onLogin}>
          Log in
        </button>
      </nav>
    </header>
  );
}

function App() {
  const [showPackages, setShowPackages] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelClass, setTravelClass] = useState("Economy");

  function handleSearch(e) {
    e.preventDefault();

    alert(
      `PlanetWay Search\n\nFrom: ${from || "—"}\nDestination: ${
        destination || "—"
      }\nDeparture: ${departure || "—"}\nReturn: ${
        returnDate || "—"
      }\nClass: ${travelClass}`
    );
  }

  function handleLogin() {
    alert("PlanetWay Login");
  }

  return (
    <div className="homePage">
      <Navbar
        onPackages={() => {
          setShowPackages(true);

          setTimeout(() => {
            document
              .getElementById("packages")
              ?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }}
        onContact={() => setShowContact(!showContact)}
        onLogin={handleLogin}
      />

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">
          <h1>PlanetWay</h1>

          <p className="heroSlogan">
            Discover More.
            <br />
            Travel Smarter.
          </p>

          <form className="searchBox" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />

            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />

            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>

            <button type="submit" className="searchBtn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* PACKAGES */}
      {showPackages && (
        <section className="packagesSection" id="packages">
          <h2 className="sectionTitle">Featured Packages</h2>

          <div className="packageGrid">
            {packages.map((item) => (
              <div className="packageCard" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="packageImage"
                />

                <div className="packageContent">
                  <h3>{item.title}</h3>

                  <p>
                    Destination
                    <br />
                    <strong>{item.destination}</strong>
                  </p>

                  <div className="packagePrice">{item.price}</div>

                  <button
                    className="actionBtn"
                    onClick={() => alert(`Booking: ${item.title}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      {showContact && (
        <section className="contactSection">
          <h2>Contact PlanetWay</h2>

          <p>
            For travel arrangements, partnerships and PlanetWay information.
          </p>

          <p>
            <strong>Phone:</strong> +381 65 933 5732
          </p>

          <p>
            <strong>Email:</strong> travelhappyhoursworld@gmail.com
          </p>
        </section>
      )}

      {/* AI NAVIGATOR */}
      <div className="aiNavigator">
        <div
          className="aiBall"
          onClick={() => setAiOpen(!aiOpen)}
          title="AI Navigator"
        >
          AI
        </div>

        <div className={aiOpen ? "aiPanel active" : "aiPanel"}>
          <h3>AI Navigator</h3>

          <p>
            Tell us where you want to go and PlanetWay will help you find the
            right trip.
          </p>

          <input
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Where can I travel for €800?"
          />

          <button
            onClick={() =>
              alert(
                aiQuery
                  ? `PlanetWay AI search: ${aiQuery}`
                  : "Enter your travel request first."
              )
            }
          >
            Search
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerContainer">
          <div>
            <h3>PlanetWay</h3>
            <p>
              Discover More.
              <br />
              Travel Smarter.
            </p>
          </div>

          <div>
            <h3>Travel</h3>
            <p>Flights</p>
            <p>Hotels</p>
            <p>Rent a Car</p>
            <p>Packages</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>+381 65 933 5732</p>
            <p>travelhappyhoursworld@gmail.com</p>
          </div>
        </div>

        <div className="footerBottom">
          © {new Date().getFullYear()} PlanetWay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;


