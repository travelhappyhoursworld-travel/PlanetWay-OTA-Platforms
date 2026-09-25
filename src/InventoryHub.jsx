import { useState } from "react";

export default function InventoryHub() {

  const [activeTab, setActiveTab] =
    useState("flights");

  const inventory = {
    flights: [
      {
        name: "Air Serbia",
        type: "Flight",
        status: "Active"
      }
    ],

    hotels: [
      {
        name: "Hilton Belgrade",
        type: "Hotel",
        status: "Active"
      }
    ],

    cars: [
      {
        name: "Avis",
        type: "Car Rental",
        status: "Active"
      }
    ],

    transfers: [
      {
        name: "Airport Transfer",
        type: "Transfer",
        status: "Active"
      }
    ],

    excursions: [
      {
        name: "Paris City Tour",
        type: "Excursion",
        status: "Active"
      }
    ]
  };

  return (

    <div className="dashboard">

      <h1>Global Inventory Hub</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >

        <button onClick={() => setActiveTab("flights")}>
          Flights
        </button>

        <button onClick={() => setActiveTab("hotels")}>
          Hotels
        </button>

        <button onClick={() => setActiveTab("cars")}>
          Cars
        </button>

        <button onClick={() => setActiveTab("transfers")}>
          Transfers
        </button>

        <button onClick={() => setActiveTab("excursions")}>
          Excursions
        </button>

      </div>

      {inventory[activeTab].map(
        (item, index) => (

          <div
            key={index}
            className="packageCard"
          >

            <h3>{item.name}</h3>

            <p>{item.type}</p>

            <p>{item.status}</p>

          </div>

        )
      )}

    </div>

  );
}