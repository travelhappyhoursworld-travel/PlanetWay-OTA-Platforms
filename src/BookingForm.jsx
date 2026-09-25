import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { db } from "./firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";

export default function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passengers: 1,
    notes: ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setSaving(true);

      const reference =
        "PW" +
        Math.floor(
          100000 + Math.random() * 900000
        );

      const booking = {
        reference,
        packageId: id || null,

        firstName: form.firstName,
        lastName: form.lastName,
        fullName:
          form.firstName +
          " " +
          form.lastName,

        email: form.email,
        phone: form.phone,

        passengers: Number(form.passengers),

        notes: form.notes,

        status: "Pending",
        paymentStatus: "Pending",

        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(
        collection(db, "bookings"),
        booking
      );

      await updateDoc(
        doc(db, "bookings", docRef.id),
        {
          id: docRef.id
        }
      );

      localStorage.setItem(
        "planetway_booking",
        JSON.stringify({
          id: docRef.id,
          fullName:
            form.firstName +
            " " +
            form.lastName,
          email: form.email,
          phone: form.phone,
          travelers: form.passengers,
          reference
        })
      );

      navigate("/checkout");

    } catch (error) {
      console.error(
        "Booking save error:",
        error
      );

      alert(
        "Unable to save the reservation. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bookingPage">
      <div className="bookingCard">

        <h1>Complete Reservation</h1>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="passengers"
          value={form.passengers}
          onChange={handleChange}
        >
          <option value="1">1 Passenger</option>
          <option value="2">2 Passengers</option>
          <option value="3">3 Passengers</option>
          <option value="4">4 Passengers</option>
          <option value="5">5 Passengers</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button
          className="continueBtn"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving
            ? "Saving Reservation..."
            : "Continue To Payment"}
        </button>

      </div>
    </div>
  );
}