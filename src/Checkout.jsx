import "./App.css";

export default function Checkout() {

  const booking =
    JSON.parse(
      localStorage.getItem(
        "planetway_booking"
      )
    );

  return (

    <div className="checkoutPage">

      <div className="checkoutCard">

        <h1>Secure Payment</h1>

        <p>
          Complete your reservation
        </p>

        <div className="bookingSummary">

          <h2>Passenger Details</h2>

          <p>
            <strong>Name:</strong>{" "}
            {booking?.fullName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {booking?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {booking?.phone}
          </p>

          <p>
            <strong>Travelers:</strong>{" "}
            {booking?.travelers}
          </p>

        </div>

        <div className="paymentMethods">

          <h2>Choose Payment Method</h2>

          <button className="paymentBtn stripe">

            <div className="paymentTop">

              <span>💳</span>

              <strong>
                Credit / Debit Card
              </strong>

            </div>

            <div className="cardLogos">

              <span>VISA</span>
              <span>Mastercard</span>
              <span>Maestro</span>

            </div>

            <small>
              Instant confirmation
            </small>

          </button>

          <button className="paymentBtn paypal">

            <div className="paymentTop">

              <span>🅿️</span>

              <strong>
                PayPal
              </strong>

            </div>

            <small>
              Pay securely using PayPal
            </small>

          </button>

          <button className="paymentBtn bank">

            <div className="paymentTop">

              <span>🏦</span>

              <strong>
                Bank Transfer
              </strong>

            </div>

            <small>
              Invoice & wire transfer
            </small>

          </button>

        </div>

      </div>

    </div>

  );

}