const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe("sk_test_51TPPn6C653IhdoZKkNJN5rx5nDTyGPjzX0IG4FXcPaT186J8TwK4pwCfXxczw4BjiK4LQlZffpiNp10ZTrQ1XFAM008ahE15KC");

// 🔥 Firebase Admin
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// CREATE CHECKOUT
app.post("/create-checkout-session", async (req, res) => {
  const { email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "PlanetWay PRO"
          },
          unit_amount: 2000,
          recurring: { interval: "month" }
        },
        quantity: 1
      }
    ],
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173"
  });

  res.json({ url: session.url });
});

// WEBHOOK (NAJBITNIJE)
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_email;

    // 🔥 SET USER PRO
    const usersRef = db.collection("users");
    const snap = await usersRef.where("email", "==", email).get();

    snap.forEach(doc => {
      doc.ref.update({ pro: true });
    });
  }

  res.json({ received: true });
});

app.listen(5001, () => console.log("PRODUCTION server running"));