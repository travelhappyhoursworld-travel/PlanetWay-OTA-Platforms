const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE (OBAVEZNO)
app.get("/", (req, res) => {
  res.send("PlanetWay backend radi 🚀");
});

// TEST API
app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5001;

// VAŽNO: slušaj 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
