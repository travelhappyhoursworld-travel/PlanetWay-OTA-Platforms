const express = require("express");
const crypto = require("crypto");

const router = express.Router();

function getHotelbedsSignature() {
  const apiKey = process.env.HOTELBEDS_API_KEY;
  const secret = process.env.HOTELBEDS_SECRET;

  if (!apiKey || !secret) {
    throw new Error("Hotelbeds credentials are missing.");
  }

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha256")
    .update(apiKey + secret + timestamp)
    .digest("hex");

  return signature;
}

router.get("/test", async (req, res) => {
  try {
    const signature = getHotelbedsSignature();

    res.json({
      success: true,
      message: "Hotelbeds authentication data prepared.",
      signatureCreated: Boolean(signature),
    });
  } catch (error) {
    console.error("Hotelbeds error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


router.post("/hotels", async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      adults = 2,
      rooms = 1,
      children = 0,
      hotelCodes,
      sourceMarket = "RS",
    } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: "checkIn and checkOut are required.",
      });
    }

    const apiKey = process.env.HOTELBEDS_API_KEY;
    const secret = process.env.HOTELBEDS_SECRET;

    if (!apiKey || !secret) {
      return res.status(500).json({
        success: false,
        error: "Hotelbeds credentials are missing.",
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = crypto
      .createHash("sha256")
      .update(apiKey + secret + timestamp)
      .digest("hex");

    const body = {
      stay: {
        checkIn,
        checkOut,
      },
      sourceMarket,
      occupancies: [
        {
          rooms: Number(rooms),
          adults: Number(adults),
          children: Number(children),
        },
      ],
    };

    if (hotelCodes) {
      body.hotels = {
        hotel: hotelCodes
          .split(",")
          .map((code) => Number(code.trim()))
          .filter((code) => !Number.isNaN(code)),
      };
    }

    const response = await fetch(
      "https://api.test.hotelbeds.com/hotel-api/1.0/hotels",
      {
        method: "POST",
        headers: {
          "Api-key": apiKey,
          "X-Signature": signature,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          data?.error?.description ||
          "Hotelbeds hotel search failed.",
      });
    }

    res.json({
      success: true,
      hotels: data,
    });
  } catch (error) {
    console.error("Hotelbeds hotel search error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
module.exports = router;