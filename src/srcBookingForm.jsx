import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = () => {

    const reference =
      "PW" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const booking = {
      bookingId: Date.now(),
      reference,
      packageId: id,
      ...form,
      status: "Pending"
    };

    const bookings =
      JSON.parse(
        localStorage.getItem(
          "planetway_bookings"
        )
      ) || [];

    bookings.push(booking);

    localStorage.setItem(
      "planetway_bookings",
      JSON.stringify(bookings)
    );

    localStorage.setItem(
      "planetway_booking",
      JSON.stringify({
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
        >
          Continue To Payment
        </button>

      </div>

    </div>

  );

}