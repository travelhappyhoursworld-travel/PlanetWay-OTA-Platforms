import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserDashboard() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [packages] = useState(() => {
    const saved =
      localStorage.getItem("planetway_packages");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const filteredPackages = packages.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.destination
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <h1>Available Packages</h1>

      <input
        type="text"
        placeholder="Search destination..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="stats">

        <div className="statCard">
          <h3>Packages</h3>
          <p>{packages.length}</p>
        </div>

        <div className="statCard">
          <h3>Bookings</h3>
          <p>5</p>
        </div>

        <div className="statCard">
          <h3>Reward Points</h3>
          <p>1250</p>
        </div>

      </div>

      <div className="packageList">

        {filteredPackages.length === 0 ? (

          <p>No packages available.</p>

        ) : (

          filteredPackages.map((item) => (

            <div
              key={item.id}
              className="packageCard"
            >

              <h3>{item.title}</h3>

              <p>{item.destination}</p>

              <p>{item.price}</p>

              <p>{item.description}</p>

              <button
                className="loginBtn"
                onClick={() =>
                  navigate(`/booking/${item.id}`)
                }
              >
                Book Now
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}