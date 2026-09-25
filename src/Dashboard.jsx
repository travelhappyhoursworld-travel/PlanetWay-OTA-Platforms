import { useEffect, useState } from "react";

import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Dashboard() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* LOAD BOOKINGS */

  const loadBookings = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "bookings")
        );

      const data = [];

      querySnapshot.forEach((docItem) => {

        data.push({
          id: docItem.id,
          ...docItem.data()
        });

      });

      setBookings(data);

      setLoading(false);

    } catch (err) {

      console.log(err);

    }

  };

  /* ADD TEST BOOKING */

  const addBooking = async () => {

    try {

      await addDoc(
        collection(db, "bookings"),
        {
          destination: "Belgrade → Paris",
          price: 120,
          createdAt: new Date()
        }
      );

      loadBookings();

    } catch (err) {

      console.log(err);

    }

  };

  /* DELETE */

  const deleteBooking = async (id) => {

    try {

      await deleteDoc(
        doc(db, "bookings", id)
      );

      loadBookings();

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadBookings();

  }, []);

  /* TOTAL */

  const total =
    bookings.reduce(
      (sum, item) =>
        sum + Number(item.price || 0),
      0
    );

  return (

    <div className="dashboardPage">

      <div className="dashboardTop">

        <h1>
          PlanetWay Dashboard
        </h1>

        <button
          className="addBtn"
          onClick={addBooking}
        >
          Add Test Booking
        </button>

      </div>

      {/* STATS */}

      <div className="statsGrid">

        <div className="statCard">

          <span>Total Reservations</span>

          <h2>
            {bookings.length}
          </h2>

        </div>

        <div className="statCard">

          <span>Total Revenue</span>

          <h2>
            {total}€
          </h2>

        </div>

        <div className="statCard">

          <span>Status</span>

          <h2>
            Active
          </h2>

        </div>

      </div>

      {/* BOOKINGS */}

      <div className="bookingsBox">

        <h2>
          Latest Reservations
        </h2>

        {loading ? (

          <p>
            Loading...
          </p>

        ) : bookings.length === 0 ? (

          <p>
            No reservations yet.
          </p>

        ) : (

          bookings.map((b) => (

            <div
              className="bookingRow"
              key={b.id}
            >

              <div>

                <strong>
                  {b.destination}
                </strong>

                <p>
                  {b.price}€
                </p>

              </div>

              <button
                className="deleteBtn"
                onClick={() =>
                  deleteBooking(b.id)
                }
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}