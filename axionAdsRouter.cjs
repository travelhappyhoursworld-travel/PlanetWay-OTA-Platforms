const express = require("express");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const router = express.Router();

const DEFAULT_DESTINATION =
  "https://planetway-ota-platforms.onrender.com/";

function cleanText(value, maxLength = 5000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function requireAxionRole(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (!match) {
      return res.status(401).json({
        success: false,
        error: "Potrebna je aktivna Firebase prijava."
      });
    }

    const decoded = await getAuth().verifyIdToken(match[1]);
    const userSnapshot = await getFirestore()
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userSnapshot.exists) {
      return res.status(403).json({
        success: false,
        error: "Korisnički nalog nije pronađen."
      });
    }

    const role = userSnapshot.data()?.role;

    if (role !== "admin" && role !== "employee") {
      return res.status(403).json({
        success: false,
        error: "Nemate dozvolu za Axion ADS."
      });
    }

    req.axionUser = {
      uid: decoded.uid,
      email: decoded.email || "",
      role
    };

    next();
  } catch (error) {
    console.error("Axion ADS authentication error:", error.message);

    return res.status(401).json({
      success: false,
      error: "Firebase prijava nije potvrđena. Prijavite se ponovo."
    });
  }
}

router.use(requireAxionRole);

async function sendEmail(req, recipient, campaign) {
  const resend = req.app.locals.resend;

  if (!resend || typeof resend.emails?.send !== "function") {
    throw new Error("Resend servis nije pravilno konfigurisan.");
  }

  const title = cleanText(campaign.title, 200) ||
    "PlanetWay Axion ADS Campaign";

  const description = cleanText(campaign.description, 5000);
  const destination = cleanText(campaign.destination, 2000) ||
    DEFAULT_DESTINATION;
  const mediaUrl = cleanText(campaign.mediaUrl, 2000);

  if (!validUrl(destination)) {
    throw new Error("Link ponude nije validan.");
  }

  if (mediaUrl && !validUrl(mediaUrl)) {
    throw new Error("Link slike nije validan.");
  }

  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeDestination = escapeHtml(destination);

  const imageHtml = mediaUrl
    ? '<img src="' + escapeHtml(mediaUrl) +
      '" alt="PlanetWay Axion ADS" style="display:block;width:100%;max-width:680px;height:auto;border-radius:14px;margin-bottom:24px" />'
    : "";

  const html =
    '<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;color:#17324d">' +
    "<h1>" + safeTitle + "</h1>" +
    imageHtml +
    '<div style="white-space:pre-line;font-size:16px;line-height:1.6">' +
    safeDescription +
    "</div>" +
    '<p><a href="' + safeDestination +
    '" style="display:inline-block;padding:12px 20px;background:#1677ff;color:#fff;text-decoration:none;border-radius:8px">View Offer</a></p>' +
    "</div>";

  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [recipient],
    subject: title,
    text: title + "\n\n" + description + "\n\n" + destination,
    html
  });

  if (result?.error) {
    throw new Error(
      result.error.message || "Resend nije prihvatio email."
    );
  }

  const id = result?.data?.id || result?.id;

  if (!id) {
    throw new Error("Resend nije potvrdio prihvatanje emaila.");
  }

  return id;
}

router.post("/test-send", async (req, res) => {
  try {
    const recipient = cleanText(req.body?.to, 254).toLowerCase();

    if (
      !recipient ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)
    ) {
      return res.status(400).json({
        success: false,
        error: "Email adresa nije validna."
      });
    }

    if (
      req.axionUser.role === "employee" &&
      recipient !== req.axionUser.email.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        error: "Zaposleni može poslati test samo na svoj email."
      });
    }

    const id = await sendEmail(req, recipient, {
      title: cleanText(req.body?.title, 200) ||
        "PlanetWay Axion ADS Test",
      description: cleanText(req.body?.description, 5000) ||
        "PlanetWay Axion ADS ponuda.",
      destination: cleanText(req.body?.destination, 2000) ||
        DEFAULT_DESTINATION
    });

    return res.json({
      success: true,
      id,
      message: "Resend je prihvatio test email."
    });
  } catch (error) {
    console.error("Axion ADS test email error:", error.message);

    return res.status(502).json({
      success: false,
      error: error.message || "Slanje test emaila nije uspelo."
    });
  }
});

router.post("/send-campaign", async (req, res) => {
  try {
    const recipients = req.body?.recipients;
    const title = cleanText(req.body?.title, 200) ||
      "PlanetWay Axion ADS Campaign";
    const description = cleanText(req.body?.description, 5000) ||
      "PlanetWay Axion ADS ponuda.";
    const destination = cleanText(req.body?.destination, 2000) ||
      DEFAULT_DESTINATION;
    const mediaUrl = cleanText(req.body?.mediaUrl, 2000);

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Nema primalaca kampanje."
      });
    }

    if (recipients.length > 100) {
      return res.status(400).json({
        success: false,
        error: "Kampanja je ograničena na 100 primalaca po zahtevu."
      });
    }

    const uniqueRecipients = [
      ...new Set(
        recipients
          .map((item) => cleanText(item?.email, 254).toLowerCase())
          .filter((email) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          )
      )
    ];

    if (!uniqueRecipients.length) {
      return res.status(400).json({
        success: false,
        error: "Nema validnih email adresa."
      });
    }

    if (
      req.axionUser.role === "employee" &&
      uniqueRecipients.some((email) => email !== req.axionUser.email.toLowerCase())
    ) {
      return res.status(403).json({
        success: false,
        error: "Zaposleni može slati kampanju samo na sopstvenu email adresu."
      });
    }

    const results = [];

    for (const email of uniqueRecipients) {
      try {
        const id = await sendEmail(req, email, {
          title,
          description,
          destination,
          mediaUrl
        });

        results.push({
          email,
          success: true,
          id
        });
      } catch (error) {
        results.push({
          email,
          success: false,
          error: error.message || "Slanje nije uspelo."
        });
      }
    }

    const sent = results.filter((item) => item.success).length;
    const failed = results.length - sent;

    return res.json({
      success: failed === 0,
      sent,
      failed,
      results
    });
  } catch (error) {
    console.error("Axion ADS campaign error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "Slanje kampanje nije uspelo."
    });
  }
});

module.exports = router;