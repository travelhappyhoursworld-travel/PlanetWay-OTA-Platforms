const express = require("express");

const router = express.Router();

let accessToken = null;
let tokenExpiresAt = 0;

async function getAmadeusToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Amadeus credentials are missing.");
  }

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error_description || "Amadeus authentication failed."
    );
  }

  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

router.get("/test", async (req, res) => {
  try {
    const token = await getAmadeusToken();

    res.json({
      success: true,
      message: "Amadeus authentication successful.",
      tokenReceived: Boolean(token),
    });
  } catch (error) {
    console.error("Amadeus error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
router.get("/flight-search", async (req, res) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      adults = 1,
      returnDate,
    } = req.query;

    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        error: "origin, destination and departureDate are required.",
      });
    }

    const token = await getAmadeusToken();

    const params = new URLSearchParams({
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate,
      adults: String(adults),
      currencyCode: "EUR",
      max: "20",
    });

    if (returnDate) {
      params.set("returnDate", returnDate);
    }

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.errors?.[0]?.detail ||
          data?.errors?.[0]?.title ||
          "Amadeus flight search failed.",
      });
    }

    res.json({
      success: true,
      count: data.meta?.count || data.data?.length || 0,
      flights: data.data || [],
    });
  } catch (error) {
    console.error("Amadeus flight search error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
router.post("/flight-price", async (req, res) => {
  try {
    const { flightOffer } = req.body;

    if (!flightOffer) {
      return res.status(400).json({
        success: false,
        error: "flightOffer is required.",
      });
    }

    const token = await getAmadeusToken();

    const response = await fetch(
      "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.amadeus+json",
        },
        body: JSON.stringify({
          data: {
            type: "flight-offers-pricing",
            flightOffers: [flightOffer],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.errors?.[0]?.detail ||
          data?.errors?.[0]?.title ||
          "Amadeus flight price check failed.",
      });
    }

    res.json({
      success: true,
      data: data.data || null,
    });
  } catch (error) {
    console.error("Amadeus flight price error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
router.post("/flight-book", async (req, res) => {
  try {
    const { flightOffer, travelers } = req.body;

    if (!flightOffer || !travelers) {
      return res.status(400).json({
        success: false,
        error: "flightOffer and travelers are required.",
      });
    }

    const token = await getAmadeusToken();

    const response = await fetch(
      "https://test.api.amadeus.com/v1/booking/flight-orders",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.amadeus+json",
        },
        body: JSON.stringify({
          data: {
            type: "flight-order",
            flightOffers: [flightOffer],
            travelers,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.errors?.[0]?.detail ||
          data?.errors?.[0]?.title ||
          "Amadeus flight booking failed.",
      });
    }

    res.json({
      success: true,
      booking: data.data || null,
    });
  } catch (error) {
    console.error("Amadeus flight booking error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
router.delete("/flight-book/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: "orderId is required.",
      });
    }

    const token = await getAmadeusToken();

    const response = await fetch(
      `https://test.api.amadeus.com/v1/booking/flight-orders/${encodeURIComponent(orderId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.errors?.[0]?.detail ||
          data?.errors?.[0]?.title ||
          "Amadeus flight cancellation failed.",
      });
    }

    res.json({
      success: true,
      orderId,
      message: "Flight order cancellation request successful.",
    });
  } catch (error) {
    console.error("Amadeus flight cancellation error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});