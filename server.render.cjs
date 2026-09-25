const express = require("express");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) : require("C:\\Users\\Korisnik\\Documents\\PlanetWaySecrets\\firebase-service-account.json");
const { cert, initializeApp } = require("firebase-admin/app");
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const cors = require("cors");
const Stripe = require("stripe");
const dotenv = require("dotenv");
const amadeusRouter = require("./amadeus.cjs");
const hotelbedsRouter = require("./hotelbeds.cjs");
const path = require("path");
const { Client, OrdersController } = require("@paypal/paypal-server-sdk");
dotenv.config({
  path: path.join(__dirname, "src", "backend.env"),
  override: true,
});
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    return next();
  }

  express.json()(req, res, next);
});
app.use("/api/amadeus", amadeusRouter);
app.use("/api/hotelbeds", hotelbedsRouter);

const { Environment } = require("@paypal/paypal-server-sdk");

const paypalClient = new Client({
  environment: Environment.Sandbox,
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
});

const paypalOrders = new OrdersController(paypalClient);
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "PlanetWay Stripe backend radi!",
  });
});

 async function createCheckout(req, res) {
  try {
    const body = req.body || {};
console.log("STRIPE CHECKOUT BODY:", body);
    const {
      amount,
      currency = "EUR",
      title = "PlanetWay Travel",
      customerEmail,
      successUrl,
      cancelUrl,
      bookingId,
      destination,
    } = body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: title,
              description: destination || undefined,
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail || undefined,
      metadata: {
        bookingId: String(bookingId || ""),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

app.post("/api/create-checkout-session", createCheckout);
app.post("/api/create-payment-session", createCheckout);
// =====================================================
// PAYPAL CREATE ORDER
// =====================================================

app.post(
  "/api/paypal/create-order",
  async (req, res) => {
    try {
      const amount = Number(req.body.amount || 0);
      const bookingId = String(req.body.bookingId || "");

      if (!amount || amount <= 0) {
        return res.status(400).json({
          error: "Invalid amount",
        });
      }

      if (!bookingId) {
        return res.status(400).json({
          error: "Missing booking ID",
        });
      }

      const returnUrl =
        req.body.returnUrl ||
        req.headers.origin ||
        "http://localhost:5173";

      const cancelUrl =
        req.body.cancelUrl ||
        req.headers.origin ||
        "http://localhost:5173";

      console.log("PAYPAL CREATE ORDER:", {
        amount,
        bookingId,
        returnUrl,
        cancelUrl,
      });

      const clientId =
        process.env.PAYPAL_CLIENT_ID;

      const clientSecret =
        process.env.PAYPAL_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        throw new Error(
          "PayPal credentials are missing."
        );
      }

      const auth = Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64");

      const tokenResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",

          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            "grant_type=client_credentials",
        }
      );

      const tokenData =
        await tokenResponse.json();

      if (
        !tokenResponse.ok ||
        !tokenData.access_token
      ) {
        console.error(
          "PAYPAL TOKEN ERROR:",
          tokenData
        );

        throw new Error(
          "PayPal access token could not be created."
        );
      }

       const paypalOrder = {
  intent: "CAPTURE",

  purchase_units: [
    {
      custom_id: bookingId,

      amount: {
        currency_code: "EUR",
        value: amount.toFixed(2),
      },
    },
  ],

  payment_source: {
    paypal: {
      experience_context: {
        return_url:
          `${returnUrl}/?paypal=success`,

        cancel_url:
          `${cancelUrl}/?paypal=cancel`,

        user_action: "PAY_NOW",
      },
    },
  },
};     console.log(
        "PAYPAL REQUEST BODY:",
        JSON.stringify(
          paypalOrder,
          null,
          2
        )
      );

      const orderResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${tokenData.access_token}`,

            "Content-Type":
              "application/json",

            Prefer:
              "return=representation",
          },

          body:
            JSON.stringify(paypalOrder),
        }
      );

      const orderData =
        await orderResponse.json();

      console.log(
        "PAYPAL ORDER RESPONSE:",
        JSON.stringify(
          orderData,
          null,
          2
        )
      );

      if (!orderResponse.ok) {
        return res.status(
          orderResponse.status
        ).json({
          error:
            orderData?.message ||
            "PayPal order could not be created.",

          details:
            orderData,
        });
      }

      res.json({
        id: orderData.id,
        status: orderData.status,
        links: orderData.links,
      });

    } catch (error) {
      console.error(
        "PayPal create order error:",
        error
      );

      res.status(500).json({
        error: error.message,
      });
    }
  }
);


// =====================================================
// PAYPAL CAPTURE ORDER
// =====================================================

app.post(
  "/api/paypal/capture-order",
  async (req, res) => {
    try {
      const orderId = String(
        req.body.orderId || ""
      );

      const bookingId = String(
        req.body.bookingId || ""
      );

      if (!orderId) {
        return res.status(400).json({
          error:
            "Missing PayPal order ID",
        });
      }

      console.log(
        "PAYPAL CAPTURE START:",
        {
          orderId,
          bookingId,
        }
      );

      const response =
        await paypalOrders.captureOrder({
          id: orderId,
        });

      const result =
        response.result;

      console.log(
        "PAYPAL CAPTURE RESULT:",
        JSON.stringify(
          result,
          null,
          2
        )
      );

      const captureStatus =
        result?.status;

      if (
        captureStatus !== "COMPLETED"
      ) {
        return res.status(400).json({
          error:
            "PayPal payment was not completed.",

          status:
            captureStatus,

          id:
            result?.id,
        });
      }

      let finalBookingId =
        bookingId;

      if (!finalBookingId) {
        finalBookingId =
          result
            ?.purchaseUnits?.[0]
            ?.customId ||
          "";
      }

      if (finalBookingId) {
        await db
          .collection("bookings")
          .doc(finalBookingId)
          .update({
            status: "Confirmed",

            paymentStatus: "Paid",

            paymentMethod: "paypal",

            paypalOrderId:
              result.id,

            paidAt:
              new Date(),
          });

        console.log(
          "FIREBASE PAYPAL BOOKING UPDATED:",
          finalBookingId
        );
      }

      res.json({
        success: true,

        id:
          result?.id,

        status:
          captureStatus,

        bookingId:
          finalBookingId,
      });

    } catch (error) {
      console.error(
        "PayPal capture error:",
        error
      );

      res.status(500).json({
        error: error.message,
      });
    }
  }
);app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("STRIPE WEBHOOK:", event.type);

     if (event.type === "checkout.session.completed") {
  const session = event.data.object;
  const bookingId = session.metadata?.bookingId;

  console.log("STRIPE PAYMENT SUCCESS:", {
    sessionId: session.id,
    bookingId,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,
  });

  if (bookingId && session.payment_status === "paid") {
    await db.collection("bookings").doc(bookingId).update({
      status: "Confirmed",
      paymentStatus: "Paid",
      stripeSessionId: session.id,
      paidAt: new Date()
    });

    console.log(
      "FIREBASE BOOKING UPDATED:",
      bookingId
    );
  }
}

      res.json({ received: true });
    } catch (error) {
      console.error("Stripe webhook error:", error.message);

      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("PlanetWay Stripe backend radi on port " + PORT);
});
